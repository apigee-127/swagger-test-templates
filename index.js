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
var write = require('fs').writeFile;

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
      'description': swagger.paths[path][operation].responses[response].description,
      'assertion': config.assertionFormat,
      'parameters': []
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

  // request url vs. supertest path
  if (config.testModule === 'request') {
    data.url = swagger.schemes[0] + '://' + swagger.host +
      (swagger.basePath !== undefined ? swagger.basePath : '') + path;
  } else {
    data.path = (swagger.basePath !== undefined ? swagger.basePath : '') + path;
  }

  // compile template source and return test string
  source = read('./templates/' + config.testModule
        + '/' + operation + '/' + operation + '.handlebars', 'utf8');
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
    result = [], res, test;

  for (res in responses) {
    if (responses.hasOwnProperty(res)) {
      result.push(testGenResponse(swagger,
        path,
        operation,
        res,
        config));
    }
  }

  var output = "  describe('" + operation + "', function() {\n";

  for (test in result) {
    if (result.hasOwnProperty(test)) {
      output += result[test];
    }
  }

  output += '  });\n';

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

  var output = "describe('" + path + "', function() {\n", test;

  for (test in result) {
    if (result.hasOwnProperty(test)) {
      output += result[test];
    }
  }

  output += '});\n';

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
    path, ndx, test, i = 0;

  var imports = "'use strict';\n\n"
    + "var chai = require('chai'),\n"
    + "  request = require('request'),\n"
    + "  supertest = require('supertest');\n"
    + "var api = supertest('" + swagger.schemes[0] + '://' + swagger.host + "'); // supertest init\n\n";

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


  if (config.pathName.length === 0) {
    for (ndx in result) {
      if (result.hasOwnProperty(ndx)) {
        output.push({
        'name': 'Stub.js',
        'test': imports + result[ndx]
        });
      }
    }

    // build file names from paths
    for (path in paths) {
      if (paths.hasOwnProperty(path)) {
        output[i].name = (path.replace('/', '_')) + output[i++].name;
      }
    }
  } else {
    // loops over specified paths
    for (path in targets)
      if (paths.hasOwnProperty(targets[path])) {
        output.push({
          'name': (targets[path].replace('/', '_')) + 'Stub.js',
          'test': imports + result[path]
        });
      }
  }

  function logError(err) {
    if (err) {
      console.log(err);
    }
  }

  if (config.hasOwnProperty('destination')) {
    for (test in output) {
      if (output.hasOwnProperty(test)) {
        write(config.destination + '/' + output[test].name, output[test].test, logError);
      }
    }
  }

  return output;
}

module.exports = {
  testGen: testGen
};

// http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/
handlebars.registerHelper('is', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper 'is' needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});
