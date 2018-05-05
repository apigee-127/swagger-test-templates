'use strict';
var chai = require('chai');
var request = require('request');

chai.should();

describe('/{id}', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'http://basic.herokuapp.com/{id PARAM GOES HERE}',
        json: true,
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

  describe('put', function() {
    it('should respond with 202 OK, but not 200', function(done) {
      request({
        url: 'http://basic.herokuapp.com/{id PARAM GOES HERE}',
        json: true,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          body: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(202);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('delete', function() {
    it('should respond with 204 OK, but not 200', function(done) {
      request({
        url: 'http://basic.herokuapp.com/{id PARAM GOES HERE}',
        json: true,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(204);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
