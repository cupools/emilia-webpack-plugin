'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (content) {
  var _this = this;

  var config = _loaderUtils2.default.getLoaderConfig(this, this.options ? 'emilia' : '');
  var root = _postcss2.default.parse(content);
  var context = this.emiliaContext;

  _storage2.default.generate();

  root.walkDecls(/background(-image)?$/, function (decl) {
    var value = decl.value;

    var start = value.indexOf('url(');
    var end = value.indexOf(')');

    var _value$substring$repl = value.substring(start + 4, end).replace(/^[\s"']|[\s"']$/g, '').split('?__'),
        _value$substring$repl2 = _slicedToArray(_value$substring$repl, 2),
        url = _value$substring$repl2[0],
        tag = _value$substring$repl2[1];

    if (!tag) {
      return;
    }

    var resource = _this.resource;
    var realpath = _path2.default.join(context, url);
    var result = _storage2.default.get(tag);
    if (!result) {
      return;
    }

    var coordinate = result.coordinates.filter(function (item) {
      return item.meta === realpath;
    })[0];
    if (!coordinate) {
      return;
    }

    var parent = decl.parent;
    var size = result.width + 'px ' + result.height + 'px';
    var position = 0 - coordinate.x + 'px ' + (0 - coordinate.y) + 'px';

    parent.walkDecls(/background-(size|position)/, function (d) {
      return d.remove();
    });
    parent.insertAfter(decl, {
      prop: 'background-position',
      value: position
    });
    parent.insertAfter(decl, {
      prop: 'background-size',
      value: size
    });
  });

  return root.toString();
};