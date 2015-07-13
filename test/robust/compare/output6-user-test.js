'use strict';
var chai = require('chai');
var expect = chai.expect;
var request = require('request');

describe('/user', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
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
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
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
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
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

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'https://api.uber.com/user',
        qs: {
          longitude: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
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
