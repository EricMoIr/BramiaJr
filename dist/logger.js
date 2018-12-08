"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var chalk = require("chalk");

function print(color, level, messages) {
  var toPrint = messages.map(function (m) {
    if (m instanceof Error) {
      return m.stack;
    }

    return m;
  });
  var now = new Date().toLocaleString();
  var msg = "[".concat(now, "][").concat(level, "]: ").concat(toPrint.join("\n"));
  console.log(chalk[color](msg));
  return console.log;
}

var Logger =
/*#__PURE__*/
function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, null, [{
    key: "log",
    value: function log() {
      for (var _len = arguments.length, debug = new Array(_len), _key = 0; _key < _len; _key++) {
        debug[_key] = arguments[_key];
      }

      return print("white", "DEBUG", debug);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, _warn = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _warn[_key2] = arguments[_key2];
      }

      return print("yellow", "WARN", _warn);
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len3 = arguments.length, err = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        err[_key3] = arguments[_key3];
      }

      return print("red", "ERROR", err);
    }
  }, {
    key: "db",
    value: function db() {
      for (var _len4 = arguments.length, _db = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        _db[_key4] = arguments[_key4];
      }

      return print("green", "DB", _db);
    }
  }]);

  return Logger;
}();

var _default = Logger;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dnZXIudHMiXSwibmFtZXMiOlsiY2hhbGsiLCJyZXF1aXJlIiwicHJpbnQiLCJjb2xvciIsImxldmVsIiwibWVzc2FnZXMiLCJ0b1ByaW50IiwibWFwIiwibSIsIkVycm9yIiwic3RhY2siLCJub3ciLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciLCJtc2ciLCJqb2luIiwiY29uc29sZSIsImxvZyIsIkxvZ2dlciIsImRlYnVnIiwid2FybiIsImVyciIsImRiIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsT0FBRCxDQUFyQjs7QUFFQSxTQUFTQyxLQUFULENBQWVDLEtBQWYsRUFBc0JDLEtBQXRCLEVBQTZCQyxRQUE3QixFQUF1QztBQUNuQyxNQUFNQyxPQUFPLEdBQUdELFFBQVEsQ0FBQ0UsR0FBVCxDQUFhLFVBQUFDLENBQUMsRUFBSTtBQUM5QixRQUFJQSxDQUFDLFlBQVlDLEtBQWpCLEVBQXdCO0FBQ3BCLGFBQU9ELENBQUMsQ0FBQ0UsS0FBVDtBQUNIOztBQUNELFdBQU9GLENBQVA7QUFDSCxHQUxlLENBQWhCO0FBTUEsTUFBTUcsR0FBRyxHQUFHLElBQUlDLElBQUosR0FBV0MsY0FBWCxFQUFaO0FBQ0EsTUFBTUMsR0FBRyxjQUFPSCxHQUFQLGVBQWVQLEtBQWYsZ0JBQTBCRSxPQUFPLENBQUNTLElBQVIsQ0FBYSxJQUFiLENBQTFCLENBQVQ7QUFDQUMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlqQixLQUFLLENBQUNHLEtBQUQsQ0FBTCxDQUFhVyxHQUFiLENBQVo7QUFDQSxTQUFPRSxPQUFPLENBQUNDLEdBQWY7QUFDSDs7SUFFS0MsTTs7Ozs7Ozs7OzBCQUNtQjtBQUFBLHdDQUFQQyxLQUFPO0FBQVBBLFFBQUFBLEtBQU87QUFBQTs7QUFDakIsYUFBT2pCLEtBQUssQ0FBQyxPQUFELEVBQVUsT0FBVixFQUFtQmlCLEtBQW5CLENBQVo7QUFDSDs7OzJCQUVvQjtBQUFBLHlDQUFOQyxLQUFNO0FBQU5BLFFBQUFBLEtBQU07QUFBQTs7QUFDakIsYUFBT2xCLEtBQUssQ0FBQyxRQUFELEVBQVcsTUFBWCxFQUFtQmtCLEtBQW5CLENBQVo7QUFDSDs7OzRCQUVvQjtBQUFBLHlDQUFMQyxHQUFLO0FBQUxBLFFBQUFBLEdBQUs7QUFBQTs7QUFDakIsYUFBT25CLEtBQUssQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQm1CLEdBQWpCLENBQVo7QUFDSDs7O3lCQUVnQjtBQUFBLHlDQUFKQyxHQUFJO0FBQUpBLFFBQUFBLEdBQUk7QUFBQTs7QUFDYixhQUFPcEIsS0FBSyxDQUFDLE9BQUQsRUFBVSxJQUFWLEVBQWdCb0IsR0FBaEIsQ0FBWjtBQUNIOzs7Ozs7ZUFHVUosTSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNoYWxrID0gcmVxdWlyZShcImNoYWxrXCIpO1xyXG5cclxuZnVuY3Rpb24gcHJpbnQoY29sb3IsIGxldmVsLCBtZXNzYWdlcykge1xyXG4gICAgY29uc3QgdG9QcmludCA9IG1lc3NhZ2VzLm1hcChtID0+IHtcclxuICAgICAgICBpZiAobSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtLnN0YWNrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgY29uc3QgbXNnID0gYFske25vd31dWyR7bGV2ZWx9XTogJHt0b1ByaW50LmpvaW4oXCJcXG5cIil9YDtcclxuICAgIGNvbnNvbGUubG9nKGNoYWxrW2NvbG9yXShtc2cpKTtcclxuICAgIHJldHVybiBjb25zb2xlLmxvZztcclxufVxyXG5cclxuY2xhc3MgTG9nZ2VyIHtcclxuICAgIHN0YXRpYyBsb2coLi4uZGVidWcpIHtcclxuICAgICAgICByZXR1cm4gcHJpbnQoXCJ3aGl0ZVwiLCBcIkRFQlVHXCIsIGRlYnVnKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgd2FybiguLi53YXJuKSB7XHJcbiAgICAgICAgcmV0dXJuIHByaW50KFwieWVsbG93XCIsIFwiV0FSTlwiLCB3YXJuKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZXJyb3IoLi4uZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIHByaW50KFwicmVkXCIsIFwiRVJST1JcIiwgZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZGIoLi4uZGIpIHtcclxuICAgICAgICByZXR1cm4gcHJpbnQoXCJncmVlblwiLCBcIkRCXCIsIGRiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyOyJdfQ==