'use strict';

var Mocha = require('mocha');
var fs = require('fs');
var path = require('path');

var mocha = new Mocha();

var testDir = path.join(__dirname, 'test');
var directories = [];
var dir;

function isTest(file) {
  return file.substr(-7) === 'test.js';
}

function addTest(file) {
  mocha.addFile(path.join(dir, file));
}

fs.readdirSync(testDir).filter(function(file) {
  if (fs.statSync(path.join(testDir, file)).isDirectory()) {
    directories.push(path.join(testDir, file));
  } else if (isTest(file)) {
    mocha.addFile(path.join(testDir, file));
  }
});

var ndx;

for (ndx in directories) {
  if (directories[ndx] !== undefined) {
    dir = directories[ndx];
    fs.readdirSync(dir).filter(isTest)
    .forEach(addTest);
  }
}

mocha.run(function(failures) {
  process.on('exit', function() {
    process.exit(failures);
  });
});
