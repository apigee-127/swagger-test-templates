'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var assert = chai.assert;
var supertest = require('supertest');
var api = supertest('https://api.uber.com'); // supertest init;

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
      api.get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        assert.true(validator.validate(res.body, schema));
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
      api.get('/')
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        assert.true(validator.validate(res.body, schema));
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
      api.get('/')
      .set('Accept', 'application/json')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        assert.true(validator.validate(res.body, schema));
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
      api.post('/?longitude=DATA')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        assert.true(validator.validate(res.body, schema));
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "number"
      };
      /*eslint-enable*/
      api.post('/?longitude=DATA')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        assert.true(validator.validate(res.body, schema));
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "string"
      };
      /*eslint-enable*/
      api.post('/?longitude=DATA')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        assert.true(validator.validate(res.body, schema));
        done();
      });
    });

  });

});
