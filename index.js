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
var innerDescribeFn, outerDescribeFn;

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
function testGenResponse(swagger, path, operation, response, config) {
  var result, templateFn, source, param,
    // request payload
    data = {
      'responseCode': response,
      'description': (response + ' ' +
        swagger.paths[path][operation].responses[response].description),
      'assertion': config.assertionFormat,
      'parameters': [],
      'path': ''
    };

  // adding body parameters to payload
  if (swagger.paths[path][operation].hasOwnProperty('parameters')) {
    // only adds body parameters to request, ignores query params
    for (param in swagger.paths[path][operation].parameters) {
      if (swagger.paths[path][operation].parameters[param].in === 'body') {
        data.parameters.push(swagger.paths[path][operation].parameters[param]);
      }
    }
  }

  // request url case
  if (config.testModule === 'request') {
    data.path = (swagger.schemes !== undefined ? swagger.schemes[0] : 'http')
      + '://' + (swagger.host !== undefined ? swagger.host : 'localhost:10010');
  }

  data.path += (swagger.basePath !== undefined ? swagger.basePath : '') + path;

  // compile template source and return test string
  source = read(join('templates', config.testModule, operation, operation + '.handlebars'), 'utf8');
  var templatePath = join('./templates',
    config.testModule,
    operation,
    operation + '.handlebars');

  source = read(templatePath, 'utf8');
  templateFn = handlebars.compile(source);
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
function testGenOperation(swagger, path, operation, config) {
  var responses = swagger.paths[path][operation].responses,
    result = [], res;

  for (res in responses) {
    if (responses.hasOwnProperty(res)) {
      result.push(testGenResponse(swagger,
        path,
        operation,
        res,
        config));
    }
  }

  var output,
  data = {
    'description': operation,
    'tests': result
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
  var operations = swagger.paths[path],
    result = [], op;

  for (op in operations) {
    if (operations.hasOwnProperty(op)) {
      result.push(testGenOperation(swagger, path, op, config));
    }
  }

  var output,
  data = {
    'description': path,
    'assertion': config.assertionFormat,
    'testmodule': config.testModule,
    'scheme': (swagger.schemes !== undefined ? swagger.schemes[0] : 'http'),
    'host': (swagger.host !== undefined ? swagger.host : 'localhost:10010'),
    'tests': result
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
	var paths = swagger.paths,
    targets = config.pathName,
		result = [],
    output = [],
    path,
    ndx,
    i = 0,
    source;

  source = read('templates/innerDescribe.handlebars', 'utf8');
  innerDescribeFn = handlebars.compile(source, {noEscape: true});

  source = read('templates/outerDescribe.handlebars', 'utf8');
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
        'name': '_Stub.js',
        'test': result[ndx]
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
          'name': (targets[path].replace(/\//g, '_')) + '_Stub.js',
          'test': result[path]
        });
      }
  }

  return output;
}

module.exports = {
  testGen: testGen
};

// http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/
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
