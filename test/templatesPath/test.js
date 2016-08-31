/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Apigee Corporation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/**
 * This files tests is the user can set the template location
 */
'use strict';

var assert = require('chai').assert;
var testGen = require('../../index.js').testGen;
var swagger = require('./swagger.json');
var yaml = require('js-yaml');
var join = require('path').join;
var rules;

var fs = require('fs');
var ncp = require('ncp').ncp;

rules = yaml.safeLoad(fs.readFileSync(join(__dirname,
  '/../../.eslintrc'), 'utf8'));
rules.env = {mocha: true};

/**
 copy all templates to the user directory,
 write stuff in the file
 run the genTest, if templates are found, with the string,
 the custom template is loaded
 */
var customTemplatesPath = join(__dirname, 'userTemplateDirectory');

// copy
ncp(join(process.cwd(), 'templates'),
  join(__dirname, 'userTemplateDirectory'), function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('templates copied');
    fs.appendFile(join(customTemplatesPath, 'outerDescribe.handlebars'),
      'THIS IS A CUSTOM TEMPLATE', function(appendErr) {
      return console.log(appendErr);
    });
  });

describe('UserDefined template location', function() {
  var output = testGen(swagger, {
    assertionFormat: 'should',
    pathName: [],
    testModule: 'supertest',
    pathParams: {
      id: 'userSuppliedID'
    },
    templatesPath: customTemplatesPath
  });

  it('should load the modified template from the custom location, ' +
    'and find the custom string', function() {
    assert.isArray(output);
    assert.include(output[0].test, 'THIS IS A CUSTOM TEMPLATE');
  });
});
