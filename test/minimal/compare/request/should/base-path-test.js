'use strict';
/*'THIS IS A CUSTOM TEMPLATE'*/
var chai = require('chai');
var urljoin = require('url-join');

var request = require('request');

chai.should();

require('dotenv').load();

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: String(urljoin(process.env.swagger_host, '/')),
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

        res.statusCode.should.equal(200);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('head', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: String(urljoin(process.env.swagger_host, '/')),
        method: 'HEAD',
        headers: {
          'Content-Type': 'application/json',
          accessToken: process.env.KEY_2
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
