'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});

chai.should();
var supertest = require('supertest');
var api = supertest('https://api.instagram.com'); // supertest init;

describe('/users/{user-id}/media/recent', function() {
  describe('get', function() {
    it('should respond with 200 Get the most recent media published by a user. To get the most recent
media published by the owner of the access token, you can use `self`
instead of the `user-id`.
', function(done) {
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

      api.get('/v1/users/{user-id}/media/recent')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        validator.validate(res, schema).should.be.true;

        done();
      });
    });

  });

});
