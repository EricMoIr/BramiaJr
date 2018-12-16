"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var userService = _interopRequireWildcard(require("services/user"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var inactives = {
  name: "inactives",
  description: "Shows the members with the lowest activity this week",
  execute: function () {
    var _execute = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(message) {
      var users, content;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return userService.getInactiveUsersThisWeek(message.guild.id, 10);

            case 2:
              users = _context.sent;

              if (users.length) {
                content = "Least active members\nRank | Name | Score\n\n";
                users.forEach(function (user, i) {
                  content += "#".concat(i + 1, ": ").concat(user.username, " | ").concat(user.pointsWeekly, " points\n");
                });
              } else {
                content = "There are no inactive members this week. Congratulations!";
              }

              return _context.abrupt("return", message.channel.send(content, {
                code: true
              }));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function execute(_x) {
      return _execute.apply(this, arguments);
    }

    return execute;
  }()
};
var _default = inactives;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9pbmFjdGl2ZXMudHMiXSwibmFtZXMiOlsiaW5hY3RpdmVzIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiZXhlY3V0ZSIsIm1lc3NhZ2UiLCJ1c2VyU2VydmljZSIsImdldEluYWN0aXZlVXNlcnNUaGlzV2VlayIsImd1aWxkIiwiaWQiLCJ1c2VycyIsImxlbmd0aCIsImNvbnRlbnQiLCJmb3JFYWNoIiwidXNlciIsImkiLCJ1c2VybmFtZSIsInBvaW50c1dlZWtseSIsImNoYW5uZWwiLCJzZW5kIiwiY29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLFNBQW1CLEdBQUc7QUFDeEJDLEVBQUFBLElBQUksRUFBRSxXQURrQjtBQUV4QkMsRUFBQUEsV0FBVyxFQUFFLHNEQUZXO0FBR3hCQyxFQUFBQSxPQUFPO0FBQUE7QUFBQTtBQUFBLDRCQUFFLGlCQUFPQyxPQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ2VDLFdBQVcsQ0FBQ0Msd0JBQVosQ0FBcUNGLE9BQU8sQ0FBQ0csS0FBUixDQUFjQyxFQUFuRCxFQUF1RCxFQUF2RCxDQURmOztBQUFBO0FBQ0NDLGNBQUFBLEtBREQ7O0FBR0wsa0JBQUlBLEtBQUssQ0FBQ0MsTUFBVixFQUFrQjtBQUNkQyxnQkFBQUEsT0FBTyxrREFBUDtBQUVBRixnQkFBQUEsS0FBSyxDQUFDRyxPQUFOLENBQWMsVUFBQ0MsSUFBRCxFQUFPQyxDQUFQLEVBQWE7QUFDdkJILGtCQUFBQSxPQUFPLGVBQVFHLENBQUMsR0FBRyxDQUFaLGVBQWtCRCxJQUFJLENBQUNFLFFBQXZCLGdCQUFxQ0YsSUFBSSxDQUFDRyxZQUExQyxjQUFQO0FBQ0gsaUJBRkQ7QUFHSCxlQU5ELE1BTU87QUFDSEwsZ0JBQUFBLE9BQU8sR0FBRywyREFBVjtBQUNIOztBQVhJLCtDQWFFUCxPQUFPLENBQUNhLE9BQVIsQ0FBZ0JDLElBQWhCLENBQXFCUCxPQUFyQixFQUE4QjtBQUFFUSxnQkFBQUEsSUFBSSxFQUFFO0FBQVIsZUFBOUIsQ0FiRjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFGOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBSGlCLENBQTVCO2VBb0JlbkIsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiZG9tYWluL3R5cGVzXCI7XHJcbmltcG9ydCAqIGFzIHVzZXJTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy91c2VyXCI7XHJcblxyXG5jb25zdCBpbmFjdGl2ZXMgOiBDb21tYW5kID0ge1xyXG4gICAgbmFtZTogXCJpbmFjdGl2ZXNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3dzIHRoZSBtZW1iZXJzIHdpdGggdGhlIGxvd2VzdCBhY3Rpdml0eSB0aGlzIHdlZWtcIixcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCB1c2VyU2VydmljZS5nZXRJbmFjdGl2ZVVzZXJzVGhpc1dlZWsobWVzc2FnZS5ndWlsZC5pZCwgMTApO1xyXG4gICAgICAgIGxldCBjb250ZW50O1xyXG4gICAgICAgIGlmICh1c2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IGBMZWFzdCBhY3RpdmUgbWVtYmVyc1xyXG5SYW5rIHwgTmFtZSB8IFNjb3JlXFxuXFxuYDtcclxuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlciwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPSBgIyR7aSArIDF9OiAke3VzZXIudXNlcm5hbWV9IHwgJHt1c2VyLnBvaW50c1dlZWtseX0gcG9pbnRzXFxuYDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGVudCA9IFwiVGhlcmUgYXJlIG5vIGluYWN0aXZlIG1lbWJlcnMgdGhpcyB3ZWVrLiBDb25ncmF0dWxhdGlvbnMhXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoY29udGVudCwgeyBjb2RlOiB0cnVlIH0pO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluYWN0aXZlczsiXX0=