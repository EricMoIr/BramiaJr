"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var guildService = _interopRequireWildcard(require("services/guild"));

var _messages = _interopRequireDefault(require("messages/messages"));

var utils = _interopRequireWildcard(require("discordUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PREFIX = process.env.PREFIX;
var meetingCommands = {
  name: "meeting",
  description: "".concat(PREFIX, "meeting starts unlocks the meeting channel and ").concat(PREFIX, "meeting in <channel_name> sets <channel_name> to be the meeting channel, locking it until a meeting starts"),
  execute: function () {
    var _execute = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(message, params) {
      var channel, _channel, _channel2;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (guildService.canManageMeetings(message.author, message.guild)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", message.reply(_messages.default.your_permissions));

            case 2:
              if (params.length) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", message.reply(_messages.default.meeting_missing_params(PREFIX)));

            case 4:
              if (!(params[0].toLowerCase() === "in")) {
                _context.next = 17;
                break;
              }

              if (!(params.length < 2)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", message.reply(_messages.default.meeting_missing_params(PREFIX)));

            case 7:
              channel = utils.findChannel(params[1], message.guild.channels);

              if (!channel) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return guildService.setMeetingChannel(channel);

            case 11:
              if (_context.sent) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", message.reply(_messages.default.my_permissions));

            case 13:
              return _context.abrupt("return", message.reply("Setting ".concat(channel, " as meeting channel")));

            case 14:
              return _context.abrupt("return", message.reply("I couldn't find that channel"));

            case 17:
              if (!(params[0].toLowerCase() === "starts")) {
                _context.next = 30;
                break;
              }

              _context.next = 20;
              return guildService.getMeetingChannel(message.guild.id);

            case 20:
              _channel = _context.sent;

              if (_channel) {
                _context.next = 23;
                break;
              }

              return _context.abrupt("return", message.reply("You should try setting up a meeting channel first with ".concat(PREFIX, "meeting in <channel_name>")));

            case 23:
              _context.next = 25;
              return guildService.unlockMeetingChannel(message.guild.id);

            case 25:
              if (_context.sent) {
                _context.next = 27;
                break;
              }

              return _context.abrupt("return", message.reply(_messages.default.my_permissions));

            case 27:
              return _context.abrupt("return", message.reply("The meeting has started at ".concat(_channel.name, "!")));

            case 30:
              if (!(params[0].toLowerCase() === "ends")) {
                _context.next = 41;
                break;
              }

              _context.next = 33;
              return guildService.getMeetingChannel(message.guild.id);

            case 33:
              _channel2 = _context.sent;

              if (_channel2) {
                _context.next = 36;
                break;
              }

              return _context.abrupt("return", message.reply("You should try setting up a meeting channel first with ".concat(PREFIX, "meeting in <channel_name>")));

            case 36:
              _context.next = 38;
              return guildService.lockMeetingChannel(message.guild.id);

            case 38:
              if (_context.sent) {
                _context.next = 40;
                break;
              }

              return _context.abrupt("return", message.reply(_messages.default.my_permissions));

            case 40:
              return _context.abrupt("return", message.reply("The meeting at ".concat(_channel2.name, " has ended!")));

            case 41:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function execute(_x, _x2) {
      return _execute.apply(this, arguments);
    }

    return execute;
  }()
};
var _default = meetingCommands;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9tZWV0aW5nLnRzIl0sIm5hbWVzIjpbIlBSRUZJWCIsInByb2Nlc3MiLCJlbnYiLCJtZWV0aW5nQ29tbWFuZHMiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJleGVjdXRlIiwibWVzc2FnZSIsInBhcmFtcyIsImd1aWxkU2VydmljZSIsImNhbk1hbmFnZU1lZXRpbmdzIiwiYXV0aG9yIiwiZ3VpbGQiLCJyZXBseSIsIk1lc3NhZ2VzIiwieW91cl9wZXJtaXNzaW9ucyIsImxlbmd0aCIsIm1lZXRpbmdfbWlzc2luZ19wYXJhbXMiLCJ0b0xvd2VyQ2FzZSIsImNoYW5uZWwiLCJ1dGlscyIsImZpbmRDaGFubmVsIiwiY2hhbm5lbHMiLCJzZXRNZWV0aW5nQ2hhbm5lbCIsIm15X3Blcm1pc3Npb25zIiwiZ2V0TWVldGluZ0NoYW5uZWwiLCJpZCIsInVubG9ja01lZXRpbmdDaGFubmVsIiwibG9ja01lZXRpbmdDaGFubmVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFUUEsTSxHQUFXQyxPQUFPLENBQUNDLEcsQ0FBbkJGLE07QUFFUixJQUFNRyxlQUF3QixHQUFHO0FBQzdCQyxFQUFBQSxJQUFJLEVBQUUsU0FEdUI7QUFFN0JDLEVBQUFBLFdBQVcsWUFBS0wsTUFBTCw0REFBNkRBLE1BQTdELCtHQUZrQjtBQUc3Qk0sRUFBQUEsT0FBTztBQUFBO0FBQUE7QUFBQSw0QkFBRSxpQkFBT0MsT0FBUCxFQUFnQkMsTUFBaEI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNBQyxZQUFZLENBQUNDLGlCQUFiLENBQStCSCxPQUFPLENBQUNJLE1BQXZDLEVBQStDSixPQUFPLENBQUNLLEtBQXZELENBREE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBRU1MLE9BQU8sQ0FBQ00sS0FBUixDQUFjQyxrQkFBU0MsZ0JBQXZCLENBRk47O0FBQUE7QUFBQSxrQkFJQVAsTUFBTSxDQUFDUSxN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bXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcImRvbWFpbi90eXBlc1wiO1xyXG5pbXBvcnQgKiBhcyBndWlsZFNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL2d1aWxkXCI7XHJcbmltcG9ydCBNZXNzYWdlcyBmcm9tIFwibWVzc2FnZXMvbWVzc2FnZXNcIjtcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcImRpc2NvcmRVdGlsXCI7XHJcblxyXG5jb25zdCB7IFBSRUZJWCB9ID0gcHJvY2Vzcy5lbnY7XHJcblxyXG5jb25zdCBtZWV0aW5nQ29tbWFuZHM6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcIm1lZXRpbmdcIixcclxuICAgIGRlc2NyaXB0aW9uOiBgJHtQUkVGSVh9bWVldGluZyBzdGFydHMgdW5sb2NrcyB0aGUgbWVldGluZyBjaGFubmVsIGFuZCAke1BSRUZJWH1tZWV0aW5nIGluIDxjaGFubmVsX25hbWU+IHNldHMgPGNoYW5uZWxfbmFtZT4gdG8gYmUgdGhlIG1lZXRpbmcgY2hhbm5lbCwgbG9ja2luZyBpdCB1bnRpbCBhIG1lZXRpbmcgc3RhcnRzYCxcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChtZXNzYWdlLCBwYXJhbXMpID0+IHtcclxuICAgICAgICBpZiAoIWd1aWxkU2VydmljZS5jYW5NYW5hZ2VNZWV0aW5ncyhtZXNzYWdlLmF1dGhvciwgbWVzc2FnZS5ndWlsZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoTWVzc2FnZXMueW91cl9wZXJtaXNzaW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShNZXNzYWdlcy5tZWV0aW5nX21pc3NpbmdfcGFyYW1zKFBSRUZJWCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyYW1zWzBdLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5cIikge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KE1lc3NhZ2VzLm1lZXRpbmdfbWlzc2luZ19wYXJhbXMoUFJFRklYKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgY2hhbm5lbCA9IHV0aWxzLmZpbmRDaGFubmVsKHBhcmFtc1sxXSwgbWVzc2FnZS5ndWlsZC5jaGFubmVscyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhd2FpdCBndWlsZFNlcnZpY2Uuc2V0TWVldGluZ0NoYW5uZWwoY2hhbm5lbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShNZXNzYWdlcy5teV9wZXJtaXNzaW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgU2V0dGluZyAke2NoYW5uZWx9IGFzIG1lZXRpbmcgY2hhbm5lbGApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiSSBjb3VsZG4ndCBmaW5kIHRoYXQgY2hhbm5lbFwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtc1swXS50b0xvd2VyQ2FzZSgpID09PSBcInN0YXJ0c1wiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBndWlsZFNlcnZpY2UuZ2V0TWVldGluZ0NoYW5uZWwobWVzc2FnZS5ndWlsZC5pZCk7XHJcbiAgICAgICAgICAgIGlmICghY2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYFlvdSBzaG91bGQgdHJ5IHNldHRpbmcgdXAgYSBtZWV0aW5nIGNoYW5uZWwgZmlyc3Qgd2l0aCAke1BSRUZJWH1tZWV0aW5nIGluIDxjaGFubmVsX25hbWU+YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFhd2FpdCBndWlsZFNlcnZpY2UudW5sb2NrTWVldGluZ0NoYW5uZWwobWVzc2FnZS5ndWlsZC5pZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KE1lc3NhZ2VzLm15X3Blcm1pc3Npb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgVGhlIG1lZXRpbmcgaGFzIHN0YXJ0ZWQgYXQgJHtjaGFubmVsLm5hbWV9IWApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFyYW1zWzBdLnRvTG93ZXJDYXNlKCkgPT09IFwiZW5kc1wiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBndWlsZFNlcnZpY2UuZ2V0TWVldGluZ0NoYW5uZWwobWVzc2FnZS5ndWlsZC5pZCk7XHJcbiAgICAgICAgICAgIGlmICghY2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYFlvdSBzaG91bGQgdHJ5IHNldHRpbmcgdXAgYSBtZWV0aW5nIGNoYW5uZWwgZmlyc3Qgd2l0aCAke1BSRUZJWH1tZWV0aW5nIGluIDxjaGFubmVsX25hbWU+YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFhd2FpdCBndWlsZFNlcnZpY2UubG9ja01lZXRpbmdDaGFubmVsKG1lc3NhZ2UuZ3VpbGQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShNZXNzYWdlcy5teV9wZXJtaXNzaW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYFRoZSBtZWV0aW5nIGF0ICR7Y2hhbm5lbC5uYW1lfSBoYXMgZW5kZWQhYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1lZXRpbmdDb21tYW5kczsiXX0=