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
var write = require('fs').writeFile;

function logError(err) {
  if (err) {
    console.log(err);
  }
}

describe('minimal swagger', function() {
	describe('request-option', function() {
		describe('pathNames-option', function() {

      var output1 = testGen(swagger, {
        'assertionFormat': 'should',
        'pathNames': [],
        'testmodule': 'request'
      });

      var paths1 = [], ndx;

        for (ndx in output1) {
          write(__dirname +'/compare/output1' + output1[ndx].name, output1[ndx].test, logError);
          paths1.push(__dirname +'/compare/output1' + output1[ndx].name);
        }

			it ('should still generate all paths from empty pathNames option with should', function() {
        assert.isArray(output1);
        assert.lengthOf(output1, 2);

        lint(paths1, {});
      });

      var output2 = testGen(swagger, {
        'assertionFormat': 'should',
        'pathNames': ['/'],
        'testmodule': 'request'
      });

      var paths2 = [], ndx;

      for (ndx in output2) {
        write(__dirname +'/compare/output2' + output2[ndx].name, output2[ndx].test, logError);
        paths2.push(__dirname +'/compare/output2' + output2[ndx].name);
      }

      it ('should generate specified paths from pathNames option with should', function() {
        assert.isArray(output2);
        assert.lengthOf(output2, 1);

        lint(paths2, {});
      });
		});

    describe('asertionFormat-option', function(){
      var output5 = testGen(swagger, {
        'assertionFormat': 'assert',
        'pathNames': [],
        'testmodule': 'request'
      });

      var paths5 = [], ndx;

        for (ndx in output5) {
          write(__dirname +'/compare/output5' + output5[ndx].name, output5[ndx].test, logError);
          paths5.push(__dirname +'/compare/output5' + output5[ndx].name);
        }

      it ('should still generate all paths with assert', function() {
        assert.isArray(output5);
        assert.lengthOf(output5, 2);

        lint(paths5, {});
      });

      var output6 = testGen(swagger, {
        'assertionFormat': 'expect',
        'pathNames': [],
        'testmodule': 'request'
      });

      var paths6 = [], ndx;

        for (ndx in output6) {
          write(__dirname +'/compare/output6' + output6[ndx].name, output6[ndx].test, logError);
          paths6.push(__dirname +'/compare/output6' + output6[ndx].name);
        }

      it ('should still generate all paths with except', function() {
        assert.isArray(output6);
        assert.lengthOf(output6, 2);

        lint(paths6, {});
      });
    });
	});

	describe('supertest-option', function() {
		describe('pathNames-option', function() {

      var output3 = testGen(swagger, {
        'assertionFormat': 'should',
        'pathNames': [],
        'testmodule': 'supertest'
      });

      var paths3 = [], ndx;

      for (ndx in output3) {
        write(__dirname +'/compare/output3' + output3[ndx].name, output3[ndx].test, logError);
        paths3.push(__dirname +'/compare/output3' + output3[ndx].name);
      }

      it ('should still generate all paths from empty pathNames option with should', function() {

        assert.isArray(output3);
        assert.lengthOf(output3, 2);

        lint(paths3, {});
      });

      var output4 = testGen(swagger, {
        'assertionFormat': 'should',
        'pathNames': ['/'],
        'testmodule': 'supertest'
      });

      it ('should generate specified paths from pathNames option with should', function() {

        assert.isArray(output4);
        assert.lengthOf(output4, 1);

        var paths4 = [], ndx;

        for (ndx in output4) {
          write(__dirname +'/compare/output4' + output4[ndx].name, output4[ndx].test, logError);
          paths4.push(__dirname +'/compare/output4' + output4[ndx].name);
        }

        lint(paths4, {});
      });
		});

    describe('assertionFormat-option', function(){
      var output7 = testGen(swagger, {
        'assertionFormat': 'assert',
        'pathNames': [],
        'testmodule': 'supertest'
      });

      var paths7 = [], ndx;

      for (ndx in output7) {
        write(__dirname +'/compare/output7' + output7[ndx].name, output7[ndx].test, logError);
        paths7.push(__dirname +'/compare/output7' + output7[ndx].name);
      }

      it ('should still generate all paths with assert', function() {

        assert.isArray(output7);
        assert.lengthOf(output7, 2);

        lint(paths7, {});
      });

      var output8 = testGen(swagger, {
        'assertionFormat': 'expect',
        'pathNames': [],
        'testmodule': 'supertest'
      });

      var paths8 = [], ndx;

      for (ndx in output8) {
        write(__dirname +'/compare/output8' + output8[ndx].name, output8[ndx].test, logError);
        paths8.push(__dirname +'/compare/output8' + output8[ndx].name);
      }

      it ('should still generate all paths with expect', function() {

        assert.isArray(output8);
        assert.lengthOf(output8, 2);

        lint(paths8, {});
      });
    });
	});
});