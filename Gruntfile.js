/*
 * grunt-polybrick
 * https://github.com/alternatex/grunt-polybrick
 *
 * Copyright (c) 2014 alternatex <gianni.furger@gmail.com>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', 'app/bower_components/x-polybrick/'],
    },

    // Configuration to be run (and then tested).
    polybrick: {
      default_options: {
        options: {
          fileMap:{
            js: './app/bower_components/x-polybrick/src/x-tag-components.js',
            css: './app/bower_components/x-polybrick/src/x-tag-components.css'
          }
        }
      }
    },

    nodeunit: {
      tests: ['test/*_test.js'],
    },

    bumpup: ['bower.json', 'package.json'],
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-bumpup');

  grunt.registerTask('test', ['clean', 'polybrick', 'nodeunit']);  
  grunt.registerTask('default', ['jshint', 'test']);

};