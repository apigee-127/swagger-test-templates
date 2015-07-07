'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var expect = chai.expect;
var request = require('request');

describe('/media/{media-id}/likes', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "properties": {
          "meta": {
            "properties": {
              "code": {
                "type": "number"
              }
            }
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/Like"
            }
          }
        }
      };
      /*eslint-enable*/

      request({
        url: 'https://api.instagram.com/v1/media/{media-id}/likes',
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

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "meta": {
            "properties": {
              "code": {
                "type": "number"
              }
            }
          },
          "data": {
            "type": "object"
          }
        }
      };
      /*eslint-enable*/

      request({
        url: 'https://api.instagram.com/v1/media/{media-id}/likes',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        json: {
        }
      },
      function(error, res, body) {
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
