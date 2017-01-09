'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmiliaPlugin = function () {
  function EmiliaPlugin() {
    _classCallCheck(this, EmiliaPlugin);
  }

  _createClass(EmiliaPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var options = this.options || {};

      compiler.plugin('normal-module-factory', function (nmf) {
        nmf.plugin('before-resolve', function (data, callback) {
          if (!data) {
            return callback();
          }

          return callback(null, _extends({}, data, {
            request: data.request.replace(/\d\.png(\?__sprite)?/, '7.png')
          }));
        });
      });

      compiler.plugin('compilation', function (compilation) {
        compilation.plugin('normal-module-loader', function (loaderContext, module) {
          // loaderContext.spriteHash = 'sprite'
        });

        compilation.plugin('optimize-modules', function (modules) {});
      });

      compiler.plugin('emit', function (compilation, callback) {
        callback();
      });
    }
  }]);

  return EmiliaPlugin;
}();

exports.default = EmiliaPlugin;