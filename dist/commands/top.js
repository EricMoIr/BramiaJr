"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var userService = _interopRequireWildcard(require("services/user"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var top = {
  name: "top",
  description: "Shows the top 10 members based on this week's activity",
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
              return userService.getMostActiveUsersThisWeek(message.guild.id, 10);

            case 2:
              users = _context.sent;

              if (users.length) {
                content = "Most active members\nRank | Name | Score\n\n";
                users.forEach(function (user, i) {
                  content += "#".concat(i + 1, ": ").concat(user.username, " | ").concat(user.pointsWeekly, " points\n");
                });
              } else {
                // Shouldn't happen because I handle the message before running the command
                content = "There was no activity in the server this week.";
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
var _default = top;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy90b3AudHMiXSwibmFtZXMiOlsidG9wIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiZXhlY3V0ZSIsIm1lc3NhZ2UiLCJ1c2VyU2VydmljZSIsImdldE1vc3RBY3RpdmVVc2Vyc1RoaXNXZWVrIiwiZ3VpbGQiLCJpZCIsInVzZXJzIiwibGVuZ3RoIiwiY29udGVudCIsImZvckVhY2giLCJ1c2VyIiwiaSIsInVzZXJuYW1lIiwicG9pbnRzV2Vla2x5IiwiY2hhbm5lbCIsInNlbmQiLCJjb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsR0FBYSxHQUFJO0FBQ25CQyxFQUFBQSxJQUFJLEVBQUUsS0FEYTtBQUVuQkMsRUFBQUEsV0FBVyxFQUFFLHdEQUZNO0FBR25CQyxFQUFBQSxPQUFPO0FBQUE7QUFBQTtBQUFBLDRCQUFFLGlCQUFPQyxPQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ2VDLFdBQVcsQ0FBQ0MsMEJBQVosQ0FBdUNGLE9BQU8sQ0FBQ0csS0FBUixDQUFjQyxFQUFyRCxFQUF5RCxFQUF6RCxDQURmOztBQUFBO0FBQ0NDLGNBQUFBLEtBREQ7O0FBR0wsa0JBQUlBLEtBQUssQ0FBQ0MsTUFBVixFQUFrQjtBQUNkQyxnQkFBQUEsT0FBTyxpREFBUDtBQUVBRixnQkFBQUEsS0FBSyxDQUFDRyxPQUFOLENBQWMsVUFBQ0MsSUFBRCxFQUFPQyxDQUFQLEVBQWE7QUFDdkJILGtCQUFBQSxPQUFPLGVBQVFHLENBQUMsR0FBRyxDQUFaLGVBQWtCRCxJQUFJLENBQUNFLFFBQXZCLGdCQUFxQ0YsSUFBSSxDQUFDRyxZQUExQyxjQUFQO0FBQ0gsaUJBRkQ7QUFHSCxlQU5ELE1BTU87QUFDSDtBQUNBTCxnQkFBQUEsT0FBTyxHQUFHLGdEQUFWO0FBQ0g7O0FBWkksK0NBY0VQLE9BQU8sQ0FBQ2EsT0FBUixDQUFnQkMsSUFBaEIsQ0FBcUJQLE9BQXJCLEVBQThCO0FBQUVRLGdCQUFBQSxJQUFJLEVBQUU7QUFBUixlQUE5QixDQWRGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFIWSxDQUF2QjtlQXFCZW5CLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcImRvbWFpbi90eXBlc1wiO1xyXG5pbXBvcnQgKiBhcyB1c2VyU2VydmljZSBmcm9tIFwic2VydmljZXMvdXNlclwiO1xyXG5cclxuY29uc3QgdG9wIDogQ29tbWFuZCAgPSB7XHJcbiAgICBuYW1lOiBcInRvcFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiU2hvd3MgdGhlIHRvcCAxMCBtZW1iZXJzIGJhc2VkIG9uIHRoaXMgd2VlaydzIGFjdGl2aXR5XCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0TW9zdEFjdGl2ZVVzZXJzVGhpc1dlZWsobWVzc2FnZS5ndWlsZC5pZCwgMTApO1xyXG4gICAgICAgIGxldCBjb250ZW50O1xyXG4gICAgICAgIGlmICh1c2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IGBNb3N0IGFjdGl2ZSBtZW1iZXJzXHJcblJhbmsgfCBOYW1lIHwgU2NvcmVcXG5cXG5gO1xyXG4gICAgICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9IGAjJHtpICsgMX06ICR7dXNlci51c2VybmFtZX0gfCAke3VzZXIucG9pbnRzV2Vla2x5fSBwb2ludHNcXG5gO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBTaG91bGRuJ3QgaGFwcGVuIGJlY2F1c2UgSSBoYW5kbGUgdGhlIG1lc3NhZ2UgYmVmb3JlIHJ1bm5pbmcgdGhlIGNvbW1hbmRcclxuICAgICAgICAgICAgY29udGVudCA9IFwiVGhlcmUgd2FzIG5vIGFjdGl2aXR5IGluIHRoZSBzZXJ2ZXIgdGhpcyB3ZWVrLlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGNvbnRlbnQsIHsgY29kZTogdHJ1ZSB9KTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0b3A7Il19