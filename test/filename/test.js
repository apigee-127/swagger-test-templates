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
var swagger1 = require('./swagger1.json');
var swagger2 = require('./swagger2.json');
var swagger3 = require('./swagger3.json');
var swagger4 = require('./swagger4.json');
var yaml = require('js-yaml');
var join = require('path').join;
var read = require('fs').readFileSync;
var testGen = require('../../index.js').testGen;
var rules;
var config;

rules = yaml.safeLoad(read(join(__dirname, '/../../.eslintrc'), 'utf8'));
rules.env = {mocha: true};

config = {
  assertionFormat: 'assert',
  pathName: [],
  testModule: 'supertest'
};

describe('Test if testGen return the proper name', function() {
  describe('Test swagger with config1', function() {

    it('should return the json with proper name for swagger1',
      function(done) {
        var result = testGen(swagger1, config);

        assert.equal(result[0].name, 'plan-test.js');
        assert.equal(result[1].name, 'plan-{plan_id}-users-test.js');
        assert.equal(result[2].name, 'user-test.js');
        done();
      });

    it('should return the json with proper name for swagger2',
      function(done) {
        var result = testGen(swagger2, config);

        assert.equal(result[0].name, 'base-path-test.js');
        done();
      });

    it('should return the json with proper name for swagger3',
      function(done) {
        var result = testGen(swagger3, config);

        assert.equal(result[0].name, 'base-path-test.js');
        assert.equal(result[1].name, 'user-test.js');
        done();
      });

    it('should return the json with proper name for swagger4',
      function(done) {
        var result = testGen(swagger4, config);

        assert.equal(result[0].name, 'users-{user-id}-test.js');
        assert.equal(result[1].name, 'users-$$$$$^^^^^^7&&&-feed-test.js');
        assert.equal(result[2].name,
          'users-{user-id}-media____-recent-test.js');
        assert.equal(result[3].name, 'users-{user-id}-follows-test.js');
        assert.equal(result[4].name, 'users-{user-id}-followed-by-test.js');
        done();
      });

  });
});

