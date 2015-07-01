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

describe('minimal swagger', function() {
  describe('request-option', function() {
    describe('pathName-option', function() {

      var output1 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'request'
      });

      var paths1 = [];
      var ndx;

      for (ndx in output1) {
        if (output1 !== undefined) {
          paths1.push(join(__dirname, '/compare/output1' + output1[ndx].name));
        }
      }

      it('should create all paths w/empty pathName flag w/should', function() {
        assert.isArray(output1);
        assert.lengthOf(output1, 1);

        var generatedCode;

        for (ndx in paths1) {
          if (output1.hasOwnProperty(ndx)) {
            generatedCode = read(paths1[ndx], 'utf8');
            assert.equal(output1[ndx].test, generatedCode);
          }
        }

        for (ndx in output1) {
          if (output1 !== undefined) {
            assert.lengthOf(linter.verify(output1[ndx].test, rules), 0);
          }
        }
      });

      var output2 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: ['/'],
        testModule: 'request'
      });

      var paths2 = [];

      for (ndx in output2) {
        if (output2 !== undefined) {
          paths2.push(join(__dirname, '/compare/output2' + output2[ndx].name));
        }
      }

      it('should make specified paths from pathName flag w/should', function() {
        assert.isArray(output2);
        assert.lengthOf(output2, 1);

        var generatedCode;

        for (ndx in paths2) {
          if (paths2 !== undefined) {
            generatedCode = read(paths2[ndx], 'utf8');
            assert.equal(output2[ndx].test, generatedCode);
          }
        }

        for (ndx in output2) {
          if (output2 !== undefined) {
            assert.lengthOf(linter.verify(output2[ndx].test, rules), 0);
          }
        }
      });
    });

    describe('asertionFormat-option', function() {
      var output5 = testGen(swagger, {
        assertionFormat: 'assert',
        pathName: [],
        testModule: 'request'
      });

      var paths5 = [];
      var ndx;

      for (ndx in output5) {
        if (output5 !== undefined) {
          paths5.push(join(__dirname, '/compare/output5' + output5[ndx].name));
        }
      }

      it('should still generate all paths with assert', function() {
        assert.isArray(output5);
        assert.lengthOf(output5, 1);

        var generatedCode;

        for (ndx in paths5) {
          if (paths5 !== undefined) {
            generatedCode = read(paths5[ndx], 'utf8');
            assert.equal(output5[ndx].test, generatedCode);
          }
        }

        for (ndx in output5) {
          if (output5 !== undefined) {
            assert.lengthOf(linter.verify(output5[ndx].test, rules), 0);
          }
        }
      });

      var output6 = testGen(swagger, {
        assertionFormat: 'expect',
        pathName: [],
        testModule: 'request'
      });

      var paths6 = [];

      for (ndx in output6) {
        if (output6 !== undefined) {
          paths6.push(join(__dirname, '/compare/output6' + output6[ndx].name));
        }
      }

      it('should still generate all paths with except', function() {
        assert.isArray(output6);
        assert.lengthOf(output6, 1);

        var generatedCode;

        for (ndx in paths6) {
          if (paths6 !== undefined) {
            generatedCode = read(paths6[ndx], 'utf8');
            assert.equal(output6[ndx].test, generatedCode);
          }
        }

        for (ndx in output6) {
          if (output6 !== undefined) {
            assert.lengthOf(linter.verify(output6[ndx].test, rules), 0);
          }
        }
      });
    });
  });

  describe('supertest-option', function() {
    describe('pathName-option', function() {

      var output3 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'supertest'
      });

      var paths3 = [];
      var ndx;

      for (ndx in output3) {
        if (output3) {
          paths3.push(join(__dirname, '/compare/output3' + output3[ndx].name));
        }
      }

      it('should create all paths w/empty pathName flag w/should', function() {

        assert.isArray(output3);
        assert.lengthOf(output3, 1);

        var generatedCode;

        for (ndx in paths3) {
          if (paths3 !== undefined) {
            generatedCode = read(paths3[ndx], 'utf8');
            assert.equal(output3[ndx].test, generatedCode);
          }
        }

        for (ndx in output3) {
          if (output3 !== undefined) {
            assert.lengthOf(linter.verify(output3[ndx].test, rules), 0);
          }
        }
      });

      var output4 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: ['/'],
        testModule: 'supertest'
      });

      var paths4 = [];

      for (ndx in output4) {
        if (output4 !== undefined) {
          paths4.push(join(__dirname, '/compare/output4' + output4[ndx].name));
        }
      }

      it('should create specified paths in pathName flag w/should', function() {

        assert.isArray(output4);
        assert.lengthOf(output4, 1);

        var generatedCode;

        for (ndx in paths4) {
          if (paths4 !== undefined) {
            generatedCode = read(paths4[ndx], 'utf8');
            assert.equal(output4[ndx].test, generatedCode);
          }
        }

        for (ndx in output4) {
          if (output4 !== undefined) {
            assert.lengthOf(linter.verify(output4[ndx].test, rules), 0);
          }
        }
      });
    });

    describe('assertionFormat-option', function() {
      var output7 = testGen(swagger, {
        assertionFormat: 'assert',
        pathName: [],
        testModule: 'supertest'
      });

      var paths7 = [];
      var ndx;

      for (ndx in output7) {
        if (output7 !== undefined) {
          paths7.push(join(__dirname, '/compare/output7' + output7[ndx].name));
        }
      }

      it('should still generate all paths with assert', function() {

        assert.isArray(output7);
        assert.lengthOf(output7, 1);

        var generatedCode;

        for (ndx in paths7) {
          if (paths7 !== undefined) {
            generatedCode = read(paths7[ndx], 'utf8');
            assert.equal(output7[ndx].test, generatedCode);
          }
        }

        for (ndx in output7) {
          if (output7 !== undefined) {
            assert.lengthOf(linter.verify(output7[ndx].test, rules), 0);
          }
        }
      });

      var output8 = testGen(swagger, {
        assertionFormat: 'expect',
        pathName: [],
        testModule: 'supertest'
      });

      var paths8 = [];

      for (ndx in output8) {
        if (paths8 !== undefined) {
          paths8.push(join(__dirname, '/compare/output8' + output8[ndx].name));
        }
      }

      it('should still generate all paths with expect', function() {

        assert.isArray(output8);
        assert.lengthOf(output8, 1);

        var generatedCode;

        for (ndx in paths8) {
          if (paths8 !== undefined) {
            generatedCode = read(paths8[ndx], 'utf8');
            assert.equal(output8[ndx].test, generatedCode);
          }
        }

        for (ndx in output8) {
          if (output8 !== undefined) {
            assert.lengthOf(linter.verify(output8[ndx].test, rules), 0);
          }
        }
      });
    });
  });
});
