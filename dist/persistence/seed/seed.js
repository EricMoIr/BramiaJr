"use strict";

var _start_of_week = _interopRequireDefault(require("date-fns/start_of_week"));

var _configuration = _interopRequireDefault(require("models/configuration"));

var _store = _interopRequireDefault(require("persistence/store"));

var _logger = _interopRequireDefault(require("logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var init =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var currentWeek, config;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _store.default.instance.connect();

          case 2:
            _logger.default.db("Seeding...");

            currentWeek = (0, _start_of_week.default)(new Date());
            _context.next = 6;
            return _configuration.default.findOne({
              name: "last_sync"
            });

          case 6:
            config = _context.sent;

            if (!config) {
              _context.next = 13;
              break;
            }

            config.value = currentWeek.toString();
            _context.next = 11;
            return config.save();

          case 11:
            _context.next = 15;
            break;

          case 13:
            _context.next = 15;
            return _configuration.default.create({
              name: "last_sync",
              value: currentWeek
            });

          case 15:
            _logger.default.db("Finished seeding");

            process.exit();

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

init();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wZXJzaXN0ZW5jZS9zZWVkL3NlZWQudHMiXSwibmFtZXMiOlsiaW5pdCIsIlN0b3JlIiwiaW5zdGFuY2UiLCJjb25uZWN0IiwiTG9nZ2VyIiwiZGIiLCJjdXJyZW50V2VlayIsIkRhdGUiLCJDb25maWd1cmF0aW9ucyIsImZpbmRPbmUiLCJuYW1lIiwiY29uZmlnIiwidmFsdWUiLCJ0b1N0cmluZyIsInNhdmUiLCJjcmVhdGUiLCJwcm9jZXNzIiwiZXhpdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNIQyxlQUFNQyxRQUFOLENBQWVDLE9BQWYsRUFERzs7QUFBQTtBQUVUQyw0QkFBT0MsRUFBUCxDQUFVLFlBQVY7O0FBQ01DLFlBQUFBLFdBSEcsR0FHVyw0QkFBWSxJQUFJQyxJQUFKLEVBQVosQ0FIWDtBQUFBO0FBQUEsbUJBSVlDLHVCQUFlQyxPQUFmLENBQXVCO0FBQUVDLGNBQUFBLElBQUksRUFBRTtBQUFSLGFBQXZCLENBSlo7O0FBQUE7QUFJSEMsWUFBQUEsTUFKRzs7QUFBQSxpQkFLTEEsTUFMSztBQUFBO0FBQUE7QUFBQTs7QUFNTEEsWUFBQUEsTUFBTSxDQUFDQyxLQUFQLEdBQWVOLFdBQVcsQ0FBQ08sUUFBWixFQUFmO0FBTks7QUFBQSxtQkFPQ0YsTUFBTSxDQUFDRyxJQUFQLEVBUEQ7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxtQkFTQ04sdUJBQWVPLE1BQWYsQ0FBc0I7QUFDeEJMLGNBQUFBLElBQUksRUFBRSxXQURrQjtBQUV4QkUsY0FBQUEsS0FBSyxFQUFFTjtBQUZpQixhQUF0QixDQVREOztBQUFBO0FBY1RGLDRCQUFPQyxFQUFQLENBQVUsa0JBQVY7O0FBQ0FXLFlBQUFBLE9BQU8sQ0FBQ0MsSUFBUjs7QUFmUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFKakIsSUFBSTtBQUFBO0FBQUE7QUFBQSxHQUFWOztBQWlCQUEsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdGFydE9mV2VlayBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRfb2Zfd2Vla1wiO1xyXG5cclxuaW1wb3J0IENvbmZpZ3VyYXRpb25zIGZyb20gXCJtb2RlbHMvY29uZmlndXJhdGlvblwiO1xyXG5pbXBvcnQgU3RvcmUgZnJvbSBcInBlcnNpc3RlbmNlL3N0b3JlXCI7XHJcbmltcG9ydCBMb2dnZXIgZnJvbSBcImxvZ2dlclwiO1xyXG5cclxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IFN0b3JlLmluc3RhbmNlLmNvbm5lY3QoKTtcclxuICAgIExvZ2dlci5kYihcIlNlZWRpbmcuLi5cIik7XHJcbiAgICBjb25zdCBjdXJyZW50V2VlayA9IHN0YXJ0T2ZXZWVrKG5ldyBEYXRlKCkpO1xyXG4gICAgY29uc3QgY29uZmlnID0gYXdhaXQgQ29uZmlndXJhdGlvbnMuZmluZE9uZSh7IG5hbWU6IFwibGFzdF9zeW5jXCIgfSk7XHJcbiAgICBpZiAoY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLnZhbHVlID0gY3VycmVudFdlZWsudG9TdHJpbmcoKTtcclxuICAgICAgICBhd2FpdCBjb25maWcuc2F2ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhd2FpdCBDb25maWd1cmF0aW9ucy5jcmVhdGUoe1xyXG4gICAgICAgICAgICBuYW1lOiBcImxhc3Rfc3luY1wiLFxyXG4gICAgICAgICAgICB2YWx1ZTogY3VycmVudFdlZWssXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBMb2dnZXIuZGIoXCJGaW5pc2hlZCBzZWVkaW5nXCIpO1xyXG4gICAgcHJvY2Vzcy5leGl0KCk7XHJcbn07XHJcbmluaXQoKTsiXX0=