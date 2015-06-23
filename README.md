#swagger-test-templates

Generate test code from a Swagger spec

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

##License
[MIT](/LICENSE)