'use strict';
var yeoman = require('yeoman-generator');
var askName = require('inquirer-npm-name');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');
var mkdirp = require('mkdirp');

function makeGeneratorName(name) {
  name = _.kebabCase(name);
  return name;
}

module.exports = yeoman.Base.extend({
  initializing : function () {
    this.props = {};
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the groovy ' + chalk.red('generator-neonode') + ' generator!'
    ));

    askName({
      name: 'name',
      message: 'Whats your new project name?',
      default: makeGeneratorName(path.basename(process.cwd())),
      filter: makeGeneratorName,
      validate: function (str) {
        return str.length > 0;
      }
    }, this, function (name) {
      this.props.name = name;
      done();
    }.bind(this));
  },

  default : function() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your project must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      );

      mkdirp(this.props.name);

      this.destinationRoot(this.destinationPath(this.props.name));
    }

    this.composeWith('neonode:core', {
      arguments: [this.destinationPath()]
    }, {
      local: require.resolve('../core')
    });

  },

  writing: function () {
    this.log('Copying files...');

    this.fs.copy(
      this.templatePath('skeleton'),
      this.destinationPath()
    );

    mkdirp.sync(path.join(this.destinationPath(), '/models'));

    this.log('Generating package.json...');
    this.fs.copyTpl(
      this.templatePath('package.js'),
      this.destinationPath('package.json'),
      {
        name : _.kebabCase(this.props.name),
        description : ''
      }
    );

    this.log('Generating config/config.js...');
    this.fs.copyTpl(
      this.templatePath('config.js'),
      this.destinationPath('config/config.js'),
      {
        appName : this.props.name
      }
    );
  },

  install: function () {
    this.npmInstall([
      'actions',
      'autoprefixer-loader',
      'body-parser',
      'compression-webpack-plugin',
      'connect-redis',
      'cookie-parser',
      'css-loader',
      'csurf',
      'express-session',
      'file-loader',
      'imports-loader',
      'knex',
      'less',
      'less-loader',
      'lodash',
      'lodash-inflection',
      'methods',
      'mysql',
      'neon',
      'path',
      'pg',
      'redis',
      'req-flash',
      'style-loader',
      'url-loader',
      'webpack',
      'method-override',
      'colors',
      'express',
      'glob',
      'krypton-orm',
      'mkdirp',
      'morgan',
      'object-getprototypesof',
      'path',
      'pluralize',
      'rimraf',
      'thulium',
      'thulium-express',
      'winston',
    ], {save : true});
  }
});
