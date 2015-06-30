#swagger-test-templates

[![Build Status](https://travis-ci.org/apigee-127/apigee-node-project-template.svg?branch=master)](https://travis-ci.org/apigee-127/apigee-node-project-template)

> Generate test code from a [Swagger](http://swagger.io) spec

###Note: This project is under development and is not ready yet

##Usage

```javascript
var testGen = require('swagger-test-templates');
var swagger = require('/path/to/swagger.json');
var config = {
  assertionFormat: 'should',
  testmodule:'supertest',
  pathNames:['/user', '/user/{id}']
};

// Generates an array of JavaScript test files following specified configuration
testGen(swagger, config);
```

##License
[MIT](/LICENSE)
