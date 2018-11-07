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


/**
 * This files tests is the user can set the template location
 */
'use strict';

var assert = require('chai').assert;
var testGen = require('../../index.js').testGen;
var swagger = require('./swagger.json');
var yaml = require('js-yaml');
var join = require('path').join;
var rules;

var fs = require('fs');

rules = yaml.safeLoad(fs.readFileSync(join(__dirname, '../../.eslintrc'), 'utf8'));
rules.env = {mocha: true};

// Turn off truncation
describe('Toggle description truncation', function() {
  var output = testGen(swagger, {
    assertionFormat: 'should',
    pathNames: [],
    testModule: 'request',
    statusCodes: [200],
    maxLen: -1

  });

  it('should not truncate the description', function() {

    var paths1 = [];
    var ndx;

    for (ndx in output) {
      if (output) {
        paths1.push(join(__dirname, '/compare/request/toggle-' + output[ndx].name));
      }
    }

    assert.isArray(output);
    assert.lengthOf(output, 1);

    var generatedCode;

    for (ndx in paths1) {
      if (paths1 !== undefined) {
        generatedCode = fs.readFileSync(paths1[ndx], 'utf8');
        assert.equal(output[ndx].test, generatedCode);
      }
    }
  });
});

// Default truncation
describe('Default truncation', function() {
  var output = testGen(swagger, {
    assertionFormat: 'should',
    pathNames: [],
    testModule: 'request',
    statusCodes: [200]
  });

  it('should truncate the description at the default size', function() {

    var paths1 = [];
    var ndx;

    for (ndx in output) {
      if (output) {
        paths1.push(join(__dirname, '/compare/request/default-' + output[ndx].name));
      }
    }

    assert.isArray(output);
    assert.lengthOf(output, 1);

    var generatedCode;

    for (ndx in paths1) {
      if (paths1 !== undefined) {
        generatedCode = fs.readFileSync(paths1[ndx], 'utf8');
        assert.equal(output[ndx].test, generatedCode);
      }
    }
  });
});

// Explicit truncation
describe('Description truncate at 20', function() {
  var output = testGen(swagger, {
    assertionFormat: 'should',
    pathNames: [],
    testModule: 'request',
    statusCodes: [200],
    maxLen: 20

  });

  it('should truncate the description at 20 characters', function() {

    var paths1 = [];
    var ndx;

    for (ndx in output) {
      if (output) {
        paths1.push(join(__dirname, '/compare/request/t20-' + output[ndx].name));
      }
    }

    assert.isArray(output);
    assert.lengthOf(output, 1);

    var generatedCode;

    for (ndx in paths1) {
      if (paths1 !== undefined) {
        generatedCode = fs.readFileSync(paths1[ndx], 'utf8');
        assert.equal(output[ndx].test, generatedCode);
      }
    }
  });
});
