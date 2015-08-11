# Swagger Test Templates

[![Build Status](https://travis-ci.org/apigee-127/swagger-test-templates.svg?branch=master)](https://travis-ci.org/apigee-127/swagger-test-templates)

> Generate test code from a [Swagger](http://swagger.io) spec

## Usage

Install via npm

```
npm install --save swagger-test-templates
```

Use your [Swagger](http://swagger.io) API spec file to generate test for your API.

```javascript
var testGen = require('swagger-test-templates');
var swagger = require('/path/to/swagger.json');
var config = {
  assertionFormat: 'should',
  testModule: 'supertest',
  pathNames: ['/user', '/user/{id}']
};

// Generates an array of JavaScript test files following specified configuration
testGen(swagger, config);
```

## API

`swagger-test-templates` module exports a function with following arguments and return values:

#### Arguments
* **`assertionFormat`** *optional*: One of `should`, `expect` or `assert`. Choose which assertion method should be used in output test code. Defaults to `should`.
* **`testModule`** *optional*: One of `supertest` or `request`. Choose between direct API calls (`request`) vs. programatic access to your API (`supertest`). Defaults to `supertest`.
* **`pathNames`** *optional*: List of path names available in your Swagger API spec used to generate tests for. Defaults to **all paths**.

#### Return value
An array in which each string is content of a test file and the file name. Use this information to write those files to disk.

##License
[MIT](/LICENSE)
