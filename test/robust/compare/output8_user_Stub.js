'use strict';
var chai = require('chai');
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('https://api.uber.com'); // supertest init;

describe('/user', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      api.get('/test/user')
      .set('Accept', '')
      .set({
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }
        expect(res).to.have.property('name');
        done();
      });
    });
    it('should respond with 400 NOT OK', function(done) {
      api.get('/test/user')
      .set('Accept', '')
      .set({
      })
      .expect(400)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }
        expect(res).to.have.property('name');
        done();
      });
    });
    it('should respond with 500 SERVER ERROR', function(done) {
      api.get('/test/user')
      .set('Accept', '')
      .set({
      })
      .expect(500)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }
        expect(res).to.have.property('name');
        done();
      });
    });
  });

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      api.post('/test/user?longitude=DATA')
      .set('Accept', '')
      .set({
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        expect(res).to.have.property('name');
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      api.post('/test/user?longitude=DATA')
      .set('Accept', '')
      .set({
      })
      .expect(400)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        expect(res).to.have.property('name');
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      api.post('/test/user?longitude=DATA')
      .set('Accept', '')
      .set({
      })
      .expect(500)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        expect(res).to.have.property('name');
        done();
      });
    });

  });

});
