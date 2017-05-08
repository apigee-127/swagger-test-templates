'use strict';
var chai = require('chai');
var request = require('request');
var expect = chai.expect;

describe('/user', function() {
  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: 'XML STRING GOES HERE'
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: 'XML STRING GOES HERE'
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(400);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      request({
        url: 'https://api.uber.com/user',
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: 'XML STRING GOES HERE'
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(500);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
