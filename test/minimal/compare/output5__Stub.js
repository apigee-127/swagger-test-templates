'use strict';
var chai = require('chai');
var assert = chai.assert;
var request = require('request');

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'http://localhost:10010/',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) {
          return done(error);
        }
        assert.isNull(body);
        done();
      });
    });

  });

});
