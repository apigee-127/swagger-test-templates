'use strict';
var chai = require('chai');
var assert = chai.assert;
var supertest = require('supertest');
var api = supertest('https://api.uber.com'); // supertest init;

describe('/', function() {
  describe('get', function() {
    it('should be 200 OK', function(done) {
      api.get('/test/')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        chai.assert.property(res, 'name');
        done();
      });
    });

    it('should be 400 NOT OK', function(done) {
      api.get('/test/')
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        chai.assert.property(res, 'name');
        done();
      });
    });

    it('should be 500 SERVER ERROR', function(done) {
      api.get('/test/')
      .set('Accept', 'application/json')
      .expect(500)
      .end(function(err, res) {
        chai.assert.property(res, 'name');
        done();
      });
    });

  });

  describe('post', function() {
    it('should be 200 OK', function(done) {
      api.post('/test/')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(200)
      .end(function(err, res) {
          chai.assert.property(res, 'name');
        done();
      });
    });

    it('should be 400 NOT OK', function(done) {
      api.post('/test/')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(400)
      .end(function(err, res) {
          chai.assert.property(res, 'name');
        done();
      });
    });

    it('should be 500 SERVER ERROR', function(done) {
      api.post('/test/')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(500)
      .end(function(err, res) {
          chai.assert.property(res, 'name');
        done();
      });
    });

  });

});
