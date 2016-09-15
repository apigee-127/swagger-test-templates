'use strict';
var path = require('path');
var assert = require('chai').assert;
var ZSchema = require('z-schema');

require(path.join(process.cwd(), './custom-formats'))(ZSchema);
var validator = new ZSchema({});
var schema = require('./schema.json');

describe('When using swagger custom formats ', function() {
  var json = {
    id32: 123456789,
    id64: 2345762897,
    idDouble: 349857394857,
    float: 987987,
    dateRegister: '2011-10-10T14:48:00'
  };

  it('should validate the json against the schema', function() {
    assert.isTrue(validator.validate(json, schema));
  });

});
