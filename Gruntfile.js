'use strict';
var webpackConfig = require('./webpack.config.js');
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkgConfig,

    webpack: {
      dev: webpackConfig
    },
    clean: ['./destination'],
    watch: {
      scripts: {
        files: [
          'source/*.js'
        ],
        tasks: ['build'],
        options: {
          spawn: false,
          atBegin: true,
          interval: 5007
        },
      },
    },
  });

  grunt.registerTask('build', ['webpack:dev']);
};
