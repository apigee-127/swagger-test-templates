'use strict';
var chai = require('chai');

chai.should();
var supertest = require('supertest');
var api = supertest('https://api.uber.com'); // supertest init;

describe('/user', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      api.get('/user')
      .set('Accept', 'application/xml')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });
    it('should respond with 200 OK', function(done) {
      api.get('/user')
      .set('Accept', 'application/xml')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });
    it('should respond with 200 OK', function(done) {
      api.get('/user')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });
    it('should respond with 200 OK', function(done) {
      api.get('/user')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });
    it('should respond with 400 NOT OK', function(done) {
      api.get('/user')
      .set('Accept', 'application/xml')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });
    it('should respond with 400 NOT OK', function(done) {
      api.get('/user')
      .set('Accept', 'application/xml')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });
    it('should respond with 400 NOT OK', function(done) {
      api.get('/user')
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });
    it('should respond with 400 NOT OK', function(done) {
      api.get('/user')
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });
    it('should respond with 500 SERVER ERROR', function(done) {
      api.get('/user')
      .set('Accept', 'application/xml')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });
    it('should respond with 500 SERVER ERROR', function(done) {
      api.get('/user')
      .set('Accept', 'application/xml')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });
    it('should respond with 500 SERVER ERROR', function(done) {
      api.get('/user')
      .set('Accept', 'application/json')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });
    it('should respond with 500 SERVER ERROR', function(done) {
      api.get('/user')
      .set('Accept', 'application/json')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });
  });

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      api.post('/user?longitude=DATA')
      .set('Accept', 'application/xml')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 200 OK', function(done) {
      api.post('/user?longitude=DATA')
      .set('Accept', 'application/xml')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 200 OK', function(done) {
      api.post('/user?longitude=DATA')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 200 OK', function(done) {
      api.post('/user?longitude=DATA')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      api.post('/user?longitude=DATA')
      .set('Accept', 'application/xml')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      api.post('/user?longitude=DATA')
      .set('Accept', 'application/xml')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      api.post('/user?longitude=DATA')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      api.post('/user?longitude=DATA')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      api.post('/user?longitude=DATA')
      .set('Accept', 'application/xml')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      api.post('/user?longitude=DATA')
      .set('Accept', 'application/xml')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      api.post('/user?longitude=DATA')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      api.post('/user?longitude=DATA')
      .set('Accept', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
