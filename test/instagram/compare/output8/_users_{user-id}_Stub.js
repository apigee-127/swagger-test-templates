'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var assert = chai.assert;
var supertest = require('supertest');
var api = supertest('https://api.instagram.com'); // supertest init;

describe('/users/{user-id}', function() {
  describe('get', function() {
    it('should respond with 200 The user object', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "data": {
            "$ref": "#/definitions/User"
          }
        }
      };
      /*eslint-enable*/

      api.get('/v1/users/{user-id}')
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
