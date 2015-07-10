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

'use strict';

var assert = require('chai').assert;
var testGen = require('../../index.js').testGen;
var swagger = require('./swagger.json');
var linter = require('eslint').linter;
var yaml = require('js-yaml');
var join = require('path').join;
var rules;
var read = require('fs').readFileSync;

rules = yaml.safeLoad(read(join(__dirname, '/../../.eslintrc'), 'utf8'));
rules.env = {mocha: true};

describe('minimal swagger', function() {
  describe('request-option', function() {
    describe('pathName-option', function() {

      var output1 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'request'
      });

      var paths1 = [];
      var ndx;

      for (ndx in output1) {
        if (output1 !== undefined) {
          paths1.push(join(__dirname, '/compare/output1' + output1[ndx].name));
        }
      }

      it('should create all paths w/empty pathName flag w/should', function() {
        assert.isArray(output1);
        assert.lengthOf(output1, 1);
        var generatedCode;

        for (ndx in paths1) {
          if (output1.hasOwnProperty(ndx)) {
            generatedCode = read(paths1[ndx], 'utf8');
            assert.equal(output1[ndx].test, generatedCode);
          }
        }


        for (ndx in output1) {
          if (output1 !== undefined) {
            assert.lengthOf(linter.verify(output1[ndx].test, rules), 0);
          }
        }
      });

      var output2 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: ['/'],
        testModule: 'request'
      });

      var paths2 = [];

      for (ndx in output2) {
        if (output2 !== undefined) {
          paths2.push(join(__dirname, '/compare/output2' + output2[ndx].name));
        }
      }


      it('should create specified paths from pathName flag w/should',
        function() {
        assert.isArray(output2);
        assert.lengthOf(output2, 1);

        var generatedCode;

        for (ndx in paths2) {
          if (paths2 !== undefined) {
            generatedCode = read(paths2[ndx], 'utf8');
            assert.equal(output2[ndx].test, generatedCode);
          }
        }

        for (ndx in output2) {
          if (output2 !== undefined) {
            assert.lengthOf(linter.verify(output2[ndx].test, rules), 0);
          }
        }
      });
    });

    describe('asertionFormat-option', function() {
      var output5 = testGen(swagger, {
        assertionFormat: 'assert',
        pathName: [],
        testModule: 'request'
      });

      var paths5 = [];
      var ndx;

      for (ndx in output5) {
        if (output5 !== undefined) {
          paths5.push(join(__dirname, '/compare/output5' + output5[ndx].name));
        }
      }

      it('should still generate all paths with assert', function() {
        assert.isArray(output5);
        assert.lengthOf(output5, 1);

        var generatedCode;

        for (ndx in paths5) {
          if (paths5 !== undefined) {
            generatedCode = read(paths5[ndx], 'utf8');
            assert.equal(output5[ndx].test, generatedCode);
          }
        }

        for (ndx in output5) {
          if (output5 !== undefined) {
            assert.lengthOf(linter.verify(output5[ndx].test, rules), 0);
          }
        }
      });

      var output6 = testGen(swagger, {
        assertionFormat: 'expect',
        pathName: [],
        testModule: 'request'
      });

      var paths6 = [];

      for (ndx in output6) {
        if (output6 !== undefined) {
          paths6.push(join(__dirname, '/compare/output6' + output6[ndx].name));
        }
      }

      it('should still generate all paths with except', function() {
        assert.isArray(output6);
        assert.lengthOf(output6, 1);

        var generatedCode;

        for (ndx in paths6) {
          if (paths6 !== undefined) {
            generatedCode = read(paths6[ndx], 'utf8');
            assert.equal(output6[ndx].test, generatedCode);
          }
        }

        for (ndx in output6) {
          if (output6 !== undefined) {
            assert.lengthOf(linter.verify(output6[ndx].test, rules), 0);
          }
        }
      });
    });

    describe('consumes', function() {
      swagger.consumes = ['application/xml'];

      var output18 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'request'
      });

      var paths18 = [];
      var ndx;

      for (ndx in output18) {
        if (paths18 !== undefined) {
          paths18.push(join(__dirname, '/compare/output18'
            + output18[ndx].name));
        }
      }

      it('should generate all paths with \'xml\' comsumes', function() {

        assert.isArray(output18);
        assert.lengthOf(output18, 1);

        var generatedCode;

        for (ndx in paths18) {
          if (paths18 !== undefined) {
            generatedCode = read(paths18[ndx], 'utf8');
            assert.equal(output18[ndx].test, generatedCode);
          }
        }

        for (ndx in output18) {
          if (output18 !== undefined) {
            assert.lengthOf(linter.verify(output18[ndx].test, rules), 0);
          }
        }
      });

      swagger.consumes.push('application/json');

      var output17 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'request'
      });

      var paths17 = [];

      for (ndx in output17) {
        if (output17[ndx] !== undefined) {
          paths17.push(join(__dirname, '/compare/output17'
            + output17[ndx].name));
        }
      }

      it('should generate paths with \'xml\' & \'json\' comsumes', function() {

        assert.isArray(output17);
        assert.lengthOf(output17, 1);

        var generatedCode;

        for (ndx in paths17) {
          if (paths17[ndx] !== undefined) {
            generatedCode = read(paths17[ndx], 'utf8');
            assert.equal(output17[ndx].test, generatedCode);
          }
        }

        for (ndx in output17) {
          if (output17 !== undefined) {
            assert.lengthOf(linter.verify(output17[ndx].test, rules), 0);
          }
        }
      });
    });

    describe('produces', function() {
      swagger.produces = ['application/xml'];

      var output16 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'request'
      });

      var paths16 = [];
      var ndx;

      for (ndx in output16) {
        if (output16[ndx] !== undefined) {
          paths16.push(join(__dirname, '/compare/output16'
            + output16[ndx].name));
        }
      }

      it('should generate paths w/all consumes and produces xml', function() {

        assert.isArray(output16);
        assert.lengthOf(output16, 1);

        var generatedCode;

        for (ndx in paths16) {
          if (paths16[ndx] !== undefined) {
            generatedCode = read(paths16[ndx], 'utf8');
            assert.equal(output16[ndx].test, generatedCode);
          }
        }

        for (ndx in output16) {
          if (output16 !== undefined) {
            assert.lengthOf(linter.verify(output16[ndx].test, rules), 0);
          }
        }
      });

      swagger.produces.push('application/json');

      var output15 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'request'
      });

      var paths15 = [];

      for (ndx in output15) {
        if (output15[ndx] !== undefined) {
          paths15.push(join(__dirname, '/compare/output15'
            + output15[ndx].name));
        }
      }

      it('should generate paths w/all consumes and all produces', function() {

        assert.isArray(output15);
        assert.lengthOf(output15, 1);

        var generatedCode;

        for (ndx in paths15) {
          if (paths15[ndx] !== undefined) {
            generatedCode = read(paths15[ndx], 'utf8');
            assert.equal(output15[ndx].test, generatedCode);
          }
        }

        for (ndx in output15) {
          if (output15 !== undefined) {
            assert.lengthOf(linter.verify(output15[ndx].test, rules), 0);
          }
        }
      });

      swagger.consumes = [];

      var output14 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'request'
      });

      var paths14 = [];

      for (ndx in output14) {
        if (output14[ndx] !== undefined) {
          paths14.push(join(__dirname, '/compare/output14'
            + output14[ndx].name));
        }
      }

      it('should generate paths w/default consumes & produces', function() {

        assert.isArray(output14);
        assert.lengthOf(output14, 1);

        var generatedCode;

        for (ndx in paths14) {
          if (paths14[ndx] !== undefined) {
            generatedCode = read(paths14[ndx], 'utf8');
            assert.equal(output14[ndx].test, generatedCode);
          }
        }

        for (ndx in output14) {
          if (output14 !== undefined) {
            assert.lengthOf(linter.verify(output14[ndx].test, rules), 0);
          }
        }
      });

      swagger.consumes = [];
      swagger.produces = [];
    });
  });

  describe('supertest-option', function() {
    describe('pathName-option', function() {

      var output3 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'supertest'
      });

      var paths3 = [];
      var ndx;

      for (ndx in output3) {
        if (output3) {
          paths3.push(join(__dirname, '/compare/output3' + output3[ndx].name));
        }
      }

      it('should create all paths w/empty pathName flag w/should', function() {

        assert.isArray(output3);
        assert.lengthOf(output3, 1);

        var generatedCode;

        for (ndx in paths3) {
          if (paths3 !== undefined) {
            generatedCode = read(paths3[ndx], 'utf8');
            assert.equal(output3[ndx].test, generatedCode);
          }
        }

        for (ndx in output3) {
          if (output3 !== undefined) {
            assert.lengthOf(linter.verify(output3[ndx].test, rules), 0);
          }
        }
      });

      var output4 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: ['/'],
        testModule: 'supertest'
      });

      var paths4 = [];

      for (ndx in output4) {
        if (output4 !== undefined) {
          paths4.push(join(__dirname, '/compare/output4' + output4[ndx].name));
        }
      }

      it('should create specified paths in pathName flag w/should', function() {

        assert.isArray(output4);
        assert.lengthOf(output4, 1);

        var generatedCode;

        for (ndx in paths4) {
          if (paths4 !== undefined) {
            generatedCode = read(paths4[ndx], 'utf8');
            assert.equal(output4[ndx].test, generatedCode);
          }
        }

        for (ndx in output4) {
          if (output4 !== undefined) {
            assert.lengthOf(linter.verify(output4[ndx].test, rules), 0);
          }
        }
      });
    });

    describe('assertionFormat-option', function() {
      var output7 = testGen(swagger, {
        assertionFormat: 'assert',
        pathName: [],
        testModule: 'supertest'
      });

      var paths7 = [];
      var ndx;

      for (ndx in output7) {
        if (output7 !== undefined) {
          paths7.push(join(__dirname, '/compare/output7' + output7[ndx].name));
        }
      }

      it('should still generate all paths with assert', function() {

        assert.isArray(output7);
        assert.lengthOf(output7, 1);

        var generatedCode;

        for (ndx in paths7) {
          if (paths7 !== undefined) {
            generatedCode = read(paths7[ndx], 'utf8');
            assert.equal(output7[ndx].test, generatedCode);
          }
        }

        for (ndx in output7) {
          if (output7 !== undefined) {
            assert.lengthOf(linter.verify(output7[ndx].test, rules), 0);
          }
        }
      });

      var output8 = testGen(swagger, {
        assertionFormat: 'expect',
        pathName: [],
        testModule: 'supertest'
      });

      var paths8 = [];

      for (ndx in output8) {
        if (paths8 !== undefined) {
          paths8.push(join(__dirname, '/compare/output8' + output8[ndx].name));
        }
      }

      it('should still generate all paths with expect', function() {

        assert.isArray(output8);
        assert.lengthOf(output8, 1);

        var generatedCode;

        for (ndx in paths8) {
          if (paths8 !== undefined) {
            generatedCode = read(paths8[ndx], 'utf8');
            assert.equal(output8[ndx].test, generatedCode);
          }
        }

        for (ndx in output8) {
          if (output8 !== undefined) {
            assert.lengthOf(linter.verify(output8[ndx].test, rules), 0);
          }
        }
      });
    });

    describe('consumes', function() {
      swagger.consumes = ['application/xml'];

      var output9 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'supertest'
      });

      var paths9 = [];
      var ndx;

      for (ndx in output9) {
        if (paths9 !== undefined) {
          paths9.push(join(__dirname, '/compare/output9' + output9[ndx].name));
        }
      }

      it('should generate all paths with \'xml\' comsumes', function() {

        assert.isArray(output9);
        assert.lengthOf(output9, 1);

        var generatedCode;

        for (ndx in paths9) {
          if (paths9 !== undefined) {
            generatedCode = read(paths9[ndx], 'utf8');
            assert.equal(output9[ndx].test, generatedCode);
          }
        }

        for (ndx in output9) {
          if (output9 !== undefined) {
            assert.lengthOf(linter.verify(output9[ndx].test, rules), 0);
          }
        }
      });

      swagger.consumes.push('application/json');

      var output10 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'supertest'
      });

      var paths10 = [];

      for (ndx in output10) {
        if (output10[ndx] !== undefined) {
          paths10.push(join(__dirname, '/compare/output10'
            + output10[ndx].name));
        }
      }

      it('should generate paths with \'xml\' & \'json\' comsumes', function() {

        assert.isArray(output10);
        assert.lengthOf(output10, 1);

        var generatedCode;

        for (ndx in paths10) {
          if (paths10[ndx] !== undefined) {
            generatedCode = read(paths10[ndx], 'utf8');
            assert.equal(output10[ndx].test, generatedCode);
          }
        }

        for (ndx in output10) {
          if (output10 !== undefined) {
            assert.lengthOf(linter.verify(output10[ndx].test, rules), 0);
          }
        }
      });
    });

    describe('produces', function() {
      swagger.produces = ['application/xml'];

      var output11 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'supertest'
      });

      var paths11 = [];
      var ndx;

      for (ndx in output11) {
        if (output11[ndx] !== undefined) {
          paths11.push(join(__dirname, '/compare/output11'
            + output11[ndx].name));
        }
      }

      it('should generate paths w/all consumes & produces xml', function() {

        assert.isArray(output11);
        assert.lengthOf(output11, 1);

        var generatedCode;

        for (ndx in paths11) {
          if (paths11[ndx] !== undefined) {
            generatedCode = read(paths11[ndx], 'utf8');
            assert.equal(output11[ndx].test, generatedCode);
          }
        }

        for (ndx in output11) {
          if (output11 !== undefined) {
            assert.lengthOf(linter.verify(output11[ndx].test, rules), 0);
          }
        }
      });

      swagger.produces.push('application/json');

      var output12 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'supertest'
      });

      var paths12 = [];

      for (ndx in output12) {
        if (output12[ndx] !== undefined) {
          paths12.push(join(__dirname, '/compare/output12'
            + output12[ndx].name));
        }
      }

      it('should generate paths w/all consumes and all produces', function() {

        assert.isArray(output12);
        assert.lengthOf(output12, 1);

        var generatedCode;

        for (ndx in paths12) {
          if (paths12[ndx] !== undefined) {
            generatedCode = read(paths12[ndx], 'utf8');
            assert.equal(output12[ndx].test, generatedCode);
          }
        }

        for (ndx in output12) {
          if (output12 !== undefined) {
            assert.lengthOf(linter.verify(output12[ndx].test, rules), 0);
          }
        }
      });

      swagger.consumes = [];

      var output13 = testGen(swagger, {
        assertionFormat: 'should',
        pathName: [],
        testModule: 'supertest'
      });

      var paths13 = [];

      for (ndx in output13) {
        if (output13[ndx] !== undefined) {
          paths13.push(join(__dirname, '/compare/output13'
            + output13[ndx].name));
        }
      }

      it('should generate paths w/default consumes & all produces', function() {

        assert.isArray(output13);
        assert.lengthOf(output13, 1);

        var generatedCode;

        for (ndx in paths13) {
          if (paths13[ndx] !== undefined) {
            generatedCode = read(paths13[ndx], 'utf8');
            assert.equal(output13[ndx].test, generatedCode);
          }
        }

        for (ndx in output13) {
          if (output13 !== undefined) {
            assert.lengthOf(linter.verify(output13[ndx].test, rules), 0);
          }
        }
      });
    });
  });
});
