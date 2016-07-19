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
var linter = require('eslint').linter;
var yaml = require('js-yaml');
var join = require('path').join;
var rules;
var read = require('fs').readFileSync;

rules = yaml.safeLoad(read(join(__dirname, '/../../.eslintrc'), 'utf8'));
rules.env = {mocha: true};

describe('pathParams swagger', function() {
  describe('assert-option', function() {
    describe('pathParams', function() {
      var output1 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'request'
      });

      var paths1 = [];
      var ndx;

      for (ndx in output1) {
        if (output1) {
          paths1.push(join(__dirname, '/compare/output1-' + output1[ndx].name));
        }
      }

      it('should have path parameters with an obvious indicator', function() {

        assert.isArray(output1);
        assert.lengthOf(output1, 1);

        var generatedCode;

        for (ndx in paths1) {
          if (paths1 !== undefined) {
            generatedCode = read(paths1[ndx], 'utf8').replace(/\r\n/g, '\n');
            assert.equal(output1[ndx].test.replace(/\r\n/g, '\n'),
              generatedCode);
          }
        }

        for (ndx in output1) {
          if (output1 !== undefined) {
            assert.lengthOf(linter.verify(output1[ndx].test, rules), 0);
          }
        }
      });
    });
  });

  describe('supertest-option', function() {
    describe('pathParams', function() {
      var output2 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'supertest'
      });

      var paths2 = [];
      var ndx;

      for (ndx in output2) {
        if (output2) {
          paths2.push(join(__dirname, '/compare/output2-' + output2[ndx].name));
        }
      }

      it('should have path parameters with an obvious indicator', function() {

        assert.isArray(output2);
        assert.lengthOf(output2, 1);

        var generatedCode;

        for (ndx in paths2) {
          if (paths2 !== undefined) {
            generatedCode = read(paths2[ndx], 'utf8').replace(/\r\n/g, '\n');
            assert.equal(output2[ndx].test.replace(/\r\n/g, '\n'),
              generatedCode);
          }
        }

        for (ndx in output2) {
          if (output2 !== undefined) {
            assert.lengthOf(linter.verify(output2[ndx].test, rules), 0);
          }
        }
      });
    });
  });

  describe('user-supplied', function() {
    describe('pathParams', function() {
      var output3 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'supertest',
        pathParams: {
          id: 'userSuppliedID'
        }
      });

      var paths3 = [];
      var ndx;

      for (ndx in output3) {
        if (output3) {
          paths3.push(join(__dirname, '/compare/output3-' + output3[ndx].name));
        }
      }


      it('should have a path parameter where "{id}" was', function() {
        assert.isArray(output3);
        assert.lengthOf(output3, 1);

        var generatedCode;

        for (ndx in paths3) {
          if (paths3 !== undefined) {
            generatedCode = read(paths3[ndx], 'utf8').replace(/\r\n/g, '\n');
            assert.equal(output3[ndx].test.replace(/\r\n/g, '\n'),
              generatedCode);
          }
        }

        for (ndx in output3) {
          if (output3 !== undefined) {
            assert.lengthOf(linter.verify(output3[ndx].test, rules), 0);
          }
        }
      });
    });
  });
});
