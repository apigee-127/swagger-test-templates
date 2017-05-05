'use strict';
var chai = require('chai');
var request = require('request');

chai.should();

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK, and this description is extra long for a simple length toggle test!', function(done) {
      request({
        url: 'http://basic.herokuapp.com/',
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

});
