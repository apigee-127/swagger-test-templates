'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var expect = chai.expect;
var request = require('request');

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

      request({
        url: 'https://api.instagram.com/v1/media/search',
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
