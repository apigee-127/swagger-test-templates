'use strict';
/*'THIS IS A CUSTOM TEMPLATE'*/
var chai = require('chai');
var urljoin = require('url-join');

var request = require('request');

chai.should();

describe('/{id}', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: String(urljoin(process.env.swagger_host, '/{id PARAM GOES HERE}')),
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

  describe('head', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: String(urljoin(process.env.swagger_host, '/{id PARAM GOES HERE}')),
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
