'use strict';
var chai = require('chai');
var request = require('request');
var expect = chai.expect;

describe('/products', function() {
  describe('post', function() {
    it('should respond with 200 OK and some description', function(done) {
      request({
        url: 'https://api.uber.com/products',
        json: true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd:something+json'
        },
        body: {}
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });
  it('should respond with 200 OK and some description', function(done) {
      request({
        url: 'https://api.uber.com/products',
        json: true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd:something+json'
        },
        body: {"id":1,"name":"product"}
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
