'use strict';

var handlebars = require('handlebars'),
	read = require('fs').readFileSync,
  write = require('fs').writeFile;

// var swag = require('./test/minimal/swagger.json');

// var config = {
//     'assertionFormat': 'should',
//     'pathNames': ['/', '/user'],
//     'testmodule': 'supertest',
//     'destination': './test/minimal'
//   };

/**
 * Builds a unit test stubs for the response code of a path's operation
 * @param  {json} swagger swagger file containing API
 * @param  {string} path API path to generate tests for
 * @param  {string} operation operation of the path to generate tests for
 * @param  {string} response response type of operation of current path
 * @param  {json} config configuration for testGen
 * @returns {string} generated test for response type
 */
function testGenResponse(swagger, path, operation, response, config) {
  var result, gen, source, param,
    // request payload
    data = {
      'responseCode': response,
      'description': swagger.paths[path][operation].responses[response].description,
      'assertion': config.assertionFormat,
      'asynchronous': true
    };

  // adding body parameters to payload
  if (swagger.paths[path][operation].hasOwnProperty('parameters')) {
    data.parameters = [];

    // only adds body parameters to request, ignores query params
    for (param in swagger.paths[path][operation].parameters) {
      if (swagger.paths[path][operation].parameters[param].in === 'body') {
        data.parameters.push(swagger.paths[path][operation].parameters[param]);
      }
    }
  }

  // request url vs. supertest path
  if (config.testmodule === 'request') {
    data.url = swagger.schemes[0] + '://' + swagger.host +
      (swagger.basePath !== undefined ? swagger.basePath : '') + path;
  } else {
    data.path = (swagger.basePath !== undefined ? swagger.basePath : '') + path;
  }

  // template source decision logic
  if (operation === 'get') {
    if (!data.hasOwnProperty('parameters') || data.parameters.length === 0) {
      source = read('./templates/' + config.testmodule
        + '/get/get.handlebars', 'utf8');
    }
  } else if (operation === 'post') {
    source = read('./templates/' + config.testmodule
      + '/post/post.handlebars', 'utf8');
  } else if (operation === 'put') {
    source = read('./templates/' + config.testmodule
      + '/put/put/handlebars', 'utf8');
  }

  // compile template source and return test string
  gen = handlebars.compile(source);
  result = gen(data);

  return result;
}

/**
 * Builds a set of unit test stubs for all response codes of a
 *  path's operation
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
 * @param  {json} swagger swagger file containing API
 * @param  {json} config configuration for testGen
 * @returns {string|Array} set of all tests for a swagger API
 */
function testGen(swagger, config) {
	var paths = swagger.paths,
    targets = config.pathNames,
		result = [],
    output = [],
    path, ndx, test, i = 0;

  var imports = "'use strict';\n\n"
    + "var chai = require('chai'),\n"
    + "  request = require('request'),\n"
    + "  supertest = require('supertest');\n"
    + "var api = supertest('" + swagger.schemes[0] + '://' + swagger.host + "'); // supertest init\n\n";

  if (config.pathNames.length === 0) {
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


  if (config.pathNames.length === 0) {
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


  // for (var ndx in output)
  //   console.log(output[ndx].test);

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

// https://gist.github.com/doginthehat/1890659
handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

  if (arguments.length < 3) {
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }

  var operator = options.hash.operator || '==';

  var operators = {
    '==': function(l, r) {
      return l === r;
    },
    '===': function(l, r) {
      return l === r;
    },
    '!=': function(l, r) {
      return l !== r;
    },
    '<': function(l, r) {
      return l < r;
    },
    '>': function(l, r) {
      return l > r;
    },
    '<=': function(l, r) {
      return l <= r;
    },
    '>=': function(l, r) {
      return l >= r;
    },
    'typeof': function(l, r) {
      return typeof l === r;
    }
  };

  if (!operators[operator]) {
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
  }

  var result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }

});

// testGen(swag, config);
