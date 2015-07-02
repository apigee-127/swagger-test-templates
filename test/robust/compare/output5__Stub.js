'use strict';
var chai = require('chai');
var assert = chai.assert;
var request = require('request');

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/test/',
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

        assert.property(body, 'name');
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      request({
        url: 'https://api.uber.com/test/',
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

        assert.property(body, 'name');
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      request({
        url: 'https://api.uber.com/test/',
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

        assert.property(body, 'name');
        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/test/',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': '',
          'Custom-Header': {
        }}},
      function(error, res, body) {
        if (error) {
          done(error);
          return;
        }

        assert.property(body, 'name');
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      request({
        url: 'https://api.uber.com/test/',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': '',
          'Custom-Header': {
        }}},
      function(error, res, body) {
        if (error) {
          done(error);
          return;
        }

        assert.property(body, 'name');
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      request({
        url: 'https://api.uber.com/test/',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': '',
          'Custom-Header': {
        }}},
      function(error, res, body) {
        if (error) {
          done(error);
          return;
        }

        assert.property(body, 'name');
        done();
      });
    });

  });

});
