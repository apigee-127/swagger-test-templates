'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('https://api.instagram.com'); // supertest init;

describe('/media/{media-id}', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "#/definitions/Media"
      };
      /*eslint-enable*/

      api.get('/v1/media/{media-id}')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        expect(validator.validate(res, schema)).to.be.true;

        done();
      });
    });

  });

});
