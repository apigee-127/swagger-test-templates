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
var read = require('fs').readFileSync;
var _ = require('lodash');
var join = require('path').join;
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
 * @param  {string} path API path to generate tests for
 * @param  {string} operation operation of the path to generate tests for
 * @param  {string} response response type of operation of current path
 * @param  {json} config configuration for testGen
 * @param  {info} info for cascading properties
 * @returns {json} return all the properties information
 */
function getData(swagger, path, operation, response, config, info) {
  var childProperty = swagger.paths[path];
  var grandProperty = swagger.paths[path][operation];
  var securityType;
  var data = { // request payload
    responseCode: response,
    default: response === 'default' ? 'default' : null,
    description: (response + ' ' +
    swagger.paths[path][operation].responses[response].description),
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

  // used for checking inputTesting table
  var tempPath = (((swagger.basePath !== undefined) &&
      (swagger.basePath !== '/'))
      ? swagger.basePath : '') + path;

  // get inputTesting from config if defined for this path:operation:response
  if (config.inputTesting &&
      config.inputTesting[tempPath] &&
      config.inputTesting[tempPath][operation] &&
      config.inputTesting[tempPath][operation][response]) {
    data.inputTesting = config.inputTesting[tempPath][operation][response];
  }

  // cope with loadTest info
  if (info.loadTest != null) {
    _.forEach(info.loadTest, function(loadTestParam) {
      if (loadTestParam.pathName === path
        && loadTestParam.operation === operation) {
        data.loadName = path.replace(/\//g, '_') +
          '_' + operation + '_load_test';
        info.importArete = true;
        data.isLoadTest = true;
        data.requests = loadTestParam.load.requests !== undefined ?
          loadTestParam.load.requests : 1000;
        data.concurrent = loadTestParam.load.concurrent !== undefined ?
          loadTestParam.load.concurrent : 100;
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

  if (grandProperty.responses[response]
      .hasOwnProperty('schema')) {
    data.noSchema = false;
    data.schema = grandProperty.responses[response].schema;
    data.schema = JSON.stringify(data.schema, null, 2);
  }

  // request url case
  if (config.testModule === 'request') {
    data.path = (swagger.schemes !== undefined ? swagger.schemes[0] : 'http')
      + '://' + (swagger.host !== undefined ? swagger.host : 'localhost:10010');
  }

  data.path += (((swagger.basePath !== undefined) && (swagger.basePath !== '/'))
      ? swagger.basePath : '') + path;

  return data;
}

/**
 * Builds a unit test stubs for the response code of a path's operation
 * @private
 * @param  {json} swagger swagger file containing API
 * @param  {string} path API path to generate tests for
 * @param  {string} operation operation of the path to generate tests for
 * @param  {string} response response type of operation of current path
 * @param  {json} config configuration for testGen
 * @param  {string} consume content-type consumed by request
 * @param {string} produce content-type produced by the response
 * @param  {info} info for cascading properties
 * @returns {string} generated test for response type
 */
function testGenResponse(swagger, path, operation, response, config,
  consume, produce, info) {
  var result;
  var templateFn;
  var source;
  var data;

  // get the data
  data = getData(swagger, path, operation, response, config, info);
  if (produce === TYPE_JSON && !data.noSchema) {
    info.importValidator = true;
  }

  if (info.security && info.security.length !== 0) {
    info.importEnv = true;
  }

  data.contentType = consume;
  data.returnType = produce;

  // compile template source and return test string
  var templatePath = join(config.templatesPath,
    config.testModule, operation, operation + '.handlebars');

  source = read(templatePath, 'utf8');
  templateFn = handlebars.compile(source, {noEscape: true});

  if (data.inputTesting && data.inputTesting.length > 0) {
    result = '';
    for (var i = 0; i < data.inputTesting.length; i++) {
      data.inputs = data.inputTesting[i];
      result += templateFn(data);
    }
  } else {
    result = templateFn(data);
  }

  return result;
}

function testGenContentTypes(swagger, path, operation, res, config, info) {
  var result = [];
  var ndxC;
  var ndxP;

  if (!isEmpty(info.consumes)) { // consumes is defined
    for (ndxC in info.consumes) {
      if (!isEmpty(info.produces)) { // produces is defined
        for (ndxP in info.produces) {
          if (info.produces[ndxP] !== undefined) {
            result.push(testGenResponse(
              swagger, path, operation, res, config,
              info.consumes[ndxC], info.produces[ndxP], info));
          }
        }
      } else { // produces is not defined
        result.push(testGenResponse(
          swagger, path, operation, res, config,
          info.consumes[ndxC], TYPE_JSON, info));
      }
    }
  } else if (!isEmpty(info.produces)) {
    // consumes is undefined but produces is defined
    for (ndxP in info.produces) {
      if (info.produces[ndxP] !== undefined) {
        result.push(testGenResponse(
          swagger, path, operation, res, config,
          TYPE_JSON, info.produces[ndxP], info));
      }
    }
  } else { // neither produces nor consumes are defined
    result.push(testGenResponse(
      swagger, path, operation, res, config,
      TYPE_JSON, TYPE_JSON, info));
  }

  return result;
}

/**
 * Builds a set of unit test stubs for all response codes of a
 *  path's operation
 * @private
 * @param  {json} swagger swagger file containing API
 * @param  {string} path API path to generate tests for
 * @param  {string} operation operation of the path to generate tests for
 * @param  {json} config configuration for testGen
 * @param  {info} info for cascading properties
 * @returns {string|Array} set of all tests for a path's operation
 */
function testGenOperation(swagger, path, operation, config, info) {
  var responses = swagger.paths[path][operation].responses;
  var result = [];
  var source;
  var innerDescribeFn;

  source = read(join(config.templatesPath,
    '/innerDescribe.handlebars'), 'utf8');
  innerDescribeFn = handlebars.compile(source, {noEscape: true});

  // determines which produce types to use
  if (!isEmpty(swagger.paths[path][operation].produces)) {
    info.produces = swagger.paths[path][operation].produces;
  } else if (!isEmpty(swagger.produces)) {
    info.produces = swagger.produces;
  } else {
    info.produces = [];
  }

  // determines which consumes types to use
  if (!isEmpty(swagger.paths[path][operation].consumes)) {
    info.consumes = swagger.paths[path][operation].consumes;
  } else if (!isEmpty(swagger.consumes)) {
    info.consumes = swagger.consumes;
  } else {
    info.consumes = [];
  }

  // determines which security to use
  if (!isEmpty(swagger.paths[path][operation].security)) {
    info.security = swagger.paths[path][operation].security;
  } else if (!isEmpty(swagger.security)) {
    info.security = swagger.security;
  } else {
    info.security = [];
  }

  _.forEach(responses, function(response, responseCode) {
    result = result.concat(testGenContentTypes(swagger, path, operation,
      responseCode, config, info));
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
 * Builds a set of unit test stubs for all of a path's operations
 * @private
 * @param  {json} swagger swagger file containing API
 * @param  {string} path API path to generate tests for
 * @param  {json} config configuration for testGen
 * @returns {string|Array} set of all tests for a path
 */
function testGenPath(swagger, path, config) {
  var childProperty = swagger.paths[path];
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

  source = read(join(config.templatesPath,
    '/outerDescribe.handlebars'), 'utf8');
  outerDescribeFn = handlebars.compile(source, {noEscape: true});

  _.forEach(childProperty, function(property, propertyName) {
    if (_.includes(validOps, propertyName) && !property.deprecated) {
      allDeprecated = false;
      result.push(
        testGenOperation(swagger, path, propertyName, config, info));
    }
  });

  var output = '';
  var data = {
    description: path,
    assertion: config.assertionFormat,
    testmodule: config.testModule,
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

  // see if templatePath is set by user in config.
  // else set it te the default location so we can pass it on.
  config.templatesPath = (config.templatesPath) ?
    config.templatesPath : join(__dirname, 'templates');

  swagger = deref(swagger);
  source = read(join(config.templatesPath, '/schema.handlebars'), 'utf8');
  schemaTemp = handlebars.compile(source, {noEscape: true});
  handlebars.registerPartial('schema-partial', schemaTemp);
  source = read(join(config.templatesPath, '/environment.handlebars'), 'utf8');
  environment = handlebars.compile(source, {noEscape: true});
  helpers.len = 80;

  if (config.maxLen && !isNaN(config.maxLen)) {
    helpers.len = config.maxLen;
  }

  if (!targets || targets.length === 0) {
    // builds tests for all paths in API
    _.forEach(paths, function(path, pathName) {
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
    _.forEach(paths, function(path, pathName) {
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

module.exports = {
  testGen: testGen
};
