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

describe('test xml mime type', function() {
  describe('request-option', function() {

    describe('assert', function() {
      var output = testGen(swagger, {
        assertionFormat: 'assert',
        pathName: [],
        testModule: 'request',
        loadTest: [{pathName: '/user', operation: 'get',
          load: {requests: 1000, concurrent: 100}},
          {pathName: '/user', operation: 'put',
            load: {requests: 1000, concurrent: 100}}]
      });

      var paths = [];
      var ndx;

      for (ndx in output) {
        if (output) {
          paths.push(join(__dirname, '/compare/request/assert/'
            + output[ndx].name));
        }
      }

      it('should be able to generate test for request that produces xml', function() {
        assert.isArray(output);
        assert.lengthOf(output, 2);

        var generatedCode;

        for (ndx in paths) {
          if (paths !== undefined) {
            generatedCode = read(paths[ndx], 'utf8').replace(/\r\n/g, '\n');
            assert.equal(output[ndx].test.replace(/\r\n/g, '\n'),
              generatedCode);
          }
        }

        for (ndx in output && output[ndx].name !== '.env') {
          if (output !== undefined) {
            assert.lengthOf(linter.verify(output[ndx].test, rules), 0);
          }
        }
      });
    });

    describe('expect', function() {
      var output = testGen(swagger, {
        assertionFormat: 'expect',
        pathName: [],
        testModule: 'request',
        loadTest: [{pathName: '/user', operation: 'get',
          load: {requests: 1000, concurrent: 100}}]
      });

      var paths = [];
      var ndx;

      for (ndx in output) {
        if (output) {
          paths.push(join(__dirname, '/compare/request/expect/' +
            output[ndx].name));
        }
      }

      it('should be able to generate test for request that produces xml', function() {
        assert.isArray(output);
        assert.lengthOf(output, 2);

        var generatedCode;

        for (ndx in paths) {
          if (paths !== undefined) {
            generatedCode = read(paths[ndx], 'utf8').replace(/\r\n/g, '\n');
            assert.equal(output[ndx].test.replace(/\r\n/g, '\n'),
              generatedCode);
          }
        }

        for (ndx in output) {
          if (output !== undefined && output[ndx].name !== '.env') {
            assert.lengthOf(linter.verify(output[ndx].test, rules), 0);
          }
        }

      });
    });

    describe('should', function() {
      var output = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'request',
        loadTest: [{pathName: '/user', operation: 'post',
          load: {requests: 1000, concurrent: 100}}]
      });

      var paths = [];
      var ndx;

      for (ndx in output) {
        if (output) {
          paths.push(join(__dirname, '/compare/request/should/'
            + output[ndx].name));
        }
      }

      it('should be able to generate test for request that produces xml', function() {
        assert.isArray(output);
        assert.lengthOf(output, 2);

        var generatedCode;

        for (ndx in paths) {
          if (paths !== undefined) {
            generatedCode = read(paths[ndx], 'utf8').replace(/\r\n/g, '\n');
            assert.equal(output[ndx].test.replace(/\r\n/g, '\n'),
              generatedCode);
          }
        }

        for (ndx in output && output[ndx].name !== '.env') {
          if (output !== undefined) {
            assert.lengthOf(linter.verify(output[ndx].test, rules), 0);
          }
        }
      });
    });
  });

  describe('supertest-option', function() {

    describe('assert', function() {
      var output = testGen(swagger, {
        assertionFormat: 'assert',
        pathName: [],
        testModule: 'supertest',
        loadTest: [{pathName: '/user', operation: 'get',
          load: {requests: 1000, concurrent: 100}},
          {pathName: '/user', operation: 'put',
            load: {requests: 1000, concurrent: 100}}]
      });

      var paths = [];
      var ndx;

      for (ndx in output) {
        if (output) {
          paths.push(join(__dirname, '/compare/supertest/assert/'
            + output[ndx].name));
        }
      }

      it('should be able to generate test for request that produces xml', function() {
        assert.isArray(output);
        assert.lengthOf(output, 2);

        var generatedCode;

        for (ndx in paths) {
          if (paths !== undefined) {
            generatedCode = read(paths[ndx], 'utf8').replace(/\r\n/g, '\n');
            assert.equal(output[ndx].test.replace(/\r\n/g, '\n'),
              generatedCode);
          }
        }

        for (ndx in output && output[ndx].name !== '.env') {
          if (output !== undefined) {
            assert.lengthOf(linter.verify(output[ndx].test, rules), 0);
          }
        }
      });
    });

    describe('expect', function() {
      var output = testGen(swagger, {
        assertionFormat: 'expect',
        pathName: [],
        testModule: 'supertest',
        loadTest: [{pathName: '/user', operation: 'get',
          load: {requests: 1000, concurrent: 100}}]
      });

      var paths = [];
      var ndx;

      for (ndx in output) {
        if (output) {
          paths.push(join(__dirname, '/compare/supertest/expect/'
            + output[ndx].name));
        }
      }

      it('should be able to generate test for request that produces xml', function() {
        assert.isArray(output);
        assert.lengthOf(output, 2);

        var generatedCode;

        for (ndx in paths) {
          if (paths !== undefined) {
            generatedCode = read(paths[ndx], 'utf8').replace(/\r\n/g, '\n');
            assert.equal(output[ndx].test.replace(/\r\n/g, '\n'),
              generatedCode);
          }
        }

        for (ndx in output && output[ndx].name !== '.env') {
          if (output !== undefined) {
            assert.lengthOf(linter.verify(output[ndx].test, rules), 0);
          }
        }
      });
    });

    describe('should', function() {
      var output = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'supertest',
        loadTest: [{pathName: '/user', operation: 'post',
          load: {requests: 1000, concurrent: 100}}]
      });

      var paths = [];
      var ndx;

      for (ndx in output) {
        if (output) {
          paths.push(join(__dirname, '/compare/supertest/should/'
            + output[ndx].name));
        }
      }

      it('should be able to generate test for request that produces xml', function() {
        assert.isArray(output);
        assert.lengthOf(output, 2);

        var generatedCode;

        for (ndx in paths) {
          if (paths !== undefined) {
            generatedCode = read(paths[ndx], 'utf8').replace(/\r\n/g, '\n');
            assert.equal(output[ndx].test.replace(/\r\n/g, '\n'),
              generatedCode);
          }
        }

        for (ndx in output && output[ndx].name !== '.env') {
          if (output !== undefined) {
            assert.lengthOf(linter.verify(output[ndx].test, rules), 0);
          }
        }
      });
    });
  });
});
