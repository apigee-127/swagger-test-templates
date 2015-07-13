'use strict';
var chai = require('chai');
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:10010'); // supertest init;

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      api.get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body).to.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('head', function() {
    it('should respond with 200 OK', function(done) {
      api.head('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
    });

  });

});
