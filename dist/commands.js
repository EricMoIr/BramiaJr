"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var util = _interopRequireWildcard(require("discordUtil"));

var guildService = _interopRequireWildcard(require("services/guild"));

var userService = _interopRequireWildcard(require("services/user"));

var messageService = _interopRequireWildcard(require("services/message"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var help = {
  name: "help",
  description: "help shows information about other commands",
  execute: function () {
    var _execute = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(message) {
      var params, command;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = util.getParams(message);

              if (!(!Array.isArray(params) || params.length === 0)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", message.reply("help should be followed by a command. Usage: help setchannel"));

            case 3:
              command = commandsList.find(function (c) {
                return params[0].toLowerCase() === c.name.toLowerCase();
              });

              if (!command) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", message.reply(command.description));

            case 6:
              return _context.abrupt("return", message.reply("help should be followed by a command. Usage: help setchannel"));

            case 7:
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
var inactives = {
  name: "inactives",
  description: "inactives shows the members with the lowest activity",
  execute: function () {
    var _execute2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(message) {
      var users, content;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return userService.getInactiveUsers(message.guild.id);

            case 2:
              users = _context2.sent;
              content = "Least active members\nRank | Name | Score\n\n";
              users.forEach(function (user, i) {
                content += "#".concat(i + 1, ": ").concat(user.username, " | ").concat(user.points, " points\n");
              });
              return _context2.abrupt("return", message.channel.send(content, {
                code: true
              }));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function execute(_x2) {
      return _execute2.apply(this, arguments);
    }

    return execute;
  }()
};
var top = {
  name: "top",
  description: "top shows the top 10 members based on activity",
  execute: function () {
    var _execute3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(message) {
      var users, content;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return userService.getMostActiveUsers(message.guild.id, 10);

            case 2:
              users = _context3.sent;
              content = "Most active members\nRank | Name | Score\n\n";
              users.forEach(function (user, i) {
                content += "#".concat(i + 1, ": ").concat(user.username, " | ").concat(user.points, " points\n");
              });
              return _context3.abrupt("return", message.channel.send(content, {
                code: true
              }));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function execute(_x3) {
      return _execute3.apply(this, arguments);
    }

    return execute;
  }()
};

function setDefaultChannel(_x4, _x5) {
  return _setDefaultChannel.apply(this, arguments);
}

function _setDefaultChannel() {
  _setDefaultChannel = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(channel, message) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!(channel[1].type !== "text" || !channel[1].permissionsFor(message.guild.me).has("SEND_MESSAGES"))) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt("return", message.reply("I can't send messages in that channel"));

          case 2:
            _context6.next = 4;
            return guildService.setDefaultChannel(message.guild.id, channel[1]);

          case 4:
            return _context6.abrupt("return", message.reply("Setting ".concat(channel[1], " for welcome and leaving messages")));

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _setDefaultChannel.apply(this, arguments);
}

var setChannel = {
  name: "setchannel",
  description: "setchannel sets the default channel where I should send welcome/leaving messages",
  execute: function () {
    var _execute4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(message) {
      var params, channel, snowflake, _channel;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              params = util.getParams(message);

              if (!(params.length === 0)) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", message.reply("setchannel should be followed by the name of the channel. Usage: setchannel ".concat(message.channel)));

            case 3:
              if (!(params[0][0] !== "<")) {
                _context4.next = 10;
                break;
              }

              // It's a channel name
              channel = message.guild.channels.find(function (c) {
                return c[1].name === params[0];
              });

              if (!channel) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", setDefaultChannel(channel, message));

            case 7:
              return _context4.abrupt("return", message.reply("I couldn't find that channel"));

            case 10:
              // It's a channel tag
              snowflake = params[0].substring(2, params[0].length - 1);
              _channel = message.guild.channels.find(function (c) {
                return c[0] === snowflake;
              });

              if (!_channel) {
                _context4.next = 14;
                break;
              }

              return _context4.abrupt("return", setDefaultChannel(_channel, message));

            case 14:
              return _context4.abrupt("return", message.reply("I couldn't find that channel"));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function execute(_x6) {
      return _execute4.apply(this, arguments);
    }

    return execute;
  }()
};
var saveMessages = {
  name: "saveMessages",
  description: "You shouldn't be seeing this",
  execute: function () {
    var _execute5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(_) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", messageService.saveMessages());

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function execute(_x7) {
      return _execute5.apply(this, arguments);
    }

    return execute;
  }()
};
var commandsList = [setChannel, inactives, top];

var _default = [help, saveMessages].concat(commandsList);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tYW5kcy50cyJdLCJuYW1lcyI6WyJoZWxwIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiZXhlY3V0ZSIsIm1lc3NhZ2UiLCJwYXJhbXMiLCJ1dGlsIiwiZ2V0UGFyYW1zIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwicmVwbHkiLCJjb21tYW5kIiwiY29tbWFuZHNMaXN0IiwiZmluZCIsImMiLCJ0b0xvd2VyQ2FzZSIsImluYWN0aXZlcyIsInVzZXJTZXJ2aWNlIiwiZ2V0SW5hY3RpdmVVc2VycyIsImd1aWxkIiwiaWQiLCJ1c2VycyIsImNvbnRlbnQiLCJmb3JFYWNoIiwidXNlciIsImkiLCJ1c2VybmFtZSIsInBvaW50cyIsImNoYW5uZWwiLCJzZW5kIiwiY29kZSIsInRvcCIsImdldE1vc3RBY3RpdmVVc2VycyIsInNldERlZmF1bHRDaGFubmVsIiwidHlwZSIsInBlcm1pc3Npb25zRm9yIiwibWUiLCJoYXMiLCJndWlsZFNlcnZpY2UiLCJzZXRDaGFubmVsIiwiY2hhbm5lbHMiLCJzbm93Zmxha2UiLCJzdWJzdHJpbmciLCJzYXZlTWVzc2FnZXMiLCJfIiwibWVzc2FnZVNlcnZpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFTQSxJQUFNQSxJQUFjLEdBQUc7QUFDbkJDLEVBQUFBLElBQUksRUFBRSxNQURhO0FBRW5CQyxFQUFBQSxXQUFXLEVBQUUsNkNBRk07QUFHbkJDLEVBQUFBLE9BQU87QUFBQTtBQUFBO0FBQUEsNEJBQUUsaUJBQU9DLE9BQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0NDLGNBQUFBLE1BREQsR0FDVUMsSUFBSSxDQUFDQyxTQUFMLENBQWVILE9BQWYsQ0FEVjs7QUFBQSxvQkFHRCxDQUFDSSxLQUFLLENBQUNDLE9BQU4sQ0FBY0osTUFBZCxDQUFELElBQTBCQSxNQUFNLENBQUNLLE1BQVAsS0FBa0IsQ0FIM0M7QUFBQTtBQUFBO0FBQUE7O0FB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QTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFGOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBSG9CLENBQS9CO0FBUUEsSUFBTS9CLFlBQVksR0FBRyxDQUNqQjJCLFVBRGlCLEVBRWpCdkIsU0FGaUIsRUFHakJlLEdBSGlCLENBQXJCOztnQkFNZ0JoQyxJLEVBQU00QyxZLFNBQWlCL0IsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHV0aWwgZnJvbSBcImRpc2NvcmRVdGlsXCI7XHJcbmltcG9ydCAqIGFzIGd1aWxkU2VydmljZSBmcm9tIFwic2VydmljZXMvZ3VpbGRcIjtcclxuaW1wb3J0ICogYXMgdXNlclNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL3VzZXJcIjtcclxuaW1wb3J0ICogYXMgbWVzc2FnZVNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL21lc3NhZ2VcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcblxyXG50eXBlIENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgZXhlY3V0ZTogKF8gOiBNZXNzYWdlKSA9PiBQcm9taXNlPGFueT5cclxufTtcclxuXHJcbmNvbnN0IGhlbHAgOiBDb21tYW5kID0ge1xyXG4gICAgbmFtZTogXCJoZWxwXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJoZWxwIHNob3dzIGluZm9ybWF0aW9uIGFib3V0IG90aGVyIGNvbW1hbmRzXCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSA6IE1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSB1dGlsLmdldFBhcmFtcyhtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHBhcmFtcykgfHwgcGFyYW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcImhlbHAgc2hvdWxkIGJlIGZvbGxvd2VkIGJ5IGEgY29tbWFuZC4gVXNhZ2U6IGhlbHAgc2V0Y2hhbm5lbFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRzTGlzdC5maW5kKFxyXG4gICAgICAgICAgICAoYykgPT4gcGFyYW1zWzBdLnRvTG93ZXJDYXNlKCkgPT09IGMubmFtZS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGNvbW1hbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoY29tbWFuZC5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiaGVscCBzaG91bGQgYmUgZm9sbG93ZWQgYnkgYSBjb21tYW5kLiBVc2FnZTogaGVscCBzZXRjaGFubmVsXCIpO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmNvbnN0IGluYWN0aXZlcyA6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcImluYWN0aXZlc1wiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiaW5hY3RpdmVzIHNob3dzIHRoZSBtZW1iZXJzIHdpdGggdGhlIGxvd2VzdCBhY3Rpdml0eVwiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldEluYWN0aXZlVXNlcnMobWVzc2FnZS5ndWlsZC5pZCk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBgTGVhc3QgYWN0aXZlIG1lbWJlcnNcclxuUmFuayB8IE5hbWUgfCBTY29yZVxcblxcbmA7XHJcbiAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlciwgaSkgPT4ge1xyXG4gICAgICAgICAgICBjb250ZW50ICs9IGAjJHtpICsgMX06ICR7dXNlci51c2VybmFtZX0gfCAke3VzZXIucG9pbnRzfSBwb2ludHNcXG5gO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoY29udGVudCwgeyBjb2RlOiB0cnVlIH0pO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmNvbnN0IHRvcCA6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcInRvcFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwidG9wIHNob3dzIHRoZSB0b3AgMTAgbWVtYmVycyBiYXNlZCBvbiBhY3Rpdml0eVwiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldE1vc3RBY3RpdmVVc2VycyhtZXNzYWdlLmd1aWxkLmlkLCAxMCk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBgTW9zdCBhY3RpdmUgbWVtYmVyc1xyXG5SYW5rIHwgTmFtZSB8IFNjb3JlXFxuXFxuYDtcclxuICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgKz0gYCMke2kgKyAxfTogJHt1c2VyLnVzZXJuYW1lfSB8ICR7dXNlci5wb2ludHN9IHBvaW50c1xcbmA7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChjb250ZW50LCB7IGNvZGU6IHRydWUgfSk7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2V0RGVmYXVsdENoYW5uZWwoY2hhbm5lbCwgbWVzc2FnZSkge1xyXG4gICAgaWYgKGNoYW5uZWxbMV0udHlwZSAhPT0gXCJ0ZXh0XCIgfHwgIWNoYW5uZWxbMV0ucGVybWlzc2lvbnNGb3IobWVzc2FnZS5ndWlsZC5tZSkuaGFzKFwiU0VORF9NRVNTQUdFU1wiKSkge1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiSSBjYW4ndCBzZW5kIG1lc3NhZ2VzIGluIHRoYXQgY2hhbm5lbFwiKTtcclxuICAgIH1cclxuICAgIGF3YWl0IGd1aWxkU2VydmljZS5zZXREZWZhdWx0Q2hhbm5lbChtZXNzYWdlLmd1aWxkLmlkLCBjaGFubmVsWzFdKTtcclxuICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBTZXR0aW5nICR7Y2hhbm5lbFsxXX0gZm9yIHdlbGNvbWUgYW5kIGxlYXZpbmcgbWVzc2FnZXNgKTtcclxufVxyXG5cclxuY29uc3Qgc2V0Q2hhbm5lbCA6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcInNldGNoYW5uZWxcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcInNldGNoYW5uZWwgc2V0cyB0aGUgZGVmYXVsdCBjaGFubmVsIHdoZXJlIEkgc2hvdWxkIHNlbmQgd2VsY29tZS9sZWF2aW5nIG1lc3NhZ2VzXCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHV0aWwuZ2V0UGFyYW1zKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgc2V0Y2hhbm5lbCBzaG91bGQgYmUgZm9sbG93ZWQgYnkgdGhlIG5hbWUgb2YgdGhlIGNoYW5uZWwuIFVzYWdlOiBzZXRjaGFubmVsICR7bWVzc2FnZS5jaGFubmVsfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcmFtc1swXVswXSAhPT0gXCI8XCIpIHtcclxuICAgICAgICAgICAgLy8gSXQncyBhIGNoYW5uZWwgbmFtZVxyXG4gICAgICAgICAgICBjb25zdCBjaGFubmVsID0gbWVzc2FnZS5ndWlsZC5jaGFubmVscy5maW5kKFxyXG4gICAgICAgICAgICAgICAgKGMpID0+IGNbMV0ubmFtZSA9PT0gcGFyYW1zWzBdLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoY2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldERlZmF1bHRDaGFubmVsKGNoYW5uZWwsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiSSBjb3VsZG4ndCBmaW5kIHRoYXQgY2hhbm5lbFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBJdCdzIGEgY2hhbm5lbCB0YWdcclxuICAgICAgICAgICAgY29uc3Qgc25vd2ZsYWtlID0gcGFyYW1zWzBdLnN1YnN0cmluZygyLCBwYXJhbXNbMF0ubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWwgPSBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAoYykgPT4gY1swXSA9PT0gc25vd2ZsYWtlLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoY2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldERlZmF1bHRDaGFubmVsKGNoYW5uZWwsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiSSBjb3VsZG4ndCBmaW5kIHRoYXQgY2hhbm5lbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3Qgc2F2ZU1lc3NhZ2VzIDogQ29tbWFuZCA9IHtcclxuICAgIG5hbWU6IFwic2F2ZU1lc3NhZ2VzXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJZb3Ugc2hvdWxkbid0IGJlIHNlZWluZyB0aGlzXCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAoXykgPT4ge1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlU2VydmljZS5zYXZlTWVzc2FnZXMoKTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBjb21tYW5kc0xpc3QgPSBbXHJcbiAgICBzZXRDaGFubmVsLFxyXG4gICAgaW5hY3RpdmVzLFxyXG4gICAgdG9wLFxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgW2hlbHAsIHNhdmVNZXNzYWdlcywgLi4uY29tbWFuZHNMaXN0XTtcclxuIl19