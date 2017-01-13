'use strict';

var loaderUtils = require('loader-utils');
var assign = require('lodash.assign');

module.exports = function (content) {
  var config = loaderUtils.getLoaderConfig(this, this.options ? 'pxrem' : '');
  return content;
};