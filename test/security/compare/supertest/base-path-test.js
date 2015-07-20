'use strict';
var chai = require('chai');
var supertest = require('supertest');
var api = supertest('http://basic.herokuapp.com'); // supertest init;

chai.should();

require('dotenv').load();

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 Will send `Authenticated...', function(done) {
      api.get('/')
      .set('Authorization', 'Basic ' + process.env.BASIC_AUTH)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
