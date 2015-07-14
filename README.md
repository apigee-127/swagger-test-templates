#swagger-test-templates

[![Build Status](https://travis-ci.org/apigee-127/swagger-test-templates.svg?branch=master)](https://travis-ci.org/apigee-127/swagger-test-templates)

> Generate test code from a [Swagger](http://swagger.io) spec

##Usage

```javascript
var testGen = require('swagger-test-templates');
var swagger = require('/path/to/swagger.json');
var config = {
  assertionFormat: 'should',
  testModule:'supertest',
  pathNames:['/user', '/user/{id}']
};

// Generates an array of JavaScript test files following specified configuration
testGen(swagger, config);
```

##License
[MIT](/LICENSE)
