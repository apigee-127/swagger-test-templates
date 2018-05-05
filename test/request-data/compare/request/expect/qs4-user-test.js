'use strict';
var chai = require('chai');
var request = require('request');
var expect = chai.expect;

describe('/user', function() {
  describe('get', function() {
    it('should respond with 200 OK and some description', function(done) {
      request({
        url: 'https://api.uber.com/user',
        json: true,
        qs: {
          name: 'Miles'
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });
  it('should respond with 200 OK and some other description', function(done) {
      request({
        url: 'https://api.uber.com/user',
        json: true,
        qs: {
          name: 'John',nickname: 'Trane'
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });
  it('should respond with 200 OK and yet another description', function(done) {
      request({
        url: 'https://api.uber.com/user',
        json: true,
        qs: {
          name: 'Dave'
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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
        json: true,
        qs: {
          name: 'DATA GOES HERE',nickname: 'DATA GOES HERE'
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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
        json: true,
        qs: {
          name: 'DATA GOES HERE',nickname: 'DATA GOES HERE'
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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
