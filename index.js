/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Apigee Corporation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var TYPE_JSON = 'application/json';
var handlebars = require('handlebars');
var sanitize = require('sanitize-filename');
var fs = require('fs');
var _ = require('lodash');
var url = require('url');
var path = require('path');
var deref = require('json-schema-deref-sync');
var helpers = require('./lib/helpers.js');

/**
 * To check if it is an empty array or undefined
 * @private
 * @param  {array/object} val an array to be checked
 * @returns {boolean} return true is the array is not empty nor undefined
 */
function isEmpty(val) {
  return val == null || val.length <= 0;
}

/**
 * Populate property of the swagger project
 * @private
 * @param  {json} swagger swagger file containing API
 * @param  {string} apiPath API path to generate tests for
 * @param  {string} operation operation of the path to generate tests for
 * @param  {string} response response type of operation of current path
 * @param  {json} config configuration for testGen
 * @param  {info} info for cascading properties
 * @returns {json} return all the properties information
 */
function getData(swagger, apiPath, operation, response, config, info) {
  var childProperty = swagger.paths[apiPath];
  var grandProperty = swagger.paths[apiPath][operation];
  var securityType;

  var responseDescription = (swagger.paths[apiPath][operation].responses[response]) ?
    swagger.paths[apiPath][operation].responses[response].description : '';
  var data = { // request payload
    responseCode: response,
    default: response === 'default' ? 'default' : null,
    description: (response + ' ' + responseDescription),
    assertion: config.assertionFormat,
    noSchema: true,
    bodyParameters: [],
    queryParameters: [],
    headerParameters: [],
    pathParameters: [],
    formParameters: [],
    queryApiKey: null,
    headerApiKey: null,
    headerSecurity: null,
    path: '',
    isLoadTest: false,
    loadName: '',
    requests: 0,
    concurrent: 0,
    pathParams: {}
  };

  // get pathParams from config
  if (config.pathParams) {
    data.pathParams = config.pathParams;
  }

  // used for checking requestData table
  var requestPath = (swagger.basePath) ? path.posix.join(swagger.basePath, apiPath) : apiPath;


  // cope with loadTest info
  if (info.loadTest != null) {
    _.forEach(info.loadTest, function(loadTestParam) {
      if (loadTestParam.pathName === apiPath && loadTestParam.operation === operation) {
        data.loadName = apiPath.replace(/\//g, '_') + '_' + operation + '_load_test';
        info.importArete = true;
        data.isLoadTest = true;
        data.requests = loadTestParam.load.requests !== undefined ? loadTestParam.load.requests : 1000;
        data.concurrent = loadTestParam.load.concurrent !== undefined ? loadTestParam.load.concurrent : 100;
      }
    });
  }

  // deal with the security properties
  if (info.security && info.security.length !== 0) {
    Object.keys(info.security[0]).forEach(function(element) {
      securityType = swagger.securityDefinitions[element];
      element = _.snakeCase(element).toUpperCase();
      switch (securityType.type) {
        case 'basic':
          data.headerSecurity = {name: element, type: 'Basic'};
          break;
        case 'apiKey':
          if (securityType.in === 'query') {
            data.queryApiKey =
            {name: element, type: securityType.name};
          } else if (securityType.in === 'header') {
            data.headerApiKey =
            {name: element, type: securityType.name};
          }
          break;
        case 'oauth2':
          data.headerSecurity = {name: element, type: 'Bearer'};
          break;
        default:
          throw new Error('The type is undefined.');
      }
    });
  }

  // deal with parameters in path level
  if (childProperty.hasOwnProperty('parameters')) {
    // process different parameters
    _.forEach(childProperty.parameters, function(parameter) {
      switch (parameter.in) {
        case 'query':
          data.queryParameters.push(parameter);
          break;
        case 'path':
          data.pathParameters.push(parameter);
          break;
        case 'header':
          data.headerParameters.push(parameter);
          break;
        case 'formData':
          data.formParameters.push(parameter);
          break;
        default:
          throw new Error('The type is undefined.');
      }
    });
  }

  // deal with parameters in operation level
  if (grandProperty.hasOwnProperty('parameters')) {
    // only adds body parameters to request, ignores query params
    _.forEach(grandProperty.parameters, function(parameter) {
      switch (parameter.in) {
        case 'query':
          data.queryParameters.push(parameter);
          break;
        case 'header':
          data.headerParameters.push(parameter);
          break;
        case 'path':
          data.pathParameters.push(parameter);
          break;
        case 'formData':
          data.formParameters.push(parameter);
          break;
        case 'body':
          data.bodyParameters.push(parameter);
          break;
        default:
          throw new Error('The type is undefined.');
      }
    });
  }

  if (grandProperty.responses[response].hasOwnProperty('schema')) {
    data.noSchema = false;
    data.schema = grandProperty.responses[response].schema;
    data.schema = JSON.stringify(data.schema, null, 2);
  }

  // request url case
  if (config.testModule === 'request') {
    data.path = url.format({
      protocol: swagger.schemes !== undefined ? swagger.schemes[0] : 'http',
      host: swagger.host !== undefined ? swagger.host : 'localhost:10010',
      pathname: requestPath
    });
  } else {
    data.path = requestPath;
  }

  // get requestData from config if defined for this path:operation:response
  if (config.requestData &&
    config.requestData[apiPath] &&
    config.requestData[apiPath][operation] &&
    config.requestData[apiPath][operation][response]) {
    data.requestData = config.requestData[apiPath][operation][response];
    // if we have requestData, fill the path params accordingly
    var mockParameters = {};

    data.pathParameters.forEach(function(parameter) {
      // find the mock data for this parameter name
      mockParameters[parameter.name] = data.requestData.filter(function(mock) {
        return mock.hasOwnProperty(parameter.name);
      })[0][parameter.name];
    });
    // only write parameters if they are not already defined in config
    // @todo we should rework this with code above to be more readable
    if (!config.pathParams) {
      data.pathParams = mockParameters;
    }
  }
  return data;
}

/**
 * Builds a unit test stubs for the response code of a apiPath's operation
 * @private
 * @param  {json} swagger swagger file containing API
 * @param  {string} apiPath API apiPath to generate tests for
 * @param  {string} operation operation of the apiPath to generate tests for
 * @param  {string} response response type of operation of current apiPath
 * @param  {json} config configuration for testGen
 * @param  {string} consume content-type consumed by request
 * @param {string} produce content-type produced by the response
 * @param  {info} info for cascading properties
 * @returns {string} generated test for response type
 */
function testGenResponse(swagger, apiPath, operation, response, config, consume, produce, info) {
  var result;
  var templateFn;
  var source;
  var data;

  // get the data
  data = getData(swagger, apiPath, operation, response, config, info);
  if (helpers.mediaTypeContainsJson(produce) && !data.noSchema) {
    info.importValidator = true;
  }

  if (info.security && info.security.length !== 0) {
    info.importEnv = true;
  }

  data.contentType = consume;
  data.returnType = produce;
  data.requestParameters = {};

  // compile template source and return test string
  var templatePath = path.join(config.templatesPath, config.testModule, operation, operation + '.handlebars');

  source = fs.readFileSync(templatePath, 'utf8');
  templateFn = handlebars.compile(source, {noEscape: true});

  if (data.requestData && data.requestData.length > 0) {
    result = '';
    for (var i = 0; i < data.requestData.length; i++) {
      data.request = JSON.stringify(data.requestData[i].body);

      for (var key in data.requestData[i]) {
        if (['body', 'description'].indexOf(key) === -1) {
          data.requestParameters[key] = data.requestData[i][key];
        }
      }

      data.requestMessage = data.requestData[i].description.replace(/'/g, "\\'");  // eslint-disable-line quotes
      result += templateFn(data);
    }
  } else {
    result = templateFn(data);
  }

  return result;
}

function testGenContentTypes(swagger, apiPath, operation, res, config, info) {
  var result = [];
  var ndxC;
  var ndxP;

  if (!isEmpty(info.consumes)) { // consumes is defined
    for (ndxC in info.consumes) {
      if (!isEmpty(info.produces)) { // produces is defined
        for (ndxP in info.produces) {
          if (info.produces[ndxP] !== undefined) {
            result.push(testGenResponse(swagger, apiPath, operation, res, config, info.consumes[ndxC], info.produces[ndxP], info));
          }
        }
      } else { // produces is not defined
        result.push(testGenResponse(swagger, apiPath, operation, res, config, info.consumes[ndxC], TYPE_JSON, info));
      }
    }
  } else if (!isEmpty(info.produces)) {
    // consumes is undefined but produces is defined
    for (ndxP in info.produces) {
      if (info.produces[ndxP] !== undefined) {
        result.push(testGenResponse(swagger, apiPath, operation, res, config, TYPE_JSON, info.produces[ndxP], info));
      }
    }
  } else { // neither produces nor consumes are defined
    result.push(testGenResponse(swagger, apiPath, operation, res, config, TYPE_JSON, TYPE_JSON, info));
  }

  return result;
}

/**
 * Builds a set of unit test stubs for all response codes of a
 *  apiPath's operation
 * @private
 * @param  {json} swagger swagger file containing API
 * @param  {string} apiPath API apiPath to generate tests for
 * @param  {string} operation operation of the apiPath to generate tests for
 * @param  {json} config configuration for testGen
 * @param  {info} info for cascading properties
 * @returns {string|Array} set of all tests for a apiPath's operation
 */
function testGenOperation(swagger, apiPath, operation, config, info) {

  var responses = swagger.paths[apiPath][operation].responses;

  // filter out the wanted codes
  if (config.statusCodes) {
    responses = {};
    config.statusCodes.forEach(function(code) {
      responses[code] = swagger.paths[apiPath][operation].responses[code];
    });
  }

  var result = [];
  var source;
  var innerDescribeFn;

  source = fs.readFileSync(path.join(config.templatesPath, '/innerDescribe.handlebars'), 'utf8');
  innerDescribeFn = handlebars.compile(source, {noEscape: true});

  // determines which produce types to use
  if (!isEmpty(swagger.paths[apiPath][operation].produces)) {
    info.produces = swagger.paths[apiPath][operation].produces;
  } else if (!isEmpty(swagger.produces)) {
    info.produces = swagger.produces;
  } else {
    info.produces = [];
  }

  // determines which consumes types to use
  if (!isEmpty(swagger.paths[apiPath][operation].consumes)) {
    info.consumes = swagger.paths[apiPath][operation].consumes;
  } else if (!isEmpty(swagger.consumes)) {
    info.consumes = swagger.consumes;
  } else {
    info.consumes = [];
  }

  // determines which security to use
  if (!isEmpty(swagger.paths[apiPath][operation].security)) {
    info.security = swagger.paths[apiPath][operation].security;
  } else if (!isEmpty(swagger.security)) {
    info.security = swagger.security;
  } else {
    info.security = [];
  }

  _.forEach(responses, function(response, responseCode) {
    result = result.concat(testGenContentTypes(swagger, apiPath, operation, responseCode, config, info));
  });

  var output;
  var data = {
    description: operation,
    tests: result
  };


  output = innerDescribeFn(data);

  return output;
}

/**
 * Builds a set of unit test stubs for all of a apiPath's operations
 * @private
 * @param  {json} swagger swagger file containing API
 * @param  {string} apiPath API apiPath to generate tests for
 * @param  {json} config configuration for testGen
 * @returns {string|Array} set of all tests for a apiPath
 */
function testGenPath(swagger, apiPath, config) {
  var childProperty = swagger.paths[apiPath];
  var result = [];
  var validOps = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];
  var allDeprecated = true;
  var outerDescribeFn;
  var source;
  var info = {
    importValidator: false,
    importEnv: false,
    importArete: false,
    consumes: [],
    produces: [],
    security: [],
    loadTest: null
  };

  if (config.loadTest) {
    info.loadTest = config.loadTest;
  }

  source = fs.readFileSync(path.join(config.templatesPath, '/outerDescribe.handlebars'), 'utf8');
  outerDescribeFn = handlebars.compile(source, {noEscape: true});

  _.forEach(childProperty, function(property, propertyName) {
    if (_.includes(validOps, propertyName) && !property.deprecated) {
      allDeprecated = false;
      result.push(testGenOperation(swagger, apiPath, propertyName, config, info));
    }
  });

  var output = '';
  var customFormats = fs.readFileSync(require.resolve('./custom-formats'), 'utf-8');

  var data = {
    description: apiPath,
    assertion: config.assertionFormat,
    testmodule: config.testModule,
    customFormats: customFormats,
    scheme: (swagger.schemes !== undefined ? swagger.schemes[0] : 'http'),
    host: (swagger.host !== undefined ? swagger.host : 'localhost:10010'),
    tests: result,
    importValidator: info.importValidator,
    importEnv: info.importEnv,
    importArete: info.importArete
  };

  if (!allDeprecated) {
    output = outerDescribeFn(data);
    info.importValidator = false;
  }
  return output;
}

/**
 * Builds unit test stubs for all paths specified by the configuration
 * @public
 * @param  {json} swagger swagger file containing API
 * @param  {json} config configuration for testGen
 * @returns {string|Array} set of all tests for a swagger API
 */
function testGen(swagger, config) {
  var paths = swagger.paths;
  var targets = config.pathName;
  var result = [];
  var output = [];
  var i = 0;
  var source;
  var filename;
  var schemaTemp;
  var environment;
  var ndx = 0;

  config.templatesPath = (config.templatesPath) ? config.templatesPath : path.join(__dirname, 'templates');

  swagger = deref(swagger);
  source = fs.readFileSync(path.join(config.templatesPath, '/schema.handlebars'), 'utf8');
  schemaTemp = handlebars.compile(source, {noEscape: true});
  handlebars.registerPartial('schema-partial', schemaTemp);
  source = fs.readFileSync(path.join(config.templatesPath, '/environment.handlebars'), 'utf8');
  environment = handlebars.compile(source, {noEscape: true});
  helpers.setLen(80);

  if (config.maxLen && !isNaN(config.maxLen)) {
    helpers.setLen(config.maxLen);
  }

  if (!targets || targets.length === 0) {
    // builds tests for all paths in API
    _.forEach(paths, function(apipath, pathName) {
      result.push(testGenPath(swagger, pathName, config));
    });
  } else {
    // loops over specified paths from config
    _.forEach(targets, function(target) {
      result.push(testGenPath(swagger, target, config));
    });
  }

  // no specified paths to build, so build all of them
  if (!targets || targets.length === 0) {
    _.forEach(result, function(results) {
      output.push({
        name: '-test.js',
        test: results
      });
    });

    // build file names with paths
    _.forEach(paths, function(apipath, pathName) {
      // for output file name, replace / with -, and truncate the first /
      // eg: /hello/world -> hello-world
      filename = sanitize((pathName.replace(/\//g, '-').substring(1))
        + output[i].name);
      // for base path file name, change it to base-path
      if (pathName === '/') {
        filename = 'base-path' + output[i].name;
      }
      output[i++].name = filename;
    });
  } else {
    // loops over specified paths
    _.forEach(targets, function(target) {
      // for output file name, replace / with -, and truncate the first /
      // eg: /hello/world -> hello-world
      filename = sanitize((target.replace(/\//g, '-').substring(1))
        + '-test.js');
      // for base path file name, change it to base-path
      if (target === '/') {
        filename = 'base-path' + '-test.js';
      }
      output.push({
        name: filename,
        test: result[ndx++]
      });
    });
  }

  if (swagger.securityDefinitions) {
    var keys = Object.keys(swagger.securityDefinitions);

    keys.forEach(function(element, index, array) {
      array[index] = _.snakeCase(element).toUpperCase();
    });
    var data = {envVars: keys};
    var envText = environment(data);

    output.push({
      name: '.env',
      test: envText
    });
  }
  return output;
}

handlebars.registerHelper('is', helpers.is);
handlebars.registerHelper('ifCond', helpers.ifCond);
handlebars.registerHelper('validateResponse', helpers.validateResponse);
handlebars.registerHelper('length', helpers.length);
handlebars.registerHelper('pathify', helpers.pathify);
handlebars.registerHelper('printJSON', helpers.printJSON);
handlebars.registerHelper('requestDataParamFormatter', helpers.requestDataParamFormatter);
handlebars.registerHelper('isJsonRepresentation', helpers.isJsonRepresentation);
handlebars.registerHelper('isJsonMediaType', helpers.isJsonMediaType);


module.exports = {
  testGen: testGen
};
