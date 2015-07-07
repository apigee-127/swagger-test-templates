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

describe('instagram', function() {
  describe('request', function() {
    describe('pathName-option with should', function() {

      var output1 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'request'
      });

      var paths1 = [];
      var ndx;

      for (ndx in output1) {
        if (output1[ndx] !== undefined) {
          paths1.push(join(__dirname, '/compare/output1/' + output1[ndx].name));
        }
      }

      it('should make all paths from empty pathName option', function() {
        assert.isArray(output1);
        assert.lengthOf(output1, 22);

        var generatedCode;

        for (ndx in paths1) {
          if (output1.hasOwnProperty(ndx)) {
            generatedCode = read(paths1[ndx], 'utf8');
            assert.equal(output1[ndx].test, generatedCode);
          }
        }

        var len;

        console.log('----- output1 -----');

        for (ndx in output1) {
          if (output1[ndx] !== undefined) {
            len = (linter.verify(output1[ndx].test, rules)).length;

            if (len > 0) {
              console.log(output1[ndx].name);
              console.log(len);
            }
            // assert.lengthOf(linter.verify(output1[ndx].test, rules), 0);
          }
        }
      });

      var output2 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: ['/users/self/feed',
          '/users/{user-id}',
          '/users/self/requested-by'],
        testModule: 'request'
      });

      var paths2 = [];

      for (ndx in output2) {
        if (output2[ndx] !== undefined) {
          paths2.push(join(__dirname, '/compare/output2/' + output2[ndx].name));
        }
      }

      it('should only make the 3 pathName specified in pathNames', function() {
        assert.isArray(output2);
        assert.lengthOf(output2, 3);

        var generatedCode;

        for (ndx in paths2) {
          if (output2.hasOwnProperty(ndx)) {
            generatedCode = read(paths2[ndx], 'utf8');
            assert.equal(output2[ndx].test, generatedCode);
          }
        }

        var len;

        console.log('----- output2 -----');

        for (ndx in output2) {
          if (output2[ndx] !== undefined) {
            len = (linter.verify(output2[ndx].test, rules)).length;

            if (len > 0) {
              console.log(output2[ndx].name);
              console.log(len);
            }
            // assert.lengthOf(linter.verify(output2[ndx].test, rules), 0);
          }
        }
      });
    });

    describe('assertions-option', function() {

      var output3 = testGen(swagger, {
        assertionFormat: 'expect',
        pathName: [],
        testModule: 'request'
      });

      var paths3 = [];
      var ndx;

      for (ndx in output3) {
        if (output3[ndx] !== undefined) {
          paths3.push(join(__dirname, '/compare/output3/' + output3[ndx].name));
        }
      }

      it('should make all paths with expect', function() {
        assert.isArray(output3);
        assert.lengthOf(output3, 22);

        var generatedCode;

        for (ndx in paths3) {
          if (output3.hasOwnProperty(ndx)) {
            generatedCode = read(paths3[ndx], 'utf8');
            assert.equal(output3[ndx].test, generatedCode);
          }
        }

        var len;

        console.log('----- output3 -----');

        for (ndx in output3) {
          if (output3[ndx] !== undefined) {
            len = (linter.verify(output3[ndx].test, rules)).length;

            if (len > 0) {
              console.log(output3[ndx].name);
              console.log(len);
            }
            // assert.lengthOf(linter.verify(output3[ndx].test, rules), 0);
          }
        }
      });

      var output4 = testGen(swagger, {
        assertionFormat: 'assert',
        pathName: [],
        testModule: 'request'
      });

      var paths4 = [];

      for (ndx in output4) {
        if (output4[ndx] !== undefined) {
          paths4.push(join(__dirname, '/compare/output4/' + output4[ndx].name));
        }
      }

      it('should make all paths with assert', function() {
        assert.isArray(output4);
        assert.lengthOf(output4, 22);

        var generatedCode;

        for (ndx in paths4) {
          if (output4.hasOwnProperty(ndx)) {
            generatedCode = read(paths4[ndx], 'utf8');
            assert.equal(output4[ndx].test, generatedCode);
          }
        }

        var len;

        console.log('----- output4 -----');

        for (ndx in output4) {
          if (output4[ndx] !== undefined) {
            len = (linter.verify(output4[ndx].test, rules)).length;

            if (len > 0) {
              console.log(output4[ndx].name);
              console.log(len);
            }
            // assert.lengthOf(linter.verify(output4[ndx].test, rules), 0);
          }
        }
      });
    });
  });

  describe('supertest', function() {
    describe('pathName-option with should', function() {

      var output5 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'supertest'
      });

      var paths5 = [];
      var ndx;

      for (ndx in output5) {
        if (output5[ndx] !== undefined) {
          paths5.push(join(__dirname, '/compare/output5/' + output5[ndx].name));
        }
      }

      it('should make all paths from empty pathName option', function() {
        assert.isArray(output5);
        assert.lengthOf(output5, 22);

        var generatedCode;

        for (ndx in paths5) {
          if (output5.hasOwnProperty(ndx)) {
            generatedCode = read(paths5[ndx], 'utf8');
            assert.equal(output5[ndx].test, generatedCode);
          }
        }

        var len;

        console.log('----- output5 -----');

        for (ndx in output5) {
          if (output5[ndx] !== undefined) {
            len = (linter.verify(output5[ndx].test, rules)).length;

            if (len > 0) {
              console.log(output5[ndx].name);
              console.log(len);
            }
            // assert.lengthOf(linter.verify(output5[ndx].test, rules), 0);
          }
        }
      });

      var output6 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: ['/users/self/feed',
          '/users/{user-id}',
          '/users/self/requested-by'],
        testModule: 'supertest'
      });

      var paths6 = [];

      for (ndx in output6) {
        if (output6[ndx] !== undefined) {
          paths6.push(join(__dirname, '/compare/output6/' + output6[ndx].name));
        }
      }

      it('should only make the 3 pathName specified in pathNames', function() {
        assert.isArray(output6);
        assert.lengthOf(output6, 3);

        var generatedCode;

        for (ndx in paths6) {
          if (output6.hasOwnProperty(ndx)) {
            generatedCode = read(paths6[ndx], 'utf8');
            assert.equal(output6[ndx].test, generatedCode);
          }
        }

        var len;

        console.log('----- output6 -----');

        for (ndx in output6) {
          if (output6[ndx] !== undefined) {
            len = (linter.verify(output6[ndx].test, rules)).length;

            if (len > 0) {
              console.log(output6[ndx].name);
              console.log(len);
            }
            // assert.lengthOf(linter.verify(output6[ndx].test, rules), 0);
          }
        }
      });
    });

    describe('assertions-option', function() {

      var output7 = testGen(swagger, {
        assertionFormat: 'expect',
        pathName: [],
        testModule: 'supertest'
      });

      var paths7 = [];
      var ndx;

      for (ndx in output7) {
        if (output7[ndx] !== undefined) {
          paths7.push(join(__dirname, '/compare/output7/' + output7[ndx].name));
        }
      }

      it('should make all paths with expect', function() {
        assert.isArray(output7);
        assert.lengthOf(output7, 22);

        var generatedCode;

        for (ndx in paths7) {
          if (output7.hasOwnProperty(ndx)) {
            generatedCode = read(paths7[ndx], 'utf8');
            assert.equal(output7[ndx].test, generatedCode);
          }
        }

        var len;

        console.log('----- output7 -----');

        for (ndx in output7) {
          if (output7[ndx] !== undefined) {
            len = (linter.verify(output7[ndx].test, rules)).length;

            if (len > 0) {
              console.log(output7[ndx].name);
              console.log(len);
            }
            // assert.lengthOf(linter.verify(output7[ndx].test, rules), 0);
          }
        }
      });

      var output8 = testGen(swagger, {
        assertionFormat: 'assert',
        pathName: [],
        testModule: 'supertest'
      });

      var paths8 = [];

      for (ndx in output8) {
        if (output8[ndx] !== undefined) {
          paths8.push(join(__dirname, '/compare/output8/' + output8[ndx].name));
        }
      }

      it('should make all paths with assert', function() {
        assert.isArray(output8);
        assert.lengthOf(output8, 22);

        var generatedCode;

        for (ndx in paths8) {
          if (output8.hasOwnProperty(ndx)) {
            generatedCode = read(paths8[ndx], 'utf8');
            assert.equal(output8[ndx].test, generatedCode);
          }
        }

        var len;

        console.log('----- output8 -----');

        for (ndx in output8) {
          if (output8[ndx] !== undefined) {
            len = (linter.verify(output8[ndx].test, rules)).length;

            if (len > 0) {
              console.log(output8[ndx].name);
              console.log(len);
            }
            // assert.lengthOf(linter.verify(output8[ndx].test, rules), 0);
          }
        }
      });
    });
  });
});
