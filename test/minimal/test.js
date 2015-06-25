var assert = require('chai').assert;
var testGen = require('../../index.js').testGen;
var swagger = require('./swagger.json');

describe('minimal swagger', function(){
	describe('request-option', function(){
		describe('pathNames-option', function(){
			it ('should still generate all paths from empty pathNames option', function(done){
        var output = testGen(swagger, {
          'assertionFormat':'should',
          'pathNames':[],
          'testmodule':'request'
        });

        assert.isArray(output);
        assert.lengthOf(output, 2);
        done();
      });

      it ('should generate specified paths from pathNames option', function(done){
        var output = testGen(swagger, {
          'assertionFormat':'should',
          'pathNames':['/'],
          'testmodule':'request'
        });

        assert.isArray(output);
        assert.lengthOf(output, 1);
        done();
      });
		});
	});

	describe('supertest-option', function(){
		describe('pathNames-option', function(){
      it ('should still generate all paths from empty pathNames option', function(done){
        var output = testGen(swagger, {
          'assertionFormat':'should',
          'pathNames':[],
          'testmodule':'supertest'
        });

        assert.isArray(output);
        assert.lengthOf(output, 2);
        done();
      });

      it ('should generate specified paths from pathNames option', function(done){
        var output = testGen(swagger, {
          'assertionFormat':'should',
          'pathNames':['/'],
          'testmodule':'supertest'
        });

        assert.isArray(output);
        assert.lengthOf(output, 1);
        done();
      });
		});
	});
});