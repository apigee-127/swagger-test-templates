'use strict';
var chai = require('chai');
var request = require('request');
var assert = chai.assert;

require('dotenv').load();

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/',
        json: true,
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

        assert.equal(res.statusCode, 200);

        assert.equal(body.length, Number(res.header['content-length']));
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      request({
        url: 'https://api.uber.com/',
        json: true,
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

        assert.equal(res.statusCode, 400);

        assert.equal(body.length, Number(res.header['content-length']));
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      request({
        url: 'https://api.uber.com/',
        json: true,
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

        assert.equal(res.statusCode, 500);

        assert.equal(body.length, Number(res.header['content-length']));
        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/',
        json: true,
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-latitude': 'DATA GOES HERE',
          Authorization: 'Bearer ' + process.env.OAUTH
        },
        body: {
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        assert.equal(res.statusCode, 200);

        assert.equal(body.length, Number(res.header['content-length']));
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      request({
        url: 'https://api.uber.com/',
        json: true,
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-latitude': 'DATA GOES HERE',
          Authorization: 'Bearer ' + process.env.OAUTH
        },
        body: {
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        assert.equal(res.statusCode, 400);

        assert.equal(body.length, Number(res.header['content-length']));
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      request({
        url: 'https://api.uber.com/',
        json: true,
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-latitude': 'DATA GOES HERE',
          Authorization: 'Bearer ' + process.env.OAUTH
        },
        body: {
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        assert.equal(res.statusCode, 500);

        assert.equal(body.length, Number(res.header['content-length']));
        done();
      });
    });

  });

});
