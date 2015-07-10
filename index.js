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

var handlebars = require('handlebars');
var read = require('fs').readFileSync;
var join = require('path').join;
var innerDescribeFn;
var outerDescribeFn;
var schemaTemp;
var importValidator = false;

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
 * @returns {json} return all the properties information
 */
function getData(swagger, path, operation, response, config) {
  var param;
  var type;
  var childProperty = swagger.paths[path];
  var grandProperty = swagger.paths[path][operation];
  var data = { // request payload
    responseCode: response,
    description: (response + ' ' +
    swagger.paths[path][operation].responses[response].description),
    assertion: config.assertionFormat,
    noSchema: true,
    bodyParameters: [],
    queryParameters: [],
    headerParameters: [],
    pathParameters: [],
    formParameters: [],
    security: swagger.security,
    path: ''
  };

  // deal with parameters in path level
  if (childProperty.hasOwnProperty('parameters')) {
    // process different parameters
    for (param in childProperty.parameters) {
      if (childProperty.parameters.hasOwnProperty(param)) {
        type = childProperty.parameters[param];
        switch (type.in) {
          case 'query':
            data.queryParameters.push(type);
            break;
          case 'path':
            data.pathParameters.push(type);
            break;
          case 'header':
            data.headerParameters.push(type);
            break;
          case 'formData':
            data.formParameters.push(type);
            break;
          default:
        }
      }
    }
  }

  // deal with parameters in operation level
  if (grandProperty.hasOwnProperty('parameters')) {
    // only adds body parameters to request, ignores query params
    for (param in grandProperty.parameters) {
      if (grandProperty.parameters.hasOwnProperty(param)) {
        type = grandProperty.parameters[param];
        switch (type.in) {
          case 'query':
            data.queryParameters.push(type);
            break;
          case 'header':
            data.headerParameters.push(type);
            break;
          case 'path':
            data.pathParameters.push(type);
            break;
          case 'formData':
            data.formParameters.push(type);
            break;
          case 'body':
            data.bodyParameters.push(type);
            break;
          default:
        }
      }
    }
  }

  if (grandProperty.responses[response]
      .hasOwnProperty('schema')) {
    data.noSchema = false;
    data.schema = grandProperty.responses[response].schema;
    data.schema = JSON.stringify(data.schema, null, 2);
  }

  if (childProperty.hasOwnProperty('security')) {
    data.returnType = swagger.paths[path][operation].security;
  }

  if (grandProperty.hasOwnProperty('security')) {
    data.returnType = swagger.paths[path][operation].security;
  }

  // request url case
  if (config.testModule === 'request') {
    data.path = (swagger.schemes !== undefined ? swagger.schemes[0] : 'http')
      + '://' + (swagger.host !== undefined ? swagger.host : 'localhost:10010');
  }

  data.path += (((swagger.basePath !== undefined) && (swagger.basePath !== '/'))
      ? swagger.basePath : '') + path;

  // supertest url add query
  var queryToAdd = '';

  if (config.testModule === 'supertest') {
    if (data.queryParameters.length > 0) {
      data.path += '?';
      data.queryParameters.forEach(function(element) {
        queryToAdd = element.name + '=DATA&';
        data.path += queryToAdd;
      });
      data.path = data.path.substring(0,
        data.path.lastIndexOf('&'));
    }
  }

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
 * @returns {string} generated test for response type
 */
function testGenResponse(swagger, path, operation, response, config,
  consume, produce) {
  var result;
  var templateFn;
  var source;
  var data;

  // get the data
  data = getData(swagger, path, operation, response, config);
  if (produce === 'application/json' && !data.noSchema) {
    importValidator = true;
  }

  data.contentType = consume;
  data.returnType = produce;

  // compile template source and return test string
  var templatePath = join(__dirname, '/templates',
    config.testModule, operation, operation + '.handlebars');

  source = read(templatePath, 'utf8');
  templateFn = handlebars.compile(source, {noEscape: true});
  result = templateFn(data);
  return result;
}

function testGenContentTypes(swagger, path, operation, res, config) {
  var result = [];
  var produces = swagger.paths[path][operation].produces ?
    swagger.paths[path][operation].produces : swagger.produces;
  var consumes = swagger.paths[path][operation].consumes ?
    swagger.paths[path][operation].consumes : swagger.consumes;
  var ndxC;
  var ndxP;

  if (!isEmpty(consumes)) { // consumes is defined
    for (ndxC in consumes) {
      if (!isEmpty(produces)) { // produces is defined
        for (ndxP in produces) {
          if (produces[ndxP] !== undefined) {
            result.push(testGenResponse(
              swagger, path, operation, res, config,
              consumes[ndxC], produces[ndxP]));
          }
        }
      } else { // produces is not defined
        result.push(testGenResponse(
          swagger, path, operation, res, config,
          consumes[ndxC], 'application/json'));
      }
    }
  } else if (!isEmpty(produces)) {
    // consumes is undefined but produces is defined
    for (ndxP in produces) {
      if (produces[ndxP] !== undefined) {
        result.push(testGenResponse(
          swagger, path, operation, res, config,
          'application/json', produces[ndxP]));
      }
    }
  } else { // neither produces nor consumes are defined
    result.push(testGenResponse(
      swagger, path, operation, res, config,
      'application/json', 'application/json'));
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
 * @returns {string|Array} set of all tests for a path's operation
 */
function testGenOperation(swagger, path, operation, config) {
  var responses = swagger.paths[path][operation].responses;
  var result = [];
  var res;

  for (res in responses) {
    if (responses.hasOwnProperty(res)) {
      result = result.concat(testGenContentTypes(swagger, path, operation,
        res, config));
    }
  }

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
  var property;
  var validOps = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];

  for (property in childProperty) {
    if (childProperty.hasOwnProperty(property)
      && validOps.indexOf(property) >= 0) {
      result.push(
        testGenOperation(swagger, path, property, config));
    }
  }

  var output;
  var data = {
    description: path,
    assertion: config.assertionFormat,
    testmodule: config.testModule,
    scheme: (swagger.schemes !== undefined ? swagger.schemes[0] : 'http'),
    host: (swagger.host !== undefined ? swagger.host : 'localhost:10010'),
    tests: result,
    importValidator: importValidator
  };

  output = outerDescribeFn(data);
  importValidator = false;
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
  var path;
  var ndx;
  var i = 0;
  var source;

  source = read('templates/schema.handlebars', 'utf8');
  schemaTemp = handlebars.compile(source, {noEscape: true});
  handlebars.registerPartial('schema-partial', schemaTemp);
  source = read(join(__dirname, '/templates/innerDescribe.handlebars'), 'utf8');
  innerDescribeFn = handlebars.compile(source, {noEscape: true});
  source = read(join(__dirname, '/templates/outerDescribe.handlebars'), 'utf8');
  outerDescribeFn = handlebars.compile(source, {noEscape: true});

  if (config.pathName.length === 0) {
    // builds tests for all paths in API
    for (path in paths) {
      if (paths.hasOwnProperty(path)) {
        result.push(testGenPath(swagger, path, config));
      }
    }
  } else {
    // loops over specified paths from config
    for (path in targets) {
      if (paths.hasOwnProperty(targets[path])) {
        result.push(testGenPath(swagger, targets[path], config));
      }
    }
  }

  // no specified paths to build, so build all of them
  if (config.pathName.length === 0) {
    for (ndx in result) {
      if (result.hasOwnProperty(ndx)) {
        output.push({
          name: '_Stub.js',
          test: result[ndx]
        });
      }
    }

    // build file names with paths
    for (path in paths) {
      if (paths.hasOwnProperty(path)) {
        output[i].name = (path.replace(/\//g, '_')) + output[i++].name;
      }
    }
  } else {
    // loops over specified paths
    for (path in targets)
      if (paths.hasOwnProperty(targets[path])) {
        output.push({
          name: (targets[path].replace(/\//g, '_')) + '_Stub.js',
          test: result[path]
        });
      }
  }

  return output;
}

module.exports = {
  testGen: testGen
};

// http://goo.gl/LFoiYG
handlebars.registerHelper('is', function(lvalue, rvalue, options) {
  if (arguments.length < 3) {
    throw new Error('Handlebars Helper \'is\' needs 2 parameters');
  }

  if (lvalue !== rvalue) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

handlebars.registerHelper('validateResponse', function(type, noSchema,
  options) {
  if (arguments.length < 3) {
    throw new Error('Handlebars Helper \'validateResponse\'' +
      'needs 2 parameters');
  }

  if (!noSchema && type === 'application/json') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
