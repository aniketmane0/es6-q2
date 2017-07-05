'use strict';
var webpack = require('webpack');
var path = require("path");
var glob = require("glob");

module.exports = {
  entry: glob.sync("./source/app.js")
             .reduce(function(map, path) {
               map[path.split('/').pop()] = path;
               return map;
             }, {}),
  output: {
    path: path.resolve(__dirname, 'destination'),
    filename: '[name]'
  },

  cache: true,

  stats: {
    colors: true,
    reasons: true,
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: [/node_modules/, /vendor/],
      enforce: 'pre',
      use: [{loader: 'eslint-loader'}]
    },{
      test: /\.(js)$/,
      exclude: [/node_modules/, /vendor/],
      use: [{loader: 'babel-loader'}]
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        debug: true,
        eslint: {
          failOnWarning: false,
          failOnError: false,
          fix: false,
          quiet: false,
        },
      },
    })
  ]
};
