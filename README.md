# grunt-polybrick [![Build Status](https://travis-ci.org/alternatex/grunt-polybrick.png)](https://travis-ci.org/alternatex/grunt-polybrick)

> Use polymer together with x-tags and vanilla custom elements.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-polybrick --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-polybrick');
```

## The "polybrick" task

### Overview
In your project's Gruntfile, add a section named `polybrick` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  polybrick: {
    all: {
      options: {
        fileMap: {
          js: './x-polybrick/src/x-tag-components.js',
          css: './x-polybrick/src/x-tag-components.css'
        }
      }    
    } 
  },
});
```

### Options

#### options.fileMap
Type: `Object`
Default value: 
```
{
  js: './x-polybrick/src/x-tag-components.js',
  css: './x-polybrick/src/x-tag-components.css'
}
```

A string value that is used to do something with whatever.


### Usage Examples

#### Default Options

```js
grunt.initConfig({
  polybrick: {
    options: {
      fileMap: {
        js: './x-polybrick/src/x-tag-components.js',
        css: './x-polybrick/src/x-tag-components.css'
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
