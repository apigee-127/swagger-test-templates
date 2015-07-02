'use strict';
var chai = require('chai');

chai.should();
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
      function(error, res, body) {
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
