'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var assert = chai.assert;
var request = require('request');

describe('/media1/{shortcode}', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "#/definitions/Media"
      };
      /*eslint-enable*/

      request({
        url: 'https://api.instagram.com/v1/media1/{shortcode}',
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      },
      function(error, response, body) {
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