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

var rewire = require('rewire');
var myModule = rewire('../../index.js');
var expect = require('chai').expect;
var swagger = require('./swagger1.json');
var yaml = require('js-yaml');
var join = require('path').join;
var read = require('fs').readFileSync;
var rules;
var getData;
var config1;
var config2;
var info;

rules = yaml.safeLoad(read(join(__dirname, '/../../.eslintrc'), 'utf8'));
rules.env = {mocha: true};
/*eslint-disable */
getData = myModule.__get__('getData');
/*eslint-enable */
config1 = {
  assertionFormat: 'assert',
  pathName: [],
  testModule: 'supertest'
};
config2 = {
  assertionFormat: 'expect',
  pathName: [],
  testModule: 'request'
};
info = {
  importValidator: false,
  importEnv: false,
  consumes: [],
  produces: [],
  security: []
};

describe('Test getData function', function() {
  describe('Test swagger with config1', function() {

    it('should get all the data parsed for the /plan',
      function() {
      var data = getData(swagger, '/plan', 'post', '200', config1, info);

      expect(data).to.have.property('bodyParameters');
      expect(data.bodyParameters).to.have.length(1);
      expect(data).to.have.property('queryParameters');
      expect(data.queryParameters).to.have.length(1);
      expect(data).to.have.property('path');
      expect(data.path).to.equal('/plan');
    });

    it('should get all the data parsed for the /plan/{plan_id}/users',
      function() {
      var data = getData(swagger,
        '/plan/{plan_id}/users', 'get', '200', config1, info);

      expect(data).to.have.property('pathParameters');
      expect(data.pathParameters).to.have.length(1);
      expect(data).to.have.property('path');
      expect(data.path).to.equal('/plan/{plan_id}/users');
    });

    it('should get all the data parsed for the /user post',
      function() {
      var data = getData(swagger, '/user', 'post', '200', config1, info);

      expect(data).to.have.property('bodyParameters');
      expect(data.bodyParameters).to.have.length(1);
      expect(data).to.have.property('queryParameters');
      expect(data.queryParameters).to.have.length(2);
      expect(data).to.have.property('path');
      expect(data.path).to.equal('/user');
    });
  });

  describe('Test swagger with config2', function() {

    it('should get all the data parsed for the /plan',
      function() {
      var data = getData(swagger, '/plan', 'post', '200', config2, info);

      expect(data).to.have.property('bodyParameters');
      expect(data.bodyParameters).to.have.length(1);
      expect(data).to.have.property('queryParameters');
      expect(data.queryParameters).to.have.length(1);
      expect(data).to.have.property('path');
      expect(data.path).to.equal('http://localhost:10010/plan');
    });

    it('should get all the data parsed for the /plan/{plan_id}/users',
      function() {
      var data = getData(swagger,
        '/plan/{plan_id}/users', 'get', '200', config2, info);

      expect(data).to.have.property('pathParameters');
      expect(data.pathParameters).to.have.length(1);
      expect(data).to.have.property('path');
      expect(data.path).to.equal('http://localhost:10010/plan/{plan_id}/users');
    });

    it('should get all the data parsed for the /user post',
      function() {
      var data = getData(swagger, '/user', 'post', '200', config2, info);

      expect(data).to.have.property('bodyParameters');
      expect(data.bodyParameters).to.have.length(1);
      expect(data).to.have.property('queryParameters');
      expect(data.queryParameters).to.have.length(2);
      expect(data).to.have.property('path');
      expect(data.path).to.equal('http://localhost:10010/user');
    });
  });
});
