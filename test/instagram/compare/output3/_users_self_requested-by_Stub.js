'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var expect = chai.expect;
var request = require('request');

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

      request({
        url: 'https://api.instagram.com/v1/users/self/requested-by',
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      },
      function(error, response, body) {
        if (error) {
          done(error);
          return;
        }

        expect(validator.validate(body, schema)).to.be.true;

        done();
      });
    });

  });

});
