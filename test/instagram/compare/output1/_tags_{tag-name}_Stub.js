'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});

chai.should();
var request = require('request');

describe('/tags/{tag-name}', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "#/definitions/Tag"
      };
      /*eslint-enable*/

      request({
        url: 'https://api.instagram.com/v1/tags/{tag-name}',
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
