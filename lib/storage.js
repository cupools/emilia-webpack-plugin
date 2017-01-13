'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _spriteTool = require('sprite-tool');

var _spriteTool2 = _interopRequireDefault(_spriteTool);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {
  store: {},
  add: function add(mark, realpath) {
    if (!this.store[mark]) {
      this.store[mark] = {
        dependences: [],
        buffer: null,
        coordinates: null,
        width: 0,
        height: 0
      };
    }

    this.store[mark].dependences.push(realpath);
  },
  get: function get(mark) {
    return this.store[mark];
  },
  generate: function generate() {
    var store = this.store;


    Object.keys(store).forEach(function (mark) {
      var dependences = store[mark].dependences;

      var buffers = dependences.map(function (p) {
        return _fs2.default.readFileSync(p);
      });
      var result = (0, _spriteTool2.default)({}, buffers, dependences);

      Object.assign(store, _defineProperty({}, mark, _extends({ dependences: dependences }, result)));
    });
  },
  clear: function clear() {
    this.store = {};
  }
};