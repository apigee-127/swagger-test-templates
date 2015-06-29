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

var assert = require('chai').assert;
var testGen = require('../../index.js').testGen;
var swagger = require('./swagger.json');
var lint = require('mocha-eslint');

describe('minimal swagger', function() {
	describe('request-option', function() {
		describe('pathNames-option', function() {

      var output1 = testGen(swagger, {
        'assertionFormat': 'should',
        'pathNames': [],
        'testmodule': 'request'
         ,'destination': './test/minimal' // need to remove this
      });

      var paths = [], ndx;

        for (ndx in output1) {
          paths.push(__dirname + '/' + output1[ndx].name);
        }

			it ('should still generate all paths from empty pathNames option', function() {
        assert.isArray(output1);
        assert.lengthOf(output1, 2);

        lint(paths, {});
      });

      var output2 = testGen(swagger, {
        'assertionFormat': 'should',
        'pathNames': ['/'],
        'testmodule': 'request'
      });

      var paths = [], ndx;

      for (ndx in output2) {
        paths.push(__dirname + '/' + output2[ndx].name);
      }

      it ('should generate specified paths from pathNames option', function() {
        assert.isArray(output2);
        assert.lengthOf(output2, 1);

        lint(paths, {});
      });
		});
	});

	describe('supertest-option', function() {
		describe('pathNames-option', function() {

      var output1 = testGen(swagger, {
        'assertionFormat': 'should',
        'pathNames': [],
        'testmodule': 'supertest'
      });

      var paths = [], ndx;

      for (ndx in output1) {
        paths.push(__dirname + '/' + output1[ndx].name);
      }

      it ('should still generate all paths from empty pathNames option', function() {

        assert.isArray(output1);
        assert.lengthOf(output1, 2);

        lint(paths, {});
      });

      var output2 = testGen(swagger, {
        'assertionFormat': 'should',
        'pathNames': ['/'],
        'testmodule': 'supertest'
      });

      it ('should generate specified paths from pathNames option', function() {

        assert.isArray(output2);
        assert.lengthOf(output2, 1);

        var paths = [], ndx;

        for (ndx in output2) {
          paths.push(__dirname + '/' + output2[ndx].name);
        }

        lint(paths, {});
      });
		});
	});
});