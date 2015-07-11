'use strict';
var chai = require('chai');
var assert = chai.assert;
var request = require('request');

describe('/geographies/{geo-id}/media/recent', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {

      request({
        url: 'https://api.instagram.com/v1/geographies/{geo-id}/media/recent',
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      },
      function(error, response, body) {
        if (error) {
          done(error);
          return;
        }

        assert.isNull(body);
        done();
      });
    });

  });

});