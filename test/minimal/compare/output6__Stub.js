'use strict';
var chai = require('chai');
var expect = chai.expect;
var request = require('request');

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'http://localhost:10010/',
        qs: {
        },
        method: 'GET',
        headers: {
          'Content-Type': '',
          'Custom-Header': {
        }}},
      function(error, response, body) {
        if (error) {
          done(error);
          return;
        }

        expect(body).to.have.property('name');
        done();
      });
    });

  });

});
