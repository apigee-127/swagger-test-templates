#swagger-test-templates

[![Build Status](https://travis-ci.org/apigee-127/apigee-node-project-template.svg?branch=master)](https://travis-ci.org/apigee-127/apigee-node-project-template)

Generate test code from a Swagger spec

###Note: This project is under development and is not ready yet

##Usage

```javascript
var testGen = require('swagger-test-templates');
var swagger = require('/path/to/swagger.json');
var config = {
  destination: '/path/to/folder',
  assertionFormat: 'should'
};

// Generates test files following specified configuration
testGen(swagger, config);
```

##License
[MIT](/LICENSE)
