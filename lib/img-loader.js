'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (content) {
  var config = _loaderUtils2.default.getLoaderConfig(this, this.options ? 'emilia' : '');
  var resource = this.resource;


  if (resource.indexOf('.extract') === -1) {
    return content;
  }

  _storage2.default.generate();
  var buf = _fs2.default.readFileSync(resource);
  return Uint8Array.from(buf);
};

module.exports.raw = true;