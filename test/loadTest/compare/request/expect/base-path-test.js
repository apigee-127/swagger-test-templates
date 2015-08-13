'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');
var expect = chai.expect;

require('dotenv').load();

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "username": {
            "type": "string"
          }
        }
      };

      /*eslint-enable*/
      request({
        url: 'https://api.uber.com/',
        qs: {
          accessToken: process.env.KEY
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(validator.validate(body, schema)).to.be.true;
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "meta": "string",
          "data": "number"
        }
      };

      /*eslint-enable*/
      request({
        url: 'https://api.uber.com/',
        qs: {
          accessToken: process.env.KEY
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(400);

        expect(validator.validate(body, schema)).to.be.true;
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      /*eslint-disable*/
      var schema = {
        "properties": {
          "meta": "string",
          "data": "number",
          "UserObj": {
            "schema": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "integer"
                },
                "username": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      /*eslint-enable*/
      request({
        url: 'https://api.uber.com/',
        qs: {
          accessToken: process.env.KEY
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(500);

        expect(validator.validate(body, schema)).to.be.true;
        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer"
            },
            "username": {
              "type": "string"
            }
          }
        }
      };

      /*eslint-enable*/
      request({
        url: 'https://api.uber.com/',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-latitude': 'DATA GOES HERE',
          Authorization: 'Bearer ' + process.env.OAUTH
        },
        json: {
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(validator.validate(body, schema)).to.be.true;
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "number"
      };

      /*eslint-enable*/
      request({
        url: 'https://api.uber.com/',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-latitude': 'DATA GOES HERE',
          Authorization: 'Bearer ' + process.env.OAUTH
        },
        json: {
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(400);

        expect(validator.validate(body, schema)).to.be.true;
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "string"
      };

      /*eslint-enable*/
      request({
        url: 'https://api.uber.com/',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-latitude': 'DATA GOES HERE',
          Authorization: 'Bearer ' + process.env.OAUTH
        },
        json: {
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(500);

        expect(validator.validate(body, schema)).to.be.true;
        done();
      });
    });

  });

});
