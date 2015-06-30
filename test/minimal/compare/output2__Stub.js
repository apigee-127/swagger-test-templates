'use strict';
var chai = require('chai');

chai.should();
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
          done(error);
          return;
        }

        body.should.have.property('name');
        done();
      });
    });

  });

});
