var handlebars = require('handlebars'),
	read = require('fs').readFileSync,
  swag = require('./test/minimal/swagger.json');

var config = {
    'assertionFormat':'expect'
  };

function testGenResponse(swagger, path, operation, response, config){
  var result, gen, source,
    // request payload
    data = {
      'path':path,
      'responseCode':response,
      'description':swagger.paths[path][operation]['responses'][response].description,
      'assertion':config.assertionFormat
    };

  // adding body parameters to payload
  if (swagger.paths[path][operation].hasOwnProperty('parameters')){
    data.parameters = [];

    // only adds body parameters to request
    for (var param in swagger.paths[path][operation]['parameters'])
      if (swagger.paths[path][operation]['parameters'][param].in == 'body')
        data.parameters.push(swagger.paths[path][operation]['parameters'][param]);
  }
  
  // template source decision logic
  if (operation == 'get'){
    if (!data.hasOwnProperty('parameters') || data.parameters.length == 0){
      source = read('./templates/supertest/get/get.handlebars','utf8');
    }    
  }
  else if (operation == 'post'){
    source = read('./templates/supertest/post/post.handlebars', 'utf8');
  }
  else if (operation == 'put')
    console.log("----------- "+operation+" ------------")
  else if (operation == 'delete')
    console.log("----------- "+operation+" ------------")

  // compile template source and return test string
  gen = handlebars.compile(source);
  result = gen(data);

  return result;
}

function testGenOperation(swagger, path, operation, config){
  var responses = swagger.paths[path][operation]['responses'],
    result = [];

  for (res in responses){
    result.push(testGenResponse(swagger, 
      path, 
      operation, 
      res, 
      config));
  }

  var output = "describe('"+operation+"', function(){\n";
  for (test in result)
    output+=result[test]

  output+="});\n"

  return output;
}

function testGenPath(swagger, path, config){
  var operations = swagger.paths[path],
    result = [];

  for (op in operations){
    result.push(testGenOperation(swagger, path, op, config));
  }

  var output = "describe('"+path+"', function(){\n";
  for (test in result)
    output+=result[test]

  output+="});\n";

  return output;
}

function testGen(swagger, config){
	var paths = swagger['paths'],
		result = [];

	//loops over all paths
	for (var path in paths){
    result.push(testGenPath(swagger, path, config));
	}

  var output = "describe('"+swagger.info.title+"', function(){\n";
  for (test in result)
    output+=result[test]

  output+="});\n";

  return output;
}

testGen(swag, config);