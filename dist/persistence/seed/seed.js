"use strict";

var _start_of_week = _interopRequireDefault(require("date-fns/start_of_week"));

var _configuration = _interopRequireDefault(require("models/configuration"));

var _user = _interopRequireDefault(require("models/user"));

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
            _logger.default.db("Resetting index...");

            _context.next = 5;
            return _user.default.collection.dropIndexes();

          case 5:
            _logger.default.db("Finished resetting index");

            _logger.default.db("Seeding...");

            currentWeek = (0, _start_of_week.default)(new Date());
            _context.next = 10;
            return _configuration.default.findOne({
              name: "last_sync"
            });

          case 10:
            config = _context.sent;

            if (!config) {
              _context.next = 17;
              break;
            }

            config.value = currentWeek.toString();
            _context.next = 15;
            return config.save();

          case 15:
            _context.next = 19;
            break;

          case 17:
            _context.next = 19;
            return _configuration.default.create({
              name: "last_sync",
              value: currentWeek
            });

          case 19:
            _logger.default.db("Finished seeding");

            process.exit();

          case 21:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wZXJzaXN0ZW5jZS9zZWVkL3NlZWQudHMiXSwibmFtZXMiOlsiaW5pdCIsIlN0b3JlIiwiaW5zdGFuY2UiLCJjb25uZWN0IiwiTG9nZ2VyIiwiZGIiLCJVc2VycyIsImNvbGxlY3Rpb24iLCJkcm9wSW5kZXhlcyIsImN1cnJlbnRXZWVrIiwiRGF0ZSIsIkNvbmZpZ3VyYXRpb25zIiwiZmluZE9uZSIsIm5hbWUiLCJjb25maWciLCJ2YWx1ZSIsInRvU3RyaW5nIiwic2F2ZSIsImNyZWF0ZSIsInByb2Nlc3MiLCJleGl0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ0hDLGVBQU1DLFFBQU4sQ0FBZUMsT0FBZixFQURHOztBQUFBO0FBRVRDLDRCQUFPQyxFQUFQLENBQVUsb0JBQVY7O0FBRlM7QUFBQSxtQkFHSEMsY0FBTUMsVUFBTixDQUFpQkMsV0FBakIsRUFIRzs7QUFBQTtBQUlUSiw0QkFBT0MsRUFBUCxDQUFVLDBCQUFWOztBQUNBRCw0QkFBT0MsRUFBUCxDQUFVLFlBQVY7O0FBQ01JLFlBQUFBLFdBTkcsR0FNVyw0QkFBWSxJQUFJQyxJQUFKLEVBQVosQ0FOWDtBQUFBO0FBQUEsbUJBT1lDLHVCQUFlQyxPQUFmLENBQXVCO0FBQUVDLGNBQUFBLElBQUksRUFBRTtBQUFSLGFBQXZCLENBUFo7O0FBQUE7QUFPSEMsWUFBQUEsTUFQRzs7QUFBQSxpQkFRTEEsTUFSSztBQUFBO0FBQUE7QUFBQTs7QUFTTEEsWUFBQUEsTUFBTSxDQUFDQyxLQUFQLEdBQWVOLFdBQVcsQ0FBQ08sUUFBWixFQUFmO0FBVEs7QUFBQSxtQkFVQ0YsTUFBTSxDQUFDRyxJQUFQLEVBVkQ7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxtQkFZQ04sdUJBQWVPLE1BQWYsQ0FBc0I7QUFDeEJMLGNBQUFBLElBQUksRUFBRSxXQURrQjtBQUV4QkUsY0FBQUEsS0FBSyxFQUFFTjtBQUZpQixhQUF0QixDQVpEOztBQUFBO0FBaUJUTCw0QkFBT0MsRUFBUCxDQUFVLGtCQUFWOztBQUNBYyxZQUFBQSxPQUFPLENBQUNDLElBQVI7O0FBbEJTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQUpwQixJQUFJO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBb0JBQSxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0YXJ0T2ZXZWVrIGZyb20gXCJkYXRlLWZucy9zdGFydF9vZl93ZWVrXCI7XHJcblxyXG5pbXBvcnQgQ29uZmlndXJhdGlvbnMgZnJvbSBcIm1vZGVscy9jb25maWd1cmF0aW9uXCI7XHJcbmltcG9ydCBVc2VycyBmcm9tIFwibW9kZWxzL3VzZXJcIjtcclxuaW1wb3J0IFN0b3JlIGZyb20gXCJwZXJzaXN0ZW5jZS9zdG9yZVwiO1xyXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCJsb2dnZXJcIjtcclxuXHJcbmNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBTdG9yZS5pbnN0YW5jZS5jb25uZWN0KCk7XHJcbiAgICBMb2dnZXIuZGIoXCJSZXNldHRpbmcgaW5kZXguLi5cIik7XHJcbiAgICBhd2FpdCBVc2Vycy5jb2xsZWN0aW9uLmRyb3BJbmRleGVzKCk7XHJcbiAgICBMb2dnZXIuZGIoXCJGaW5pc2hlZCByZXNldHRpbmcgaW5kZXhcIik7XHJcbiAgICBMb2dnZXIuZGIoXCJTZWVkaW5nLi4uXCIpO1xyXG4gICAgY29uc3QgY3VycmVudFdlZWsgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgpKTtcclxuICAgIGNvbnN0IGNvbmZpZyA9IGF3YWl0IENvbmZpZ3VyYXRpb25zLmZpbmRPbmUoeyBuYW1lOiBcImxhc3Rfc3luY1wiIH0pO1xyXG4gICAgaWYgKGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZy52YWx1ZSA9IGN1cnJlbnRXZWVrLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgYXdhaXQgY29uZmlnLnNhdmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXdhaXQgQ29uZmlndXJhdGlvbnMuY3JlYXRlKHtcclxuICAgICAgICAgICAgbmFtZTogXCJsYXN0X3N5bmNcIixcclxuICAgICAgICAgICAgdmFsdWU6IGN1cnJlbnRXZWVrLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgTG9nZ2VyLmRiKFwiRmluaXNoZWQgc2VlZGluZ1wiKTtcclxuICAgIHByb2Nlc3MuZXhpdCgpO1xyXG59O1xyXG5pbml0KCk7Il19