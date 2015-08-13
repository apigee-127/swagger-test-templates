'use strict';
var chai = require('chai');
var request = require('request');
var expect = chai.expect;
var arete = require('arete');

require('dotenv').load();

describe('/user', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.OAUTH
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });
    it('load tests with 200 OK', function(done) {
      arete.loadTest({
        name: '_user_get_load_test',
        requests: 1000,
        concurrentRequests: 100,
        targetFunction: function(callback) {
          request({
            url: 'https://api.uber.com/user',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + process.env.OAUTH
            }
          },
          function(error, res, body) {
            callback(error, body);
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
      request({
        url: 'https://api.uber.com/user',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.OAUTH
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(400);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });
    it('load tests with 400 NOT OK', function(done) {
      arete.loadTest({
        name: '_user_get_load_test',
        requests: 1000,
        concurrentRequests: 100,
        targetFunction: function(callback) {
          request({
            url: 'https://api.uber.com/user',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + process.env.OAUTH
            }
          },
          function(error, res, body) {
            callback(error, body);
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
      request({
        url: 'https://api.uber.com/user',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.OAUTH
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(500);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });
    it('load tests with 500 SERVER ERROR', function(done) {
      arete.loadTest({
        name: '_user_get_load_test',
        requests: 1000,
        concurrentRequests: 100,
        targetFunction: function(callback) {
          request({
            url: 'https://api.uber.com/user',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + process.env.OAUTH
            }
          },
          function(error, res, body) {
            callback(error, body);
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
      request({
        url: 'https://api.uber.com/user',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + process.env.BASIC_AUTH
        },
        json: {
          latitude: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + process.env.BASIC_AUTH
        },
        json: {
          latitude: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(400);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      request({
        url: 'https://api.uber.com/user',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + process.env.BASIC_AUTH
        },
        json: {
          latitude: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(500);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('put', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.OAUTH
        },
        json: {
          latitude: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.OAUTH
        },
        json: {
          latitude: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(400);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      request({
        url: 'https://api.uber.com/user',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.OAUTH
        },
        json: {
          latitude: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(500);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('patch', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.OAUTH
        },
        json: {
          latitude: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('delete', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + process.env.BASIC_AUTH
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
