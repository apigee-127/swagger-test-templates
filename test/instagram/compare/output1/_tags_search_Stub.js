'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});

chai.should();
var request = require('request');

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

      request({
        url: 'https://api.instagram.com/v1/tags/search',
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      },
      function(error, response, body) {
        if (error) {
          done(error);
          return;
        }

        validator.validate(body, schema).should.be.true;

        done();
      });
    });

  });

});
