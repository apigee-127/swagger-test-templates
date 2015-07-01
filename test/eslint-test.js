'use strict';

var lint = require('mocha-eslint');

describe('Lint source', function() {
  lint(['index.js', 'mocha.js']);
});

describe('Lint test', function() {
  lint(['test/**/*.js']);
});
