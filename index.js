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

/**
 * Builds a unit test stubs for the response code of a path's operation
 * @private
 * @param  {json} swagger swagger file containing API
 * @param  {string} path API path to generate tests for
 * @param  {string} operation operation of the path to generate tests for
 * @param  {string} response response type of operation of current path
 * @param  {json} config configuration for testGen
 * @returns {string} generated test for response type
 */
function testGenResponse(swagger, path, operation, response, config, parameters_array) {
  var result;
  var templateFn;
  var source;
  var param;
  var data = { // request payload
      responseCode: response,
      description: (response + ' ' +
        swagger.paths[path][operation].responses[response].description),
      assertion: config.assertionFormat,
      bodyParameters: parameters_array.bodyParameters,
      queryParameters: parameters_array.queryParameters,
      headerParameters: parameters_array.headerParameters,
      pathParameters: parameters_array.pathParameters,
      formParameters: parameters_array.formParameters,
      contentType: swagger.consumes,
      path: ''
    };

  // adding body parameters to payload
  if (swagger.paths[path][operation].hasOwnProperty('parameters')) {
    // only adds body parameters to request, ignores query params
    for (param in swagger.paths[path][operation].parameters) {
      if (swagger.paths[path][operation].parameters[param].in === 'body') {
        data.bodyParameters.push(swagger.paths[path][operation].parameters[param]);
      } else if (swagger.paths[path][operation].parameters[param].in === 'query') {
        data.queryParameters.push(swagger.paths[path][operation].parameters[param]);
      } else if (swagger.paths[path][operation].parameters[param].in === 'form') {
        data.formParameters.push(swagger.paths[path][operation].parameters[param]);
      } else if (swagger.paths[path][operation].parameters[param].in === 'path') {
        data.pathParameters.push(swagger.paths[path][operation].parameters[param]);
      } else if (swagger.paths[path][operation].parameters[param].in === 'header') {
        data.headerParameters.push(swagger.paths[path][operation].parameters[param]);
      }
    }
  }

  if (swagger.paths[path][operation].hasOwnProperty('consumes')) {
    data.contentType = swagger.paths[path][operation].consumes;
  }

  // request url case
  if (config.testModule === 'request') {
    data.path = (swagger.schemes !== undefined ? swagger.schemes[0] : 'http')
      + '://' + (swagger.host !== undefined ? swagger.host : 'localhost:10010');
  }

  data.path += (swagger.basePath !== undefined ? swagger.basePath : '') + path;

  // supertest url add query
  if (config.testModule === 'supertest') {
    for (var query in data.queryParameters) {
      var queryToAdd = query.name + '=' + 'DATA' + '&';
      data.path += queryToAdd;
    }
    data.path = data.path.substring(0, data.path.lastIndexOf('&'));
  }

  // compile template source and return test string
  source = read(join(__dirname, '/templates', config.testModule, operation, operation
    + '.handlebars'), 'utf8');
  var templatePath = join(__dirname, '/templates',
    config.testModule,
    operation,
    operation + '.handlebars');

  source = read(templatePath, 'utf8');
  templateFn = handlebars.compile(source, {noEscape: true});
  result = templateFn(data);

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
function testGenOperation(swagger, path, operation, config, parameters) {
  var responses = swagger.paths[path][operation].responses;
  var result = [];
  var res;

  for (res in responses) {
    if (responses.hasOwnProperty(res)) {
      result.push(testGenResponse(swagger,
        path,
        operation,
        res,
        config, parameters));
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
  var parameters = {
    queryParameters: [],
    bodyParameters: [],
    headerParameters: [],
    formParameters: [],
    pathParameters: []
  };
  var childProperty = swagger.paths[path];
  var result = [];
  var cp;
  var validOps = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];

  if (childProperty.hasOwnProperty('parameters')) {
    // only adds body parameters to request, ignores query params
    for (var p in childProperty.parameters) {
      if (childProperty.parameters[p].in === 'body') {
        parameters.bodyParameters.push(childProperty.parameters[p]);
      } else if (childProperty.parameters[p].in === 'query') {
        parameters.queryParameters.push(childProperty.parameters[p]);
      } else if (childProperty.parameters[p].in === 'header') {
        parameters.headerParameters.push(childProperty.parameters[p]);
      } else if (childProperty.parameters[p].in === 'form') {
        parameters.formParameters.push(childProperty.parameters[p]);
      } else if (childProperty.parameters[p].in === 'path') {
        parameters.pathParameters.push(childProperty.parameters[p]);
      }
    }
  }

  for (cp in childProperty) {
    if (childProperty.hasOwnProperty(cp) && validOps.indexOf(cp) >= 0) {
      result.push(testGenOperation(swagger, path, cp, config, parameters));
    }
  }

  var output;
  var data = {
    description: path,
    assertion: config.assertionFormat,
    testmodule: config.testModule,
    scheme: (swagger.schemes !== undefined ? swagger.schemes[0] : 'http'),
    host: (swagger.host !== undefined ? swagger.host : 'localhost:10010'),
    tests: result
  };

  output = outerDescribeFn(data);

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

  source = read(join(__dirname, '/templates/innerDescribe.handlebars'), 'utf8');
  innerDescribeFn = handlebars.compile(source, {noEscape: true});

  source = read(join(__dirname + '/templates/outerDescribe.handlebars'), 'utf8');
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
