'use strict';
var chai = require('chai');
var supertest = require('supertest');
var api = supertest('https://api.uber.com'); // supertest init;
var expect = chai.expect;

require('dotenv').load();

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      api.get('/')
      .query({
        accessToken: process.env.KEY
      })
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body.length).to.equal(Number(res.header['content-length']));
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      api.get('/')
      .query({
        accessToken: process.env.KEY
      })
      .set('Content-Type', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body.length).to.equal(Number(res.header['content-length']));
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      api.get('/')
      .query({
        accessToken: process.env.KEY
      })
      .set('Content-Type', 'application/json')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body.length).to.equal(Number(res.header['content-length']));
        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      api.post('/')
      .query({
        longitude: 'DATA GOES HERE'
      })
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .set({
        'X-latitude': 'DATA GOES HERE'
      })
      .send({
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body.length).to.equal(Number(res.header['content-length']));
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      api.post('/')
      .query({
        longitude: 'DATA GOES HERE'
      })
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .set({
        'X-latitude': 'DATA GOES HERE'
      })
      .send({
      })
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body.length).to.equal(Number(res.header['content-length']));
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      api.post('/')
      .query({
        longitude: 'DATA GOES HERE'
      })
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .set({
        'X-latitude': 'DATA GOES HERE'
      })
      .send({
      })
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body.length).to.equal(Number(res.header['content-length']));
        done();
      });
    });

  });

});
