'use strict';
var chai = require('chai');
var supertest = require('supertest');
var api = supertest('https://api.uber.com'); // supertest init;
var expect = chai.expect;
var arete = require('arete');

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

        expect(res.body).to.equal(null); // non-json response or no schema
        done();
      });
    });
    it('load tests with 200 OK', function(done) {
      arete.loadTest({
        name: '_user_get_load_test',
        requests: 1000,
        concurrentRequests: 100,
        targetFunction: function(callback) {
          api.get('/user')
          .set('Authorization', 'Bearer ' + process.env.OAUTH)
          .set('Content-Type', 'application/json')
          .expect(200)
          .end(function(err, res) {
            callback(err, res);
          });
        },
        printResponses: false, // true or false
        printReport: true, // true or false
        printSteps: true, // true or false
        callback: function(error, report) {
          if (error) return done(error);

          expect(report.successfulResponses.length).
          to.equal(report.results.length);
          expect(report.averageResponseTimeInternal).
          to.be.lessThan('TIME DATA HERE');
          expect(report.timeElapsed).
          to.be.lessThan('TIME DATA HERE');
          done();
        }
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      api.get('/user')
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body).to.equal(null); // non-json response or no schema
        done();
      });
    });
    it('load tests with 400 NOT OK', function(done) {
      arete.loadTest({
        name: '_user_get_load_test',
        requests: 1000,
        concurrentRequests: 100,
        targetFunction: function(callback) {
          api.get('/user')
          .set('Authorization', 'Bearer ' + process.env.OAUTH)
          .set('Content-Type', 'application/json')
          .expect(400)
          .end(function(err, res) {
            callback(err, res);
          });
        },
        printResponses: false, // true or false
        printReport: true, // true or false
        printSteps: true, // true or false
        callback: function(error, report) {
          if (error) return done(error);

          expect(report.successfulResponses.length).
          to.equal(report.results.length);
          expect(report.averageResponseTimeInternal).
          to.be.lessThan('TIME DATA HERE');
          expect(report.timeElapsed).
          to.be.lessThan('TIME DATA HERE');
          done();
        }
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      api.get('/user')
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body).to.equal(null); // non-json response or no schema
        done();
      });
    });
    it('load tests with 500 SERVER ERROR', function(done) {
      arete.loadTest({
        name: '_user_get_load_test',
        requests: 1000,
        concurrentRequests: 100,
        targetFunction: function(callback) {
          api.get('/user')
          .set('Authorization', 'Bearer ' + process.env.OAUTH)
          .set('Content-Type', 'application/json')
          .expect(500)
          .end(function(err, res) {
            callback(err, res);
          });
        },
        printResponses: false, // true or false
        printReport: true, // true or false
        printSteps: true, // true or false
        callback: function(error, report) {
          if (error) return done(error);

          expect(report.successfulResponses.length).
          to.equal(report.results.length);
          expect(report.averageResponseTimeInternal).
          to.be.lessThan('TIME DATA HERE');
          expect(report.timeElapsed).
          to.be.lessThan('TIME DATA HERE');
          done();
        }
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

        expect(res.body).to.equal(null); // non-json response or no schema
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

        expect(res.body).to.equal(null); // non-json response or no schema
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

        expect(res.body).to.equal(null); // non-json response or no schema
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

        expect(res.body).to.equal(null); // non-json response or no schema
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

        expect(res.body).to.equal(null); // non-json response or no schema
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

        expect(res.body).to.equal(null); // non-json response or no schema
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

        expect(res.body).to.equal(null); // non-json response or no schema
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

        expect(res.body).to.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
