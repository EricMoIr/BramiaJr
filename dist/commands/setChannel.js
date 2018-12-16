"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var guildService = _interopRequireWildcard(require("services/guild"));

var utils = _interopRequireWildcard(require("discordUtil"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PREFIX = process.env.PREFIX;

function setDefaultChannel(_x, _x2) {
  return _setDefaultChannel.apply(this, arguments);
}

function _setDefaultChannel() {
  _setDefaultChannel = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(channel, message) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(channel[1].type !== "text" || !channel[1].permissionsFor(message.guild.me).has("SEND_MESSAGES"))) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", message.reply("I can't send messages in that channel"));

          case 2:
            _context2.next = 4;
            return guildService.setDefaultChannel(message.guild.id, channel[1]);

          case 4:
            return _context2.abrupt("return", message.reply("Setting ".concat(channel[1], " for welcome and leaving messages")));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _setDefaultChannel.apply(this, arguments);
}

var setChannel = {
  name: "setchannel",
  description: "Sets the default channel where I should send welcome/leaving messages",
  execute: function () {
    var _execute = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(message, params) {
      var channel;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (params.length) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", message.reply("".concat(PREFIX, "setchannel should be followed by the name of the channel. Usage: ").concat(PREFIX, "setchannel ").concat(message.channel)));

            case 2:
              _context.next = 4;
              return utils.findChannel(params[0], message.guild.channels);

            case 4:
              channel = _context.sent;

              if (!channel) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", setDefaultChannel(channel, message));

            case 7:
              return _context.abrupt("return", message.reply("I couldn't find that channel"));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function execute(_x3, _x4) {
      return _execute.apply(this, arguments);
    }

    return execute;
  }()
};
var _default = setChannel;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zZXRDaGFubmVsLnRzIl0sIm5hbWVzIjpbIlBSRUZJWCIsInByb2Nlc3MiLCJlbnYiLCJzZXREZWZhdWx0Q2hhbm5lbCIsImNoYW5uZWwiLCJtZXNzYWdlIiwidHlwZSIsInBlcm1pc3Npb25zRm9yIiwiZ3VpbGQiLCJtZSIsImhhcyIsInJlcGx5IiwiZ3VpbGRTZXJ2aWNlIiwiaWQiLCJzZXRDaGFubmVsIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiZXhlY3V0ZSIsInBhcmFtcyIsImxlbmd0aCIsInV0aWxzIiwiZmluZENoYW5uZWwiLCJjaGFubmVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOzs7Ozs7OztJQUVRQSxNLEdBQVdDLE9BQU8sQ0FBQ0MsRyxDQUFuQkYsTTs7U0FFT0csaUI7Ozs7Ozs7MEJBQWYsa0JBQWlDQyxPQUFqQyxFQUEwQ0MsT0FBMUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNRRCxPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdFLElBQVgsS0FBb0IsTUFBcEIsSUFBOEIsQ0FBQ0YsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXRyxjQUFYLENBQTBCRixPQUFPLENBQUNHLEtBQVIsQ0FBY0MsRUFBeEMsRUFBNENDLEdBQTVDLENBQWdELGVBQWhELENBRHZDO0FBQUE7QUFBQTtBQUFBOztBQUFBLDhDQUVlTCxPQUFPLENBQUNNLEtBQVIsQ0FBYyx1Q0FBZCxDQUZmOztBQUFBO0FBQUE7QUFBQSxtQkFJVUMsWUFBWSxDQUFDVCxpQkFBYixDQUErQkUsT0FBTyxDQUFDRyxLQUFSLENBQWNLLEVBQTdDLEVBQWlEVCxPQUFPLENBQUMsQ0FBRCxDQUF4RCxDQUpWOztBQUFBO0FBQUEsOENBS1dDLE9BQU8sQ0FBQ00sS0FBUixtQkFBeUJQLE9BQU8sQ0FBQyxDQUFELENBQWhDLHVDQUxYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUFRQSxJQUFNVSxVQUFtQixHQUFHO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsWUFEa0I7QUFFeEJDLEVBQUFBLFdBQVcsRUFBRSx1RUFGVztBQUd4QkMsRUFBQUEsT0FBTztBQUFBO0FBQUE7QUFBQSw0QkFBRSxpQkFBT1osT0FBUCxFQUFnQmEsTUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQ0FBLE1BQU0sQ0FBQ0MsTUFEUDtBQUFBO0FBQUE7QUFBQTs7QUFBQSwrQ0FFTWQsT0FBTyxDQUFDTSxLQUFSLFdBQWlCWCxNQUFqQiw4RUFBMkZBLE1BQTNGLHdCQUErR0ssT0FBTyxDQUFDRCxPQUF2SCxFQUZOOztBQUFBO0FBQUE7QUFBQSxxQkFJaUJnQixLQUFLLENBQUNDLFdBQU4sQ0FBa0JILE1BQU0sQ0FBQyxDQUFELENBQXhCLEVBQTZCYixPQUFPLENBQUNHLEtBQVIsQ0FBY2MsUUFBM0MsQ0FKakI7O0FBQUE7QUFJQ2xCLGNBQUFBLE9BSkQ7O0FBQUEsbUJBTURBLE9BTkM7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBT01ELGlCQUFpQixDQUFDQyxPQUFELEVBQVVDLE9BQVYsQ0FQdkI7O0FBQUE7QUFBQSwrQ0FTRUEsT0FBTyxDQUFDTSxLQUFSLENBQWMsOEJBQWQsQ0FURjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFGOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBSGlCLENBQTVCO2VBZ0JlRyxVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCJkb21haW4vdHlwZXNcIjtcclxuaW1wb3J0ICogYXMgZ3VpbGRTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy9ndWlsZFwiO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiZGlzY29yZFV0aWxcIjtcclxuXHJcbmNvbnN0IHsgUFJFRklYIH0gPSBwcm9jZXNzLmVudjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNldERlZmF1bHRDaGFubmVsKGNoYW5uZWwsIG1lc3NhZ2UpIHtcclxuICAgIGlmIChjaGFubmVsWzFdLnR5cGUgIT09IFwidGV4dFwiIHx8ICFjaGFubmVsWzFdLnBlcm1pc3Npb25zRm9yKG1lc3NhZ2UuZ3VpbGQubWUpLmhhcyhcIlNFTkRfTUVTU0FHRVNcIikpIHtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcIkkgY2FuJ3Qgc2VuZCBtZXNzYWdlcyBpbiB0aGF0IGNoYW5uZWxcIik7XHJcbiAgICB9XHJcbiAgICBhd2FpdCBndWlsZFNlcnZpY2Uuc2V0RGVmYXVsdENoYW5uZWwobWVzc2FnZS5ndWlsZC5pZCwgY2hhbm5lbFsxXSk7XHJcbiAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgU2V0dGluZyAke2NoYW5uZWxbMV19IGZvciB3ZWxjb21lIGFuZCBsZWF2aW5nIG1lc3NhZ2VzYCk7XHJcbn1cclxuXHJcbmNvbnN0IHNldENoYW5uZWw6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcInNldGNoYW5uZWxcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNldHMgdGhlIGRlZmF1bHQgY2hhbm5lbCB3aGVyZSBJIHNob3VsZCBzZW5kIHdlbGNvbWUvbGVhdmluZyBtZXNzYWdlc1wiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UsIHBhcmFtcykgPT4ge1xyXG4gICAgICAgIGlmICghcGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgJHtQUkVGSVh9c2V0Y2hhbm5lbCBzaG91bGQgYmUgZm9sbG93ZWQgYnkgdGhlIG5hbWUgb2YgdGhlIGNoYW5uZWwuIFVzYWdlOiAke1BSRUZJWH1zZXRjaGFubmVsICR7bWVzc2FnZS5jaGFubmVsfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjaGFubmVsID0gYXdhaXQgdXRpbHMuZmluZENoYW5uZWwocGFyYW1zWzBdLCBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzKTtcclxuXHJcbiAgICAgICAgaWYgKGNoYW5uZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNldERlZmF1bHRDaGFubmVsKGNoYW5uZWwsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcIkkgY291bGRuJ3QgZmluZCB0aGF0IGNoYW5uZWxcIik7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2V0Q2hhbm5lbDsiXX0=