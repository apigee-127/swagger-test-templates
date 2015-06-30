'use strict';
var chai = require('chai');
var assert = chai.assert;
var request = require('request');

describe('/', function() {
  describe('get', function() {
    it('should be 200 OK', function(done) {
      request({
        url: 'http://localhost:10010/',
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      },
      function(error, response, body) {
        if (error) {
          console.log(error);
          done();
        }

        assert.property(body, 'name');
        done();
      });
    });

  });

});
