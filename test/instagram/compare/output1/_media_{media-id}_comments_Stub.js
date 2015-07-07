'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});

chai.should();
var request = require('request');

describe('/media/{media-id}/comments', function() {
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
              "$ref": "#/definitions/Comment"
            }
          }
        }
      };
      /*eslint-enable*/

      request({
        url: 'https://api.instagram.com/v1/media/{media-id}/comments',
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
        url: 'https://api.instagram.com/v1/media/{media-id}/comments',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        json: {
          TEXT: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
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
