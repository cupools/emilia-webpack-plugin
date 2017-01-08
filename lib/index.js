'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
          // try to get spite hash
          callback(null, data);
        });
      });

      compiler.plugin('compilation', function (compilation) {
        compilation.plugin('normal-module-loader', function (loaderContext, module) {
          // loaderContext.spriteHash = 'sprite
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