'use strict';
var chai = require('chai');
var request = require('request');

chai.should();

require('dotenv').load();

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/',
        qs: {
          accessToken: process.env.KEY
        },
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

    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/',
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

        res.statusCode.should.equal(200);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      request({
        url: 'https://api.uber.com/',
        qs: {
          accessToken: process.env.KEY
        },
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

    it('should respond with 400 NOT OK', function(done) {
      request({
        url: 'https://api.uber.com/',
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

        res.statusCode.should.equal(400);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      request({
        url: 'https://api.uber.com/',
        qs: {
          accessToken: process.env.KEY
        },
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

    it('should respond with 500 SERVER ERROR', function(done) {
      request({
        url: 'https://api.uber.com/',
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

        res.statusCode.should.equal(500);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/',
        qs: {

          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
          Authorization: 'Bearer ' + process.env.OAUTH
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

    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/',
        qs: {

          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.OAUTH
        },
        json: {
          latitude: 'DATA GOES HERE'
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
        url: 'https://api.uber.com/',
        qs: {

          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
          Authorization: 'Bearer ' + process.env.OAUTH
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

    it('should respond with 400 NOT OK', function(done) {
      request({
        url: 'https://api.uber.com/',
        qs: {

          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.OAUTH
        },
        json: {
          latitude: 'DATA GOES HERE'
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
        url: 'https://api.uber.com/',
        qs: {

          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
          Authorization: 'Bearer ' + process.env.OAUTH
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

    it('should respond with 500 SERVER ERROR', function(done) {
      request({
        url: 'https://api.uber.com/',
        qs: {

          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.OAUTH
        },
        json: {
          latitude: 'DATA GOES HERE'
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

});
