'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-neonode:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      // .withOptions()
      .withPrompts({projectName: 'test app'})
      .on('end', done);
  });

  it('Creates skeleon files', function () {
    assert.file([
      'bin',
      'config',
      'config/config.js',
      'controllers',
      'lib',
      'lib/core',
      'middlewares',
      'models',
      'public',
      'views',
      'knexfile.js',
      'LICENSE',
      'README.md',
      'webpack.config.js',
      'package.json'
    ]);
  });
});
