'use strict';
var chai = require('chai');

chai.should();
var request = require('request');

describe('/user', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        method: 'GET',
        headers: {
          'Content-Type': 'application/xml'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(200);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        method: 'GET',
        headers: {
          'Content-Type': 'application/xml'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(400);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      request({
        url: 'https://api.uber.com/user',
        method: 'GET',
        headers: {
          'Content-Type': 'application/xml'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(500);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: 'XML STRING GOES HERE'
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(200);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: 'XML STRING GOES HERE'
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(400);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      request({
        url: 'https://api.uber.com/user',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: 'XML STRING GOES HERE'
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(500);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
