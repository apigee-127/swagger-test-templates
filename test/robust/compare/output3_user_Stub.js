'use strict';
var chai = require('chai');

chai.should();
var supertest = require('supertest');
var api = supertest('https://api.uber.com'); // supertest init;

describe('/user', function() {
  describe('get', function() {
    it('should be 200 OK', function(done) {
      api.get('/test/user')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }

        res.should.have.property('name');
        done();
      });
    });

    it('should be 400 NOT OK', function(done) {
      api.get('/test/user')
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) {
          done(err);
        }

        res.should.have.property('name');
        done();
      });
    });

    it('should be 500 SERVER ERROR', function(done) {
      api.get('/test/user')
      .set('Accept', 'application/json')
      .expect(500)
      .end(function(err, res) {
        if (err) {
          done(err);
        }

        res.should.have.property('name');
        done();
      });
    });

  });

  describe('post', function() {
    it('should be 200 OK', function(done) {
      api.post('/test/user')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }

          res.should.have.property('name');
        done();
      });
    });

    it('should be 400 NOT OK', function(done) {
      api.post('/test/user')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(400)
      .end(function(err, res) {
        if (err) {
          done(err);
        }

          res.should.have.property('name');
        done();
      });
    });

    it('should be 500 SERVER ERROR', function(done) {
      api.post('/test/user')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(500)
      .end(function(err, res) {
        if (err) {
          done(err);
        }

          res.should.have.property('name');
        done();
      });
    });

  });

});
