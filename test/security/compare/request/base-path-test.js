'use strict';
var chai = require('chai');
var request = require('request');

chai.should();

require('dotenv').load();

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 Will send `Authenticated...', function(done) {
      request({
        url: 'http://basic.herokuapp.com/',
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + process.env.BASIC_AUTH
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
