"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastSync = exports.updateLastSync = void 0;

var _is_same_week = _interopRequireDefault(require("date-fns/is_same_week"));

var _configuration = _interopRequireDefault(require("models/configuration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var updateLastSync =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var lastSync, today;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getLastSync();

          case 2:
            lastSync = _context.sent;
            today = new Date();

            if (!(0, _is_same_week.default)(lastSync, today)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            _context.next = 8;
            return _configuration.default.updateOne({
              name: "last_sync"
            }, {
              value: today.toString()
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function updateLastSync() {
    return _ref.apply(this, arguments);
  };
}();

exports.updateLastSync = updateLastSync;

var getLastSync =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var config;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _configuration.default.findOne({
              name: "last_sync"
            });

          case 2:
            config = _context2.sent;
            return _context2.abrupt("return", new Date(config.value));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getLastSync() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getLastSync = getLastSync;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbInVwZGF0ZUxhc3RTeW5jIiwiZ2V0TGFzdFN5bmMiLCJsYXN0U3luYyIsInRvZGF5IiwiRGF0ZSIsIkNvbmZpZ3VyYXRpb25zIiwidXBkYXRlT25lIiwibmFtZSIsInZhbHVlIiwidG9TdHJpbmciLCJmaW5kT25lIiwiY29uZmlnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7Ozs7Ozs7O0FBRU8sSUFBTUEsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDSEMsV0FBVyxFQURSOztBQUFBO0FBQ3BCQyxZQUFBQSxRQURvQjtBQUVwQkMsWUFBQUEsS0FGb0IsR0FFWixJQUFJQyxJQUFKLEVBRlk7O0FBQUEsaUJBR3RCLDJCQUFXRixRQUFYLEVBQXFCQyxLQUFyQixDQUhzQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUEsbUJBTXBCRSx1QkFBZUMsU0FBZixDQUF5QjtBQUFFQyxjQUFBQSxJQUFJLEVBQUU7QUFBUixhQUF6QixFQUErQztBQUFFQyxjQUFBQSxLQUFLLEVBQUVMLEtBQUssQ0FBQ00sUUFBTjtBQUFULGFBQS9DLENBTm9COztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQWRULGNBQWM7QUFBQTtBQUFBO0FBQUEsR0FBcEI7Ozs7QUFRQSxJQUFNQyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNGSSx1QkFBZUssT0FBZixDQUF1QjtBQUFFSCxjQUFBQSxJQUFJLEVBQUU7QUFBUixhQUF2QixDQURFOztBQUFBO0FBQ2pCSSxZQUFBQSxNQURpQjtBQUFBLDhDQUVoQixJQUFJUCxJQUFKLENBQVNPLE1BQU0sQ0FBQ0gsS0FBaEIsQ0FGZ0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBWFAsV0FBVztBQUFBO0FBQUE7QUFBQSxHQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpc1NhbWVXZWVrIGZyb20gXCJkYXRlLWZucy9pc19zYW1lX3dlZWtcIjtcclxuXHJcbmltcG9ydCBDb25maWd1cmF0aW9ucyBmcm9tIFwibW9kZWxzL2NvbmZpZ3VyYXRpb25cIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVMYXN0U3luYyA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGxhc3RTeW5jID0gYXdhaXQgZ2V0TGFzdFN5bmMoKTtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgIGlmIChpc1NhbWVXZWVrKGxhc3RTeW5jLCB0b2RheSkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBhd2FpdCBDb25maWd1cmF0aW9ucy51cGRhdGVPbmUoeyBuYW1lOiBcImxhc3Rfc3luY1wifSwgeyB2YWx1ZTogdG9kYXkudG9TdHJpbmcoKSB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldExhc3RTeW5jID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgY29uZmlnID0gYXdhaXQgQ29uZmlndXJhdGlvbnMuZmluZE9uZSh7IG5hbWU6IFwibGFzdF9zeW5jXCIgfSk7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoY29uZmlnLnZhbHVlKTtcclxufSJdfQ==