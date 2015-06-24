var handlebars = require('handlebars'),
	read = require('fs').readFileSync,
  swag = require('./test/minimal/swagger.json');

var getSource = read('./templates/supertest/get/getNoParam.handlebars','utf8'),
  genGET = handlebars.compile(getSource),
  config = {
    'assertionFormat':'expect'
  };

function testGenResponse(swagger, path, operation, response, config){
  var result = [];

  // if (swagger.paths[path][operation].hasOwnProperty('parameters'))
  //   console.log(swagger.paths[path][operation]['parameters']);

  var data = {
    'operation':operation,
    'path':path,
    'responseCode':response,
    'description':swagger.paths[path][operation]['responses'][response].description,
    'assertion':config.assertionFormat
  };
  
  if (operation == 'get')
    console.log("----------- "+operation+" ------------")
  else if (operation == 'post')
    console.log("----------- "+operation+" ------------")
  else if (operation == 'put')
    console.log("----------- "+operation+" ------------")
  else if (operation == 'delete')
    console.log("----------- "+operation+" ------------")

  // console.log(genGET(data));
  result.push(genGET(data));

  return result;
}

function testGenOperation(swagger, path, operation, config){
  var responses = swagger.paths[path][operation]['responses'],
    result = [];

  for (res in responses){
    result.concat(testGenResponse(swagger, 
      path, 
      operation, 
      res, 
      config));
  }

  return result;
}

function testGenPath(swagger, path, config){
  var operations = swagger.paths[path],
    result = [];

  for (op in operations){
    result.concat(testGenOperation(swagger, path, op, config));
  }

  return result
}

function testGen(swagger, config){
	var paths = swagger['paths'],
		output = [];

	//loops over all paths
	for (var path in paths){
    output.concat(testGenPath(swagger, path, config));
	}

  console.log(output);
  return output;
}

testGen(swag, config);