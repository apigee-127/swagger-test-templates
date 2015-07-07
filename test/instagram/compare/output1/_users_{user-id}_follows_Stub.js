'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});

chai.should();
var request = require('request');

describe('/users/{user-id}/follows', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/MiniProfile"
            }
          }
        }
      };
      /*eslint-enable*/

      request({
        url: 'https://api.instagram.com/v1/users/{user-id}/follows',
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
