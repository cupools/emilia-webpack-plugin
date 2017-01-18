'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var REG = /\?__(\w+)$/;

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

          var request = data.request,
              context = data.context;

          var subIndex = request.indexOf('?__');

          var execResult = REG.exec(request);
          var mark = execResult && execResult[1];
          var fromJS = subIndex === 0;

          if (fromJS) {
            return callback(null, _extends({}, data, {
              request: './' + mark + '.png',
              context: _path2.default.join(__dirname, '../.extract')
            }));
          } else if (!request.includes('.png') || subIndex === -1 || !mark) {
            return callback(null, data);
          }

          var realpath = _path2.default.join(context, request.substr(0, subIndex));

          // Fix me, avoid starting generation each time.
          _storage2.default.add(mark, realpath);
          _storage2.default.generate();

          _fs2.default.writeFileSync(_path2.default.join(__dirname, '../.extract', mark + '.png'), _storage2.default.get(mark).buffer, 'binary');

          return callback(null, _extends({}, data, {
            request: './' + mark + '.png',
            context: _path2.default.join(__dirname, '../.extract')
          }));
        });

        nmf.plugin('after-resolve', function (data, callback) {
          return callback(null, data);
        });
      });

      compiler.plugin('compilation', function (compilation) {
        compilation.plugin('normal-module-loader', function (loaderContext, module) {
          Object.assign(loaderContext, { emiliaContext: module.context });
        });
      });

      compiler.plugin('emit', function (compilation, callback) {
        callback();
      });
    }
  }]);

  return EmiliaPlugin;
}();

exports.default = EmiliaPlugin;