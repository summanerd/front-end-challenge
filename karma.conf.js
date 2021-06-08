const webpackConfig = require('./webpack/development.config');
// const istanbul = require('istanbul');

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['mocha', 'webpack'],

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-coverage',
    ],

    // list of files / patterns to load in the browser
    files: [
      'test-setup.js',
      'test/**/*.test.js',
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['coverage'],
      'test/**/*.test.js': ['webpack'],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'test/test-coverage/',
      subdir: function getSubdir(browser) {
        // normalization process to keep a consistent browser name across different
        // OS
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      check: {
        global: {
          statements: 50,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
      watermarks: {
        statements: [50, 75],
        functions: [50, 75],
        branches: [50, 75],
        lines: [50, 75],
      },
      reporters: [
        { type: 'html' },
      ],
      // instrumenters: { istanbul: istanbul },
      instrumenter: {
        '**/*.js': 'istanbul',
        '**/*.jsx': 'istanbul',
      },
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,

    webpack: webpackConfig,
  });
};
