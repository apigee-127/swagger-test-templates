'use strict';
var chai = require('chai');
var supertest = require('supertest');
var api = supertest('http://localhost:10010'); // supertest init;

chai.should();

require('dotenv').load();

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      api.get('/')
      .query({
        accessToken: process.env.KEY
      })
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('head', function() {
    it('should respond with 200 OK', function(done) {
      api.head('/')
      .set('Content-Type', 'application/json')
      .set('accessToken', process.env.KEY_2)
      .expect(200)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
    });

  });

});
