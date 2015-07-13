'use strict';
var chai = require('chai');

chai.should();
var request = require('request');

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'http://localhost:10010/',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(200);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('head', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'http://localhost:10010/',
        method: 'HEAD',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res) {
        if (error) return done(error);

        res.statusCode.should.equal(200);
        done();
      });
    });

  });

});
