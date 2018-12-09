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
var commands = [help, saveMessages].concat(commandsList);
var _default = commands;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tYW5kcy50cyJdLCJuYW1lcyI6WyJoZWxwIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiZXhlY3V0ZSIsIm1lc3NhZ2UiLCJwYXJhbXMiLCJ1dGlsIiwiZ2V0UGFyYW1zIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwicmVwbHkiLCJjb21tYW5kIiwiY29tbWFuZHNMaXN0IiwiZmluZCIsImMiLCJ0b0xvd2VyQ2FzZSIsImluYWN0aXZlcyIsInVzZXJTZXJ2aWNlIiwiZ2V0SW5hY3RpdmVVc2VycyIsImd1aWxkIiwiaWQiLCJ1c2VycyIsImNvbnRlbnQiLCJmb3JFYWNoIiwidXNlciIsImkiLCJ1c2VybmFtZSIsInBvaW50cyIsImNoYW5uZWwiLCJzZW5kIiwiY29kZSIsInRvcCIsImdldE1vc3RBY3RpdmVVc2VycyIsInNldERlZmF1bHRDaGFubmVsIiwidHlwZSIsInBlcm1pc3Npb25zRm9yIiwibWUiLCJoYXMiLCJndWlsZFNlcnZpY2UiLCJzZXRDaGFubmVsIiwiY2hhbm5lbHMiLCJzbm93Zmxha2UiLCJzdWJzdHJpbmciLCJzYXZlTWVzc2FnZXMiLCJfIiwibWVzc2FnZVNlcnZpY2UiLCJjb21tYW5kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLElBQUksR0FBRztBQUNUQyxFQUFBQSxJQUFJLEVBQUUsTUFERztBQUVUQyxFQUFBQSxXQUFXLEVBQUUsNkNBRko7QUFHVEMsRUFBQUEsT0FBTztBQUFBO0FBQUE7QUFBQSw0QkFBRSxpQkFBT0MsT0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQ0MsY0FBQUEsTUFERCxHQUNVQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUgsT0FBZixDQURWOztBQUFBLG9CQUdELENBQUNJLEtBQUssQ0FBQ0MsT0FBTixDQUFjSixNQUFkLENBQUQsSUFBMEJBLE1BQU0sQ0FBQ0ssTUFBUCxLQUFrQixDQUgzQztBQUFBO0FBQUE7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O0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUhVLENBQXJCO0FBUUEsSUFBTS9CLFlBQVksR0FBRyxDQUNqQjJCLFVBRGlCLEVBRWpCdkIsU0FGaUIsRUFHakJlLEdBSGlCLENBQXJCO0FBTUEsSUFBTWUsUUFBUSxJQUFJL0MsSUFBSixFQUFVNEMsWUFBVixTQUEyQi9CLFlBQTNCLENBQWQ7ZUFFZWtDLFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJkaXNjb3JkVXRpbFwiO1xyXG5pbXBvcnQgKiBhcyBndWlsZFNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL2d1aWxkXCI7XHJcbmltcG9ydCAqIGFzIHVzZXJTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy91c2VyXCI7XHJcbmltcG9ydCAqIGFzIG1lc3NhZ2VTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy9tZXNzYWdlXCI7XHJcblxyXG5jb25zdCBoZWxwID0ge1xyXG4gICAgbmFtZTogXCJoZWxwXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJoZWxwIHNob3dzIGluZm9ybWF0aW9uIGFib3V0IG90aGVyIGNvbW1hbmRzXCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHV0aWwuZ2V0UGFyYW1zKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGFyYW1zKSB8fCBwYXJhbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiaGVscCBzaG91bGQgYmUgZm9sbG93ZWQgYnkgYSBjb21tYW5kLiBVc2FnZTogaGVscCBzZXRjaGFubmVsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjb21tYW5kID0gY29tbWFuZHNMaXN0LmZpbmQoXHJcbiAgICAgICAgICAgIChjKSA9PiBwYXJhbXNbMF0udG9Mb3dlckNhc2UoKSA9PT0gYy5uYW1lLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoY29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShjb21tYW5kLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJoZWxwIHNob3VsZCBiZSBmb2xsb3dlZCBieSBhIGNvbW1hbmQuIFVzYWdlOiBoZWxwIHNldGNoYW5uZWxcIik7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3QgaW5hY3RpdmVzID0ge1xyXG4gICAgbmFtZTogXCJpbmFjdGl2ZXNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcImluYWN0aXZlcyBzaG93cyB0aGUgbWVtYmVycyB3aXRoIHRoZSBsb3dlc3QgYWN0aXZpdHlcIixcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCB1c2VyU2VydmljZS5nZXRJbmFjdGl2ZVVzZXJzKG1lc3NhZ2UuZ3VpbGQuaWQpO1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gYExlYXN0IGFjdGl2ZSBtZW1iZXJzXHJcblJhbmsgfCBOYW1lIHwgU2NvcmVcXG5cXG5gO1xyXG4gICAgICAgIHVzZXJzLmZvckVhY2goKHVzZXIsIGkpID0+IHtcclxuICAgICAgICAgICAgY29udGVudCArPSBgIyR7aSArIDF9OiAke3VzZXIudXNlcm5hbWV9IHwgJHt1c2VyLnBvaW50c30gcG9pbnRzXFxuYDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGNvbnRlbnQsIHsgY29kZTogdHJ1ZSB9KTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCB0b3AgPSB7XHJcbiAgICBuYW1lOiBcInRvcFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwidG9wIHNob3dzIHRoZSB0b3AgMTAgbWVtYmVycyBiYXNlZCBvbiBhY3Rpdml0eVwiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldE1vc3RBY3RpdmVVc2VycyhtZXNzYWdlLmd1aWxkLmlkLCAxMCk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBgTW9zdCBhY3RpdmUgbWVtYmVyc1xyXG5SYW5rIHwgTmFtZSB8IFNjb3JlXFxuXFxuYDtcclxuICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgKz0gYCMke2kgKyAxfTogJHt1c2VyLnVzZXJuYW1lfSB8ICR7dXNlci5wb2ludHN9IHBvaW50c1xcbmA7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChjb250ZW50LCB7IGNvZGU6IHRydWUgfSk7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2V0RGVmYXVsdENoYW5uZWwoY2hhbm5lbCwgbWVzc2FnZSkge1xyXG4gICAgaWYgKGNoYW5uZWxbMV0udHlwZSAhPT0gXCJ0ZXh0XCIgfHwgIWNoYW5uZWxbMV0ucGVybWlzc2lvbnNGb3IobWVzc2FnZS5ndWlsZC5tZSkuaGFzKFwiU0VORF9NRVNTQUdFU1wiKSkge1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiSSBjYW4ndCBzZW5kIG1lc3NhZ2VzIGluIHRoYXQgY2hhbm5lbFwiKTtcclxuICAgIH1cclxuICAgIGF3YWl0IGd1aWxkU2VydmljZS5zZXREZWZhdWx0Q2hhbm5lbChtZXNzYWdlLmd1aWxkLmlkLCBjaGFubmVsWzFdKTtcclxuICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBTZXR0aW5nICR7Y2hhbm5lbFsxXX0gZm9yIHdlbGNvbWUgYW5kIGxlYXZpbmcgbWVzc2FnZXNgKTtcclxufVxyXG5cclxuY29uc3Qgc2V0Q2hhbm5lbCA9IHtcclxuICAgIG5hbWU6IFwic2V0Y2hhbm5lbFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwic2V0Y2hhbm5lbCBzZXRzIHRoZSBkZWZhdWx0IGNoYW5uZWwgd2hlcmUgSSBzaG91bGQgc2VuZCB3ZWxjb21lL2xlYXZpbmcgbWVzc2FnZXNcIixcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdXRpbC5nZXRQYXJhbXMobWVzc2FnZSk7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBzZXRjaGFubmVsIHNob3VsZCBiZSBmb2xsb3dlZCBieSB0aGUgbmFtZSBvZiB0aGUgY2hhbm5lbC4gVXNhZ2U6IHNldGNoYW5uZWwgJHttZXNzYWdlLmNoYW5uZWx9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyYW1zWzBdWzBdICE9PSBcIjxcIikge1xyXG4gICAgICAgICAgICAvLyBJdCdzIGEgY2hhbm5lbCBuYW1lXHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWwgPSBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAoYykgPT4gY1sxXS5uYW1lID09PSBwYXJhbXNbMF0sXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChjaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0RGVmYXVsdENoYW5uZWwoY2hhbm5lbCwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJJIGNvdWxkbid0IGZpbmQgdGhhdCBjaGFubmVsXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEl0J3MgYSBjaGFubmVsIHRhZ1xyXG4gICAgICAgICAgICBjb25zdCBzbm93Zmxha2UgPSBwYXJhbXNbMF0uc3Vic3RyaW5nKDIsIHBhcmFtc1swXS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgY29uc3QgY2hhbm5lbCA9IG1lc3NhZ2UuZ3VpbGQuY2hhbm5lbHMuZmluZChcclxuICAgICAgICAgICAgICAgIChjKSA9PiBjWzBdID09PSBzbm93Zmxha2UsXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChjaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0RGVmYXVsdENoYW5uZWwoY2hhbm5lbCwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJJIGNvdWxkbid0IGZpbmQgdGhhdCBjaGFubmVsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBzYXZlTWVzc2FnZXMgPSB7XHJcbiAgICBuYW1lOiBcInNhdmVNZXNzYWdlc1wiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiWW91IHNob3VsZG4ndCBiZSBzZWVpbmcgdGhpc1wiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKF8pID0+IHtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZVNlcnZpY2Uuc2F2ZU1lc3NhZ2VzKCk7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3QgY29tbWFuZHNMaXN0ID0gW1xyXG4gICAgc2V0Q2hhbm5lbCxcclxuICAgIGluYWN0aXZlcyxcclxuICAgIHRvcCxcclxuXTtcclxuXHJcbmNvbnN0IGNvbW1hbmRzID0gW2hlbHAsIHNhdmVNZXNzYWdlcywgLi4uY29tbWFuZHNMaXN0XTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRzO1xyXG4iXX0=