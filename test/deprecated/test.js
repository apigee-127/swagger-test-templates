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

describe('deprecated swagger', function() {
  describe('assert-option', function() {
    describe('expect', function() {
      var output1 = testGen(swagger, {
        assertionFormat: 'expect',
        pathName: [],
        testModule: 'request'
      });

      var paths1 = [];
      var ndx;

      for (ndx in output1) {
        if (output1) {
          paths1.push(join(__dirname, '/compare/' +
            output1[ndx].name));
        }
      }

      it('should have path parameters with an obvious indicator', function() {

        assert.isArray(output1);
        assert.lengthOf(output1, 2);

        var generatedCode;

        for (ndx in paths1) {
          if (paths1 !== undefined) {
            generatedCode = read(paths1[ndx], 'utf8');
            assert.equal(output1[ndx].test, generatedCode);
          }
        }

        for (ndx in output1) {
          if (output1 !== undefined && output1[ndx].name !== '.env') {
            assert.lengthOf(linter.verify(output1[ndx].test, rules), 0);
          }
        }
      });
    });
  });
});
