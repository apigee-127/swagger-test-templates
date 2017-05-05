'use strict';

var assert = require('chai').assert;
var testGen = require('../../index.js').testGen;
var swaggerNoType = require('./swagger-no-type.json');
var swaggerNonJson = require('./swagger-non-json.json');
var yaml = require('js-yaml');
var join = require('path').join;
var rules;
var read = require('fs').readFileSync;

rules = yaml.safeLoad(read(join(__dirname, '/../../.eslintrc'), 'utf8'));
rules.env = {mocha: true};

describe('json property', function() {
  describe('when no consumes or produces are set', function() {
    describe('expect', function() {
      var output1 = testGen(swaggerNoType, {
        assertionFormat: 'expect',
        pathName: [],
        testModule: 'request',
        maxLen: -1
      });

      var paths1 = [];
      var ndx;

      for (ndx in output1) {
        if (output1) {
          paths1.push(join(__dirname, '/compare/request/expect/no-property-' + output1[ndx].name));
        }
      }

      it('should have json property', function() {

        assert.isArray(output1);
        assert.lengthOf(output1, 1);

        var generatedCode;

        for (ndx in paths1) {
          if (paths1 !== undefined) {
            generatedCode = read(paths1[ndx], 'utf8').replace(/\r\n/g, '\n');
            assert.equal(output1[ndx].test.replace(/\r\n/g, '\n'), generatedCode);
          }
        }
      });
    });
  });

  describe('when set to non-json media type', function() {
    describe('expect', function() {
      var output1 = testGen(swaggerNonJson, {
        assertionFormat: 'expect',
        pathName: [],
        testModule: 'request',
        maxLen: -1
      });

      var paths1 = [];
      var ndx;

      for (ndx in output1) {
        if (output1) {
          paths1.push(join(__dirname, '/compare/request/expect/non-json-' + output1[ndx].name));
        }
      }

      it('should have no json property', function() {

        assert.isArray(output1);
        assert.lengthOf(output1, 1);

        var generatedCode;

        for (ndx in paths1) {
          if (paths1 !== undefined) {
            generatedCode = read(paths1[ndx], 'utf8').replace(/\r\n/g, '\n');
            assert.equal(output1[ndx].test.replace(/\r\n/g, '\n'), generatedCode);
          }
        }
      });
    });
  });
});
