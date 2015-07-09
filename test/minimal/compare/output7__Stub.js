'use strict';
var chai = require('chai');
var assert = chai.assert;
var supertest = require('supertest');
var api = supertest('http://localhost:10010'); // supertest init;

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      api.get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        assert.isNull(res);
        assert.property(res, 'name');
        done();
      });
    });
  });

});
