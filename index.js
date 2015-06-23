var handlebars = require('handlebars'),
	fs = require('fs'),
  swag = require('./test/minimal/swagger.json');

var getSource = "it('{{description}}', function(done){\n"+
  "  api.{{operation}}('{{path}}')\n"+
  "  .set('Accept', 'application/json')\n"+
  "  .expect({{responseCode}})\n"+
  "  .end(function(err, res){\n"+
  "    {{assertion}};\n"+
  "    done();\n"+
  "  })\n"+
"});\n",
  output = [],
  data,
  config = {
    'assertionFormat':'expect'
  };


function testGen(swagger, config){
  var genGET= handlebars.compile(getSource)

	var title = swagger.info.title,
		paths = swagger.paths,
		path, op, response, parameters;

	//loops over all paths
	for (path in paths){
		if (paths.hasOwnProperty(path)){

      //loops over all operations defined in a path
			for (op in paths[path]){

				if (paths[path].hasOwnProperty(op)){

          //loop over all defined operation response codes
          for (response in paths[path][op]['responses']){
            if (paths[path][op]['responses'].hasOwnProperty(response)){
              data = {
                'description':paths[path][op]['responses'][response].description,
                'operation':op,
                'path':path,
                'responseCode':response,
                'assertion':config.assertionFormat
              };

              output.push(genGET(data));
              console.log(output[output.length-1]);
            }
          }
				}
			}
		}
	}
}

testGen(swag, config);