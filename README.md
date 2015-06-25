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

//generates test files following specified configuration
testGen(swagger, config);
```

##Commend Line Template Generating
To generate the tests for your API, if pathname is not provided it generates for all.
--assertion-format=should is also optional, options are should | expect | assert
```shell
swagger project generate-test {pahtname|*} --assertion-format=should
```

##License
[MIT](/LICENSE)
