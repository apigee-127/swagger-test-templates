'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var assert = chai.assert;
var supertest = require('supertest');
var api = supertest('https://api.instagram.com'); // supertest init;

describe('/media/{media-id}/likes', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "properties": {
          "meta": {
            "properties": {
              "code": {
                "type": "number"
              }
            }
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/Like"
            }
          }
        }
      };
      /*eslint-enable*/

      api.get('/v1/media/{media-id}/likes')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        assert.true(validator.validate(res, schema));
        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "meta": {
            "properties": {
              "code": {
                "type": "number"
              }
            }
          },
          "data": {
            "type": "object"
          }
        }
      };
      /*eslint-enable*/

      api.post('/v1/media/{media-id}/likes')
      .set('Accept', 'application/json')
      .send({
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        assert.true(validator.validate(res, schema));
        done();
      });
    });

  });

});
