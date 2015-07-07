'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var assert = chai.assert;
var supertest = require('supertest');
var api = supertest('https://api.instagram.com'); // supertest init;

describe('/media/search', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "description": "List of all media with added `distance` property",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "allOf": [
                {
                  "$ref": "#/definitions/Media"
                },
                {
                  "properties": {
                    "distance": {
                      "type": "number"
                    }
                  }
                }
              ]
            }
          }
        }
      };
      /*eslint-enable*/

      api.get('/v1/media/search')
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
