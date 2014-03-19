'use strict';

var fs = require('fs');
var grunt = require('grunt');
var bower = require('bower');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.polybrick = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {

    var files = [
      bower.config.directory+'/x-polybrick/src/x-tag-core.html',
      bower.config.directory+'/x-polybrick/src/x-tag-components.html',
      bower.config.directory+'/x-polybrick/src/x-tag-components.js',
      bower.config.directory+'/x-polybrick/src/x-tag-components.css'
    ];

    test.expect(files.length);

    console.log('\n');

    files.forEach(function(file){
      console.log(file);
      var fileExists = fs.existsSync(file);
      test.ok(fileExists, file + ' should exist');
    });

    console.log();

    test.done();
  }
};
