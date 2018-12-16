"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var userService = _interopRequireWildcard(require("services/user"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var topGlobal = {
  name: "topGlobal",
  description: "Shows the top 10 members based on activity",
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
              return userService.getMostActiveUsers(message.guild.id, 10);

            case 2:
              users = _context.sent;

              if (users.length) {
                content = "Most active members\nRank | Name | Score\n\n";
                users.forEach(function (user, i) {
                  content += "#".concat(i + 1, ": ").concat(user.username, " | ").concat(user.points, " points\n");
                });
              } else {
                // Shouldn't happen because I handle the message before running the command
                content = "There was no activity in the server... Ever.";
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
var _default = topGlobal;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy90b3BHbG9iYWwudHMiXSwibmFtZXMiOlsidG9wR2xvYmFsIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiZXhlY3V0ZSIsIm1lc3NhZ2UiLCJ1c2VyU2VydmljZSIsImdldE1vc3RBY3RpdmVVc2VycyIsImd1aWxkIiwiaWQiLCJ1c2VycyIsImxlbmd0aCIsImNvbnRlbnQiLCJmb3JFYWNoIiwidXNlciIsImkiLCJ1c2VybmFtZSIsInBvaW50cyIsImNoYW5uZWwiLCJzZW5kIiwiY29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLFNBQW1CLEdBQUk7QUFDekJDLEVBQUFBLElBQUksRUFBRSxXQURtQjtBQUV6QkMsRUFBQUEsV0FBVyxFQUFFLDRDQUZZO0FBR3pCQyxFQUFBQSxPQUFPO0FBQUE7QUFBQTtBQUFBLDRCQUFFLGlCQUFPQyxPQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ2VDLFdBQVcsQ0FBQ0Msa0JBQVosQ0FBK0JGLE9BQU8sQ0FBQ0csS0FBUixDQUFjQyxFQUE3QyxFQUFpRCxFQUFqRCxDQURmOztBQUFBO0FBQ0NDLGNBQUFBLEtBREQ7O0FBR0wsa0JBQUlBLEtBQUssQ0FBQ0MsTUFBVixFQUFrQjtBQUNkQyxnQkFBQUEsT0FBTyxpREFBUDtBQUVBRixnQkFBQUEsS0FBSyxDQUFDRyxPQUFOLENBQWMsVUFBQ0MsSUFBRCxFQUFPQyxDQUFQLEVBQWE7QUFDdkJILGtCQUFBQSxPQUFPLGVBQVFHLENBQUMsR0FBRyxDQUFaLGVBQWtCRCxJQUFJLENBQUNFLFFBQXZCLGdCQUFxQ0YsSUFBSSxDQUFDRyxNQUExQyxjQUFQO0FBQ0gsaUJBRkQ7QUFHSCxlQU5ELE1BTU87QUFDSDtBQUNBTCxnQkFBQUEsT0FBTyxHQUFHLDhDQUFWO0FBQ0g7O0FBWkksK0NBY0VQLE9BQU8sQ0FBQ2EsT0FBUixDQUFnQkMsSUFBaEIsQ0FBcUJQLE9BQXJCLEVBQThCO0FBQUVRLGdCQUFBQSxJQUFJLEVBQUU7QUFBUixlQUE5QixDQWRGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFIa0IsQ0FBN0I7ZUFxQmVuQixTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCJkb21haW4vdHlwZXNcIjtcclxuaW1wb3J0ICogYXMgdXNlclNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL3VzZXJcIjtcclxuXHJcbmNvbnN0IHRvcEdsb2JhbCA6IENvbW1hbmQgID0ge1xyXG4gICAgbmFtZTogXCJ0b3BHbG9iYWxcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3dzIHRoZSB0b3AgMTAgbWVtYmVycyBiYXNlZCBvbiBhY3Rpdml0eVwiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldE1vc3RBY3RpdmVVc2VycyhtZXNzYWdlLmd1aWxkLmlkLCAxMCk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ7XHJcbiAgICAgICAgaWYgKHVzZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gYE1vc3QgYWN0aXZlIG1lbWJlcnNcclxuUmFuayB8IE5hbWUgfCBTY29yZVxcblxcbmA7XHJcbiAgICAgICAgICAgIHVzZXJzLmZvckVhY2goKHVzZXIsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gYCMke2kgKyAxfTogJHt1c2VyLnVzZXJuYW1lfSB8ICR7dXNlci5wb2ludHN9IHBvaW50c1xcbmA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFNob3VsZG4ndCBoYXBwZW4gYmVjYXVzZSBJIGhhbmRsZSB0aGUgbWVzc2FnZSBiZWZvcmUgcnVubmluZyB0aGUgY29tbWFuZFxyXG4gICAgICAgICAgICBjb250ZW50ID0gXCJUaGVyZSB3YXMgbm8gYWN0aXZpdHkgaW4gdGhlIHNlcnZlci4uLiBFdmVyLlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGNvbnRlbnQsIHsgY29kZTogdHJ1ZSB9KTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0b3BHbG9iYWw7Il19