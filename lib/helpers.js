'use strict';

var _ = require('lodash');
var strObj = require('string');
var url = require('url');
var jsStringEscape = require('js-string-escape');

var len;

module.exports = {
  is: is,
  ifCond: ifCond,
  validateResponse: validateResponse,
  length: length,
  pathify: pathify,
  printJSON: printJSON,
  len: len,
  setLen: setLen,
  isPdfMediaType : isPdfMediaType,
  requestDataParamFormatter : requestDataParamFormatter,
  isJsonRepresentation : isJsonRepresentation,
  isJsonMediaType : isJsonMediaType,
  mediaTypeContainsPdf : mediaTypeContainsPdf,
  mediaTypeContainsJson : mediaTypeContainsJson
};

function setLen(descriptionLength) {
  len = descriptionLength
}

// http://goo.gl/LFoiYG
function is(lvalue, rvalue, options) {
  if (arguments.length < 3) {
    throw new Error('Handlebars Helper \'is\' needs 2 parameters');
  }

  if (lvalue !== rvalue) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
}

// http://goo.gl/LFoiYG
function ifCond(v1, v2, options) {
  if (arguments.length < 3) {
    throw new Error('Handlebars Helper \'ifCond\' needs 2 parameters');
  }
  if (v1.length > 0 || v2) {
    return options.fn(this);
  }
  return options.inverse(this);
}

/**
 * determines if content types are able to be validated
 * @param  {string} type     content type to be evaluated
 * @param  {boolean} noSchema whether or not there is a defined schema
 * @param  {Object} options  handlebars built-in options
 * @returns {boolean}          whether or not the content can be validated
 */
function validateResponse(type, noSchema,
  options) {
  if (arguments.length < 3) {
    throw new Error('Handlebars Helper \'validateResponse\'' +
      'needs 2 parameters');
  }

  if (!noSchema && mediaTypeContainsJson(type)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}

/**
 * mustache helper method to determine if a mediaType is JSON
 * @param {string} type   content type to be evaluated
 */
function isJsonMediaType(type, options) {
  return mediaTypeContainsJson(type) ? options.fn(this) : options.inverse(this);
}

/**
 * mustache helper method to determine if a mediaType is PDF
 * @param {string} type   content type to be evaluated
 */
function isPdfMediaType(type, options) {
  return mediaTypeContainsPdf(type) ? options.fn(this) : options.inverse(this);
}

/**
 * decides if this request/response has a JSON representation
 * @param {string} contentType    the media type of the request
 * @param {string} returnType     the media type of the response
 */
function isJsonRepresentation(contentType, returnType, options) {
  return (mediaTypeContainsJson(contentType) || mediaTypeContainsJson(returnType)) ? options.fn(this) : options.inverse(this);
}

/**
 * determines if the mediatype is json
 * @param {string} type   content type to be evaluated
 */
function mediaTypeContainsJson(type) {
  return /\bjson\b/i.test(type);
}

/**
 * determines if the mediatype is pdf
 * @param {string} type   content type to be evaluated
 */
function mediaTypeContainsPdf(type) {
  return /\bpdf\b/i.test(type);
}

/**
 * replaces path params with obvious indicator for filling values
 * (i.e. if any part of the path is surrounded in curly braces {})
 * @param  {string} path  request path to be pathified
 * @param  {object} pathParams contains path parameters to replace with
 * @returns {string}          pathified string
 */
function pathify(path, pathParams) {
  var r;

  if (arguments.length < 3) {
    throw new Error('Handlebars Helper \'pathify\'' +
      ' needs 2 parameters');
  }

  if ((typeof path) !== 'string') {
    throw new TypeError('Handlebars Helper \'pathify\'' +
      'requires path to be a string');
  }

  if ((typeof pathParams) !== 'object') {
    throw new TypeError('Handlebars Helper \'pathify\'' +
      'requires pathParams to be an object');
  }

  if (Object.keys(pathParams).length > 0) {
    var re = new RegExp(/(?:\{+)(.*?(?=\}))(?:\}+)/g);
    var re2;
    var matches = [];
    var m = re.exec(path);
    var i;

    while (m) {
      matches.push(m[1]);
      m = re.exec(path);
    }

    for (i = 0; i < matches.length; i++) {
      var match = matches[i];

      re2 = new RegExp('(\\{+)' + match + '(?=\\})(\\}+)');

      if (typeof (pathParams[match]) !== 'undefined' && pathParams[match] !== null) {
        path = path.replace(re2, pathParams[match]);
      } else {
        path = path.replace(re2, '{' + match + ' PARAM GOES HERE}');
      }
    }
    return path;
  }

  r = new RegExp(/(?:\{+)(.*?(?=\}))(?:\}+)/g);
  return path.replace(r, '{$1 PARAM GOES HERE}');
}

/**
 * split the long description into multiple lines
 * @param  {string} description  request description to be splitted
 * @returns {string}        multiple lines
 */
function length(description) {
  if (arguments.length < 2) {
    throw new Error('Handlebar Helper \'length\'' +
    ' needs 1 parameter');
  }

  if ((typeof description) !== 'string') {
    throw new TypeError('Handlebars Helper \'length\'' +
      'requires path to be a string');
  }

  var desc = description;
  if (len !== -1) {
    description = strObj(description).truncate(len - 50).s;
  }

  return jsStringEscape(description);
}

function printJSON(data) {
  if (arguments.length < 2) {
    throw new Error('Handlebar Helper \'printJSON\'' +
    ' needs at least 1 parameter');
  }

  if (data !== null) {
    if ((typeof data) === 'string') {
      return '\'' + data + '\'';
    } else if ((typeof data) === 'object') {
      return '{\n'+prettyPrintJson(data, '        ')+'\n      }';
    } else {
      return data;
    }
  } else {
    return null;
  }
}

// http://goo.gl/7DbFS
function prettyPrintJson(obj, indent) {
  var result = '';

  if (indent == null) indent = '';

  for (var property in obj) {
    if (property.charAt(0) !== '_') {
      var value = obj[property];

      if (typeof value === 'string') {
        value = '\'' + value + '\'';
      } else if (typeof value === 'object') {
        if (value instanceof Array) {
          value = '[ ' + value + ' ]';
        } else {
          // Recursive dump
          var od = prettyPrintJson(value, indent + '  ');

          value = '{\n' + od + '\n' + indent + '}';
        }
      }
      result += indent + property + ': ' + value + ',\n';
    }
  }
  return result.replace(/,\n$/, '');
}


function requestDataParamFormatter(paramName, paramType, requestParameters){
  var delimiter = "'";
  if (['integer', 'number', 'boolean', 'null'].indexOf(paramType.toLowerCase()) > -1) {
    delimiter = '';
  } 
  
  if (typeof requestParameters[paramName] != 'undefined') {
    return delimiter + requestParameters[paramName] + delimiter;
  }

  return "'DATA GOES HERE'";
}