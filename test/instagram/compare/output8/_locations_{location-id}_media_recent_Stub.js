'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var assert = chai.assert;
var supertest = require('supertest');
var api = supertest('https://api.instagram.com'); // supertest init;

describe('/locations/{location-id}/media/recent', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/Media"
            }
          }
        }
      };
      /*eslint-enable*/

      api.get('/v1/locations/{location-id}/media/recent')
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

});
