'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var assert = chai.assert;
var supertest = require('supertest');
var api = supertest('https://api.instagram.com'); // supertest init;

describe('/users/self/requested-by', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "properties": {
          "meta": {
            "properties": {
              "code": {
                "type": "integer"
              }
            }
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/MiniProfile"
            }
          }
        }
      };
      /*eslint-enable*/

      api.get('/v1/users/self/requested-by')
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
