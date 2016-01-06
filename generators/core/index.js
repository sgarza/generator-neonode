'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('destination', { type: String, required: false });
  },

  init : function() {
    this.destinationRoot(this.destination);
  },
  writing: function () {
    this.log('Copying files...');

    mkdirp.sync(path.join(this.destinationPath(), '/lib/core'))
    this.fs.copy(
      this.templatePath(),
      this.destinationPath('lib/core')
    );
  }
});
