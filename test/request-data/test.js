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
var swaggerPost = require('./swagger-post.json');
var swaggerGet = require('./swagger-get.json');
var swaggerGet2 = require('./swagger-get2.json');
var swaggerGet2Optional = require('./swagger-get2-optional.json');
var swaggerGetWithHeaders = require('./swagger-get-with-headers.json');
var swaggerNonStandardContentType = require('./swagger-with-non-standard-content-type.json');
var yaml = require('js-yaml');
var join = require('path').join;
var rules;
var read = require('fs').readFileSync;

rules = yaml.safeLoad(read(join(__dirname, './.eslintrc'), 'utf8'));
rules.env = {mocha: true};

describe('request data population', function() {
  describe('with request body', function() {
    describe('with description', function() {
      describe('expect', function() {
        var output1 = testGen(swaggerPost, {
          assertionFormat: 'expect',
          pathName: [],
          testModule: 'request',
          maxLen: -1,
          requestData: {
            '/user': {
              post: {
                200: [
                  {body: {"my-id": 2}, description: 'some description'},
                  {body: {"my-id": 3}, description: 'some other description'}
                ]
              }
            }
          }
        });

        var paths1 = [];
        var ndx;

        for (ndx in output1) {
          if (output1) {
            paths1.push(join(__dirname, '/compare/request/expect/' + output1[ndx].name));
          }
        }

        it('should have a extended description and test data in the json request', function() {

          assert.isArray(output1);
          assert.lengthOf(output1, 1);

          var generatedCode;

          for (ndx in paths1) {
            if (paths1 !== undefined) {
              generatedCode = read(paths1[ndx], 'utf8').replace(/\r\n/g, '\n');
              assert.equal(output1[ndx].test.replace(/\r\n/g, '\n'), generatedCode);
            }
          }
        });
      });
    });

    describe('with non-standard content type', function() {
      describe('expect', function() {
        var output1 = testGen(swaggerNonStandardContentType, {
          assertionFormat: 'expect',
          pathName: [],
          testModule: 'request',
          maxLen: -1,
          requestData: {
            '/products': {
              post: {
                200: [
                  {
                    body: {},
                    description: 'some description'
                  },
                  {
                    body: {id: 1, name: 'product'},
                    description: 'some description'
                  }
                ]
              }
            },
            '/products/{id}': {
              get: {
                200: [
                  {
                    id: 2,
                    description: 'some description'
                  },
                  {
                    id: 3,
                    description: 'some other description'
                  }
                ]
              },
              put: {
                200: [
                  {
                    id: 2,
                    body: {},
                    description: 'some description'
                  },
                  {
                    id: 3,
                    body: {},
                    description: 'some other description'
                  }
                ]
              }
            }
          }
        });

        var paths1 = [];
        var ndx;

        for (ndx in output1) {
          if (output1) {
            paths1.push(join(__dirname, '/compare/request/expect/non-standard-c-type-' + output1[ndx].name));
          }
        }

        it('should populate request data', function() {
          assert.isArray(output1);
          assert.lengthOf(output1, 2);

          var generatedCode;

          for (ndx in paths1) {
            if (paths1 !== undefined) {
              generatedCode = read(paths1[ndx], 'utf8').replace(/\r\n/g, '\n');
              assert.equal(output1[ndx].test.replace(/\r\n/g, '\n'), generatedCode);
            }
          }
        });
      });
    });

    describe('and query string', function() {
      describe('expect', function() {
        var output2 = testGen(swaggerPost, {
          assertionFormat: 'expect',
          pathName: [],
          testModule: 'request',
          maxLen: -1,
          requestData: {
            '/user': {
              post: {
                200: [
                  {body: {"my-id": 2}, longitude: 10, description: 'some description'},
                  {body: {"my-id": 3}, longitude: 20, description: 'some other description'}
              ]
              }
            }
          }
        });

        var paths1 = [];
        var ndx;

        for (ndx in output2) {
          if (output2) {
            paths1.push(join(__dirname, '/compare/request/expect/qs1-' + output2[ndx].name));
          }
        }

        it('should populate query parameters in test description', function() {
          assert.isArray(output2);
          assert.lengthOf(output2, 1);

          var generatedCode;

          for (ndx in paths1) {
            if (paths1 !== undefined) {
              generatedCode = read(paths1[ndx], 'utf8').replace(/\r\n/g, '\n');
              assert.equal(output2[ndx].test.replace(/\r\n/g, '\n'), generatedCode);
            }
          }
        });
      });
    });
  });

  describe('with query string', function() {
    describe('expect', function() {
      var output3 = testGen(swaggerGet, {
        assertionFormat: 'expect',
        pathName: [],
        testModule: 'request',
        maxLen: -1,
        requestData: {
          '/user': {
            get: {
              200: [
                {longitude: 10, description: 'some description'},
                {longitude: 20, description: 'some other description'}
              ]
            }
          }
        }
      });

      var paths1 = [];
      var ndx;

      for (ndx in output3) {
        if (output3) {
          paths1.push(join(__dirname, '/compare/request/expect/qs2-' + output3[ndx].name));
        }
      }

      it('should populate query parameters in test description', function() {
        assert.isArray(output3);
        assert.lengthOf(output3, 1);

        var generatedCode;

        for (ndx in paths1) {
          if (paths1 !== undefined) {
            generatedCode = read(paths1[ndx], 'utf8').replace(/\r\n/g, '\n');
            assert.equal(output3[ndx].test.replace(/\r\n/g, '\n'), generatedCode);
          }
        }
      });
    });

    describe('with string parameter', function() {
      describe('expect', function() {
        var output4 = testGen(swaggerGet2, {
          assertionFormat: 'expect',
          pathName: [],
          testModule: 'request',
          maxLen: -1,
          requestData: {
            '/user': {
              get: {
                200: [
                  {name: 'Simon', description: 'some description'},
                  {name: 'Garfunkel', description: 'some other description'}
                ]
              }
            }
          }
        });

        var paths1 = [];
        var ndx;

        for (ndx in output4) {
          if (output4) {
            paths1.push(join(__dirname, '/compare/request/expect/qs3-' + output4[ndx].name));
          }
        }

        it('should populate query parameters in test description', function() {
          assert.isArray(output4);
          assert.lengthOf(output4, 1);

          var generatedCode;

          for (ndx in paths1) {
            if (paths1 !== undefined) {
              generatedCode = read(paths1[ndx], 'utf8').replace(/\r\n/g, '\n');
              assert.equal(output4[ndx].test.replace(/\r\n/g, '\n'), generatedCode);
            }
          }
        });
      });
    });

    describe('with optional parameter', function() {
      describe('expect', function() {
        var output5 = testGen(swaggerGet2Optional, {
          assertionFormat: 'expect',
          pathName: [],
          testModule: 'request',
          maxLen: -1,
          requestData: {
            '/user': {
              get: {
                200: [
                  {name: 'Miles', description: 'some description'},
                  {name: 'John', nickname: 'Trane', description: 'some other description'},
                  {name: 'Dave', description: 'yet another description'}
                ]
              }
            }
          }
        });

        var paths1 = [];
        var ndx;

        for (ndx in output5) {
          if (output5) {
            paths1.push(join(__dirname, '/compare/request/expect/qs4-' + output5[ndx].name));
          }
        }

        it('should populate query parameters in test description', function() {
          assert.isArray(output5);
          assert.lengthOf(output5, 1);

          var generatedCode;

          for (ndx in paths1) {
            if (paths1 !== undefined) {
              generatedCode = read(paths1[ndx], 'utf8').replace(/\r\n/g, '\n');
              assert.equal(output5[ndx].test.replace(/\r\n/g, '\n'), generatedCode);
            }
          }
        });
      });
    });
  });

  describe('with HTTP headers', function() {
    describe('expect', function() {
      var output1 = testGen(swaggerGetWithHeaders, {
        assertionFormat: 'expect',
        pathName: [],
        testModule: 'request',
        maxLen: -1,
        requestData: {
          '/user': {
            get: {
              200: [
                {'X-Token': 'sadfg', description: 'some description'},
                {'X-Token': 'qwerty', description: 'some other description'}
            ]
            }
          }
        }
      });

      var paths1 = [];
      var ndx;

      for (ndx in output1) {
        if (output1) {
          paths1.push(join(__dirname, '/compare/request/expect/with-headers-' + output1[ndx].name));
        }
      }

      it('should populate the token header value', function() {

        assert.isArray(output1);
        assert.lengthOf(output1, 1);

        var generatedCode;

        for (ndx in paths1) {
          if (paths1 !== undefined) {
            generatedCode = read(paths1[ndx], 'utf8').replace(/\r\n/g, '\n');
            assert.equal(output1[ndx].test.replace(/\r\n/g, '\n'), generatedCode);
          }
        }
      });
    });
  });

});
