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

##Commend Line Interface
Generate all tests for all paths, by default, it will use supertest module, expect assertion format, asynchronous function and generate all tests in one file
```shell
swagger project generate-test
```
You can specify the path you want to test, support regular expression
```shell
swagger project generate-test -p, --path-name [path]
```
You can specify the supporting testing module
```shell
swagger project generate-test -f, --testmodule <supertest/request>
```
You can specify the assertion format
```shell
swagger project generate-test -t, --assertion-format <expect/should/assert>
```
You can specify synchronous or asynchronous code testing
```shell
swagger project generate-test -s --asynchronous <true/false>
```
You can specify if you want to put all the test into one giant file or separate file for each path
```shell
swagger project generate-test -o --separate <true/false>
```

##License
[MIT](/LICENSE)