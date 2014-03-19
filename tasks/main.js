/*
 * grunt-polybrick
 * https://github.com/alternatex/grunt-polybrick
 *
 * Copyright (c) 2014 alternatex <gianni.furger@gmail.com>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // helpers
  var _     = require('lodash');
  var bower = require('bower');
  var fs    = require('fs');
  var path  = require('path');
  var EOL   = require('os').EOL;

  // core data
  var xtag = {  
    main:     'main',
    needle:   'x-tag-',
    exclude: ['x-tag-core'],    
    tags:    {},
    types:   {},
    files:   {}
  };

  var files = {};

  var filesMap = {
    js:[], 
    css:[]
  };
  
  grunt.registerMultiTask('polybrick', 'Use polymer together with X-Tags and vanilla custom elements.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      fileMap: { js: 'components.js', css: 'components.css' },
      directory: bower.config.directory });

    var process = function process(identifier, property, kinds, parentLib){

      _(kinds).each(function(kind){
        
        var item = path.join(identifier , kind);
        var fileinfo = item.match(/\.(\w+)$/);

        if(fileinfo){

          var ext = fileinfo[1];

          // initialize collection by type
          if (!files[ext]){ files[ext] = []; }
          
          var existsAt = files[ext].indexOf(item),
              parentAt = files[ext].indexOf(parentLib);
          
          // insert before
          if (parentAt >= 0 && existsAt === -1){  
            console.log("insert before");
            files[ext].splice(parentAt,0, item);

          // shuffle up
          } else if (parentAt >= 0 && existsAt > parentAt){
            console.log("shuffle");
            files[ext].splice(parentAt, 0, item);
            files[ext].splice(existsAt+1,1);

          // push new
          } else if (existsAt === -1){              
            console.log("insert new");
            files[ext].push(item);
          }
        }
      });
    };

    var done = this.async();
    var async = grunt.util.async;

    function processDependencies(data) {

      _(data.dependencies).each(function(data, dependency){
        if(dependency.substr(0, xtag.needle.length)===xtag.needle){
          xtag.tags[dependency] = data;        
        }
      });
      
      var polybrickHome = bower.config.directory+'/x-polybrick/src/';

      // create path (deep) - no error handling - escalate only
      if(!fs.existsSync(polybrickHome)){
        require('mkdirp').sync(polybrickHome);        
      }

      _(xtag.tags).each(function(tag, identifier){

        var properties = tag.pkgMeta;

        _(properties).each(function(data, property){      

          if(property===xtag.main){
              
            var files = Array.isArray(data) ? data : [data];
            var css = '';
            var js = '';          
            var polymer = ''; 
    
            _(files).each(function(file){
                  
              var item = path.join(identifier , file);
              var fileinfo = item.match(/\.(\w+)$/);

              if(fileinfo){ 
                var filepath = '../../'+identifier+'/'+file;
                switch(fileinfo[1]){
                  case 'js':
                    if(file!=='src/core.js') {
                      filesMap.js.push(bower.config.directory+'/'+identifier+'/'+file);
                    }
                    js+='<script src="'+filepath+'"></script>'+EOL;
                    break;
                  case 'css':                    
                    filesMap.css.push(bower.config.directory+'/'+identifier+'/'+file);
                    css+='<link rel="stylesheet" href="'+filepath+'"/>'+EOL;
                    break;            
                }
              }
            });
  
            polymer+='<link rel="import" href="../src/x-tag-core.html"/>'+EOL;                      
  
            xtag.files[identifier]=polymer+css+js;
          }
        });

      });    

      var xtag_core = [];    
      xtag_core.push('<script src="../../x-tag-core/src/core.js"></script>');
      xtag_core = xtag_core.join(EOL);
      xtag.files['x-tag-core'] = xtag_core;

      var xtag_components = [];
      xtag_components.push('<link rel="import" href="./x-tag-core.html"/>');          
      xtag_components.push('<link rel="stylesheet" href="./x-tag-components.css"/>');          
      xtag_components.push('<script src="./x-tag-components.js"></script>');    
      xtag_components = xtag_components.join(EOL);

      xtag.files['x-tag-components'] = xtag_components;

      _(xtag.files).each(function(data, name){
        var filenamePolybrickBridge = polybrickHome+name+'.html';
        fs.writeFileSync(filenamePolybrickBridge, data, {
          encoding: 'utf8'
        });
      });
      
      var concatOptions = grunt.config.getRaw('concat') || {};

      var fileMapCallback = function(i){
        return i;
      };

      for (var itemFile in options.fileMap){
        concatOptions['polybrick-'+itemFile] = {
          src: filesMap[itemFile].map(fileMapCallback),
          dest: options.directory+'/'+options.fileMap[itemFile]
        };

      }
      grunt.config.set('concat', concatOptions);
      for (var itemFile2 in options.fileMap){
        grunt.task.run('concat:polybrick-' + itemFile2);
      }
      done();      
    }

    try{
      bower.commands.list()
      .on('end', function(data){
        processDependencies(data);
        
      })
      .on('error', function(data){
        console.log("bower error:", data);
        done(data);
      });
    } catch(ex){
      console.log(ex);
    }
 
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

};
