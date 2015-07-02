'use strict';
var chai = require('chai');
var assert = chai.assert;
var supertest = require('supertest');
var api = supertest('https://api.uber.com'); // supertest init;

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      api.get('/test/')
      .set('Accept', 'application/json')
      .set({
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }
        assert.property(res, 'name');
        done();
      });
    });
    it('should respond with 400 NOT OK', function(done) {
      api.get('/test/')
      .set('Accept', 'application/json')
      .set({
      })
      .expect(400)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }
        assert.property(res, 'name');
        done();
      });
    });
    it('should respond with 500 SERVER ERROR', function(done) {
      api.get('/test/')
      .set('Accept', 'application/json')
      .set({
      })
      .expect(500)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }
        assert.property(res, 'name');
        done();
      });
    });
  });

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      api.post('/test/?longitude=DATA')
      .set('Accept', 'application/json')
      .set({
      })
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        assert.property(res, 'name');
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      api.post('/test/?longitude=DATA')
      .set('Accept', 'application/json')
      .set({
      })
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(400)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        assert.property(res, 'name');
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      api.post('/test/?longitude=DATA')
      .set('Accept', 'application/json')
      .set({
      })
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(500)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        assert.property(res, 'name');
        done();
      });
    });

  });

});
