'use strict';
var chai = require('chai');
var expect = chai.expect;
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

        expect(body).to.have.property('name');
        done();
      });
    });

  });

});
