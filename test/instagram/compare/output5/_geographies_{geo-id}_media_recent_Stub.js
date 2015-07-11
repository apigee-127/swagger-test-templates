'use strict';
var chai = require('chai');

chai.should();
var supertest = require('supertest');
var api = supertest('https://api.instagram.com'); // supertest init;

describe('/geographies/{geo-id}/media/recent', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {

      api.get('/v1/geographies/{geo-id}/media/recent')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        res.should.equal(null);
        done();
      });
    });

  });

});