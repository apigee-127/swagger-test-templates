#swagger-test-templates

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
Choose assertion type for your test
```shell
swagger testgen --type <type>
```

Generate all the testing stub for your api
```shell
swagger testgen --all
```
##License
[MIT](/LICENSE)