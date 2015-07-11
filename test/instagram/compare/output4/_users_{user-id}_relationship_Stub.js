'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var assert = chai.assert;
var request = require('request');

describe('/users/{user-id}/relationship', function() {
  describe('post', function() {
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
        url: 'https://api.instagram.com/v1/users/{user-id}/relationship',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        json: {
          action: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) {
          done(error);
          return;
        }

        assert.true(validator.validate(body, schema));
        done();
      });
    });

  });

});
