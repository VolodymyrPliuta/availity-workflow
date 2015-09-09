
var webpack = require('webpack');
var path = require('path');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var context = require('../context');
var webpackConfig = require('../webpack');

var wpConfig = webpackConfig.extend({
  devtool: 'inline-source-map',
  cache: true,
  debug: true
});

wpConfig.plugins = [

  // ignore all the moment local files
  new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),

  new BowerWebpackPlugin({
    excludes: [
      /.*\.(less|map)/,
      /glyphicons-.*\.(eot|svg|ttf|woff)/,
      /bootstrap.*\.css/,
      /select2.*\.(png|gif|css)/
    ]
  }),

  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    _: 'lodash'
  }),

  // Use bundle name for extracting bundle css
  new ExtractTextPlugin('[name].css', {
    allChunks: true
  })
];

module.exports = function(config) {

  config.set({

    basePath: path.join(context.settings.project.path, 'project/app'),

    frameworks: ['jasmine'],

    files: [
      'specs.js'
    ],

    preprocessors: {
      'specs.js': ['webpack', 'sourcemap']
    },

    webpack: wpConfig,

    webpackMiddleware: {
      noInfo: true
    },

    webpackServer: {
      progress: false,
      stats: false,
      debug: true,
      quiet: false
    },

    exclude: [
      '*.less',
      '*.css'
    ],

    client: {
      // log console output in our test console
      captureConsole: true
    },


    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      dir: context.settings.js.reportsDir,
      subdir: function(browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      reporters: [
        {
          type: 'text',
          file: 'text.txt'
        },
        {
          type: 'text-summary',
          file: 'text-summary.txt'
        }, {
          type: 'html'
        }
      ]
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: true,

    browserNoActivityTimeout: 60000, // 60 seconds

    // List plugins explicitly, since auto-loading karma-webpack won't work here
    plugins: [
      require('karma-jasmine'),
      require('karma-mocha-reporter'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-coverage'),
      require('karma-webpack'),
      require('karma-phantomjs-launcher')
    ]
  });

};
