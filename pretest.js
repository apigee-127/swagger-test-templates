/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Apigee Corporation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/**
 * This script is usefull for running actions needed before testing, like copying
 * files etc.
 */
'use strict';

var path = require('path');
var fs = require('fs');
var ncp = require('ncp').ncp;


/**
 * Pretest actions for the confirgurable templates path option
 copy all templates to the user directory,
 write stuff in a handlebar file
 */
var customTemplatesPath = path.join(__dirname, '/test/templatesPath/userTemplateDirectory');

ncp(path.join(__dirname, 'templates'),
  customTemplatesPath, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('templates copied');
    fs.appendFile(path.join(customTemplatesPath, 'outerDescribe.handlebars'),
      'THIS IS A CUSTOM TEMPLATE', function(appendErr) {
        if (appendErr) {
          return console.log(appendErr);
        }
        return true;
      });
  });
