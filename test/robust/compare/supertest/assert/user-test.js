'use strict';
var chai = require('chai');
var supertest = require('supertest');
var api = supertest('https://api.uber.com'); // supertest init;
var assert = chai.assert;

require('dotenv').load();

describe('/user', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      api.get('/user')
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        assert.isNull(res.body); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      api.get('/user')
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        assert.isNull(res.body); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      api.get('/user')
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        assert.isNull(res.body); // non-json response or no schema
        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      api.post('/user')
      .query({
        longitude: 'DATA GOES HERE'
      })
      .set('Authorization', 'Basic ' + process.env.BASIC_AUTH)
      .set('Content-Type', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        assert.isNull(res.body); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      api.post('/user')
      .query({
        longitude: 'DATA GOES HERE'
      })
      .set('Authorization', 'Basic ' + process.env.BASIC_AUTH)
      .set('Content-Type', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        assert.isNull(res.body); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      api.post('/user')
      .query({
        longitude: 'DATA GOES HERE'
      })
      .set('Authorization', 'Basic ' + process.env.BASIC_AUTH)
      .set('Content-Type', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        assert.isNull(res.body); // non-json response or no schema
        done();
      });
    });

  });

  describe('put', function() {
    it('should respond with 200 OK', function(done) {
      api.put('/user')
      .query({
        longitude: 'DATA GOES HERE'
      })
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        assert.isNull(res.body); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      api.put('/user')
      .query({
        longitude: 'DATA GOES HERE'
      })
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        assert.isNull(res.body); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      api.put('/user')
      .query({
        longitude: 'DATA GOES HERE'
      })
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        assert.isNull(res.body); // non-json response or no schema
        done();
      });
    });

  });

  describe('patch', function() {
    it('should respond with 200 OK', function(done) {
      api.patch('/user')
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        assert.isNull(res.body); // non-json response or no schema
        done();
      });
    });

  });

  describe('delete', function() {
    it('should respond with 200 OK', function(done) {
      api.del('/user')
      .set('Authorization', 'Basic ' + process.env.BASIC_AUTH)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        assert.isNull(res.body); // non-json response or no schema
        done();
      });
    });

  });

});
