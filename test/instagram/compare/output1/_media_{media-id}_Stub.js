'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});

chai.should();
var request = require('request');

describe('/media/{media-id}', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "#/definitions/Media"
      };
      /*eslint-enable*/

      request({
        url: 'https://api.instagram.com/v1/media/{media-id}',
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
