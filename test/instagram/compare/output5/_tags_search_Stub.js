'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});

chai.should();
var supertest = require('supertest');
var api = supertest('https://api.instagram.com'); // supertest init;

describe('/tags/search', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
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
              "$ref": "#/definitions/Tag"
            }
          }
        }
      };
      /*eslint-enable*/

      api.get('/v1/tags/search')
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
