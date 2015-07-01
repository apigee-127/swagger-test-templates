'use strict';
var chai = require('chai');
var assert = chai.assert;
var request = require('request');

describe('/user', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {

      request({
        url: 'https://api.uber.com/test/user',
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

    it('should respond with 400 NOT OK', function(done) {

      request({
        url: 'https://api.uber.com/test/user',
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

    it('should respond with 500 SERVER ERROR', function(done) {

      request({
        url: 'https://api.uber.com/test/user',
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

  describe('post', function() {
    it('should respond with 200 OK', function(done) {

      request({
        url: 'https://api.uber.com/test/user',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        json: {
          latitude: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) {
          done(error);
          return;
        }

        assert.isNull(body);
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {

      request({
        url: 'https://api.uber.com/test/user',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        json: {
          latitude: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) {
          done(error);
          return;
        }

        assert.isNull(body);
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {

      request({
        url: 'https://api.uber.com/test/user',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        json: {
          latitude: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
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
