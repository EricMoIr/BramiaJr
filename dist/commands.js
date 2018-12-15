"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var guildService = _interopRequireWildcard(require("services/guild"));

var userService = _interopRequireWildcard(require("services/user"));

var messageService = _interopRequireWildcard(require("services/message"));

var utils = _interopRequireWildcard(require("discordUtil"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PREFIX = process.env.PREFIX;
var help = {
  name: "help",
  description: "Shows information about other commands",
  execute: function () {
    var _execute = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(message, params) {
      var commandsDescriptions, command;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (params.length) {
                _context.next = 3;
                break;
              }

              commandsDescriptions = commandsList.map(function (c) {
                return "".concat(PREFIX).concat(c.name, " ").concat(c.description);
              }).join("\n- ");
              return _context.abrupt("return", message.reply("This is a list of the available commands. Type ".concat(PREFIX, "help <command> for more details.\n- ").concat(commandsDescriptions)));

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

    function execute(_x, _x2) {
      return _execute.apply(this, arguments);
    }

    return execute;
  }()
};
var inactivesGlobal = {
  name: "inactivesGlobal",
  description: "Shows the members with the lowest activity",
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
              return userService.getInactiveUsers(message.guild.id, 10);

            case 2:
              users = _context2.sent;

              if (users.length) {
                content = "Least active members\nRank | Name | Score\n\n";
                users.forEach(function (user, i) {
                  content += "#".concat(i + 1, ": ").concat(user.username, " | ").concat(user.points, " points\n");
                });
              } else {
                content = "There are no inactive members in the server. Congratulations!";
              }

              return _context2.abrupt("return", message.channel.send(content, {
                code: true
              }));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function execute(_x3) {
      return _execute2.apply(this, arguments);
    }

    return execute;
  }()
};
var inactives = {
  name: "inactives",
  description: "Shows the members with the lowest activity this week",
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
              return userService.getInactiveUsersThisWeek(message.guild.id, 10);

            case 2:
              users = _context3.sent;

              if (users.length) {
                content = "Least active members\nRank | Name | Score\n\n";
                users.forEach(function (user, i) {
                  content += "#".concat(i + 1, ": ").concat(user.username, " | ").concat(user.pointsWeekly, " points\n");
                });
              } else {
                content = "There are no inactive members this week. Congratulations!";
              }

              return _context3.abrupt("return", message.channel.send(content, {
                code: true
              }));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function execute(_x4) {
      return _execute3.apply(this, arguments);
    }

    return execute;
  }()
};
var top = {
  name: "top",
  description: "Shows the top 10 members based on this week's activity",
  execute: function () {
    var _execute4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(message) {
      var users, content;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return userService.getMostActiveUsersThisWeek(message.guild.id, 10);

            case 2:
              users = _context4.sent;

              if (users.length) {
                content = "Most active members\nRank | Name | Score\n\n";
                users.forEach(function (user, i) {
                  content += "#".concat(i + 1, ": ").concat(user.username, " | ").concat(user.pointsWeekly, " points\n");
                });
              } else {
                // Shouldn't happen because I handle the message before running the command
                content = "There was no activity in the server this week.";
              }

              return _context4.abrupt("return", message.channel.send(content, {
                code: true
              }));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function execute(_x5) {
      return _execute4.apply(this, arguments);
    }

    return execute;
  }()
};
var topGlobal = {
  name: "topGlobal",
  description: "Shows the top 10 members based on activity",
  execute: function () {
    var _execute5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(message) {
      var users, content;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return userService.getMostActiveUsers(message.guild.id, 10);

            case 2:
              users = _context5.sent;

              if (users.length) {
                content = "Most active members\nRank | Name | Score\n\n";
                users.forEach(function (user, i) {
                  content += "#".concat(i + 1, ": ").concat(user.username, " | ").concat(user.points, " points\n");
                });
              } else {
                // Shouldn't happen because I handle the message before running the command
                content = "There was no activity in the server... Ever.";
              }

              return _context5.abrupt("return", message.channel.send(content, {
                code: true
              }));

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function execute(_x6) {
      return _execute5.apply(this, arguments);
    }

    return execute;
  }()
};

function setDefaultChannel(_x7, _x8) {
  return _setDefaultChannel.apply(this, arguments);
}

function _setDefaultChannel() {
  _setDefaultChannel = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(channel, message) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (!(channel[1].type !== "text" || !channel[1].permissionsFor(message.guild.me).has("SEND_MESSAGES"))) {
              _context9.next = 2;
              break;
            }

            return _context9.abrupt("return", message.reply("I can't send messages in that channel"));

          case 2:
            _context9.next = 4;
            return guildService.setDefaultChannel(message.guild.id, channel[1]);

          case 4:
            return _context9.abrupt("return", message.reply("Setting ".concat(channel[1], " for welcome and leaving messages")));

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));
  return _setDefaultChannel.apply(this, arguments);
}

var setChannel = {
  name: "setchannel",
  description: "Sets the default channel where I should send welcome/leaving messages",
  execute: function () {
    var _execute6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(message, params) {
      var channel;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (params.length) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return", message.reply("".concat(PREFIX, "setchannel should be followed by the name of the channel. Usage: ").concat(PREFIX, "setchannel ").concat(message.channel)));

            case 2:
              _context6.next = 4;
              return utils.findChannel(params[0], message.guild.channels);

            case 4:
              channel = _context6.sent;

              if (!channel) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", setDefaultChannel(channel, message));

            case 7:
              return _context6.abrupt("return", message.reply("I couldn't find that channel"));

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function execute(_x9, _x10) {
      return _execute6.apply(this, arguments);
    }

    return execute;
  }()
};
var saveMessages = {
  name: "saveMessages",
  description: "You shouldn't be seeing this",
  execute: function () {
    var _execute7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(_) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", messageService.saveMessages());

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function execute(_x11) {
      return _execute7.apply(this, arguments);
    }

    return execute;
  }()
};
var meetingCommands = {
  name: "meeting",
  description: "".concat(PREFIX, "meeting starts unlocks the meeting channel and ").concat(PREFIX, "meeting in <channel_name> sets <channel_name> to be the meeting channel, locking it until a meeting starts"),
  execute: function () {
    var _execute8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(message, params) {
      var channel, _channel, _channel2;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (params.length) {
                _context8.next = 2;
                break;
              }

              return _context8.abrupt("return", message.reply("".concat(PREFIX, "meeting should be followed by parameters. For example, ").concat(PREFIX, "meeting starts unlocks the meeting channel and ").concat(PREFIX, "meeting in ").concat(message.channel, " sets ").concat(message.channel, " to be the meeting channel, locking it until a meeting starts")));

            case 2:
              if (!(params[0].toLowerCase() === "in")) {
                _context8.next = 15;
                break;
              }

              if (!(params.length < 2)) {
                _context8.next = 5;
                break;
              }

              return _context8.abrupt("return", message.reply("".concat(PREFIX, "meeting should be followed by parameters. For example, ").concat(PREFIX, "meeting starts unlocks the meeting channel and ").concat(PREFIX, "meeting in ").concat(message.channel, " sets ").concat(message.channel, " to be the meeting channel, locking it until a meeting starts")));

            case 5:
              channel = utils.findChannel(params[1], message.guild.channels);

              if (!channel) {
                _context8.next = 12;
                break;
              }

              _context8.next = 9;
              return guildService.setMeetingChannel(channel);

            case 9:
              if (_context8.sent) {
                _context8.next = 11;
                break;
              }

              return _context8.abrupt("return", message.reply("I don't have permissions for that"));

            case 11:
              return _context8.abrupt("return", message.reply("Setting ".concat(channel, " as meeting channel")));

            case 12:
              return _context8.abrupt("return", message.reply("I couldn't find that channel"));

            case 15:
              if (!(params[0].toLowerCase() === "starts")) {
                _context8.next = 28;
                break;
              }

              _context8.next = 18;
              return guildService.getMeetingChannel(message.guild.id);

            case 18:
              _channel = _context8.sent;

              if (_channel) {
                _context8.next = 21;
                break;
              }

              return _context8.abrupt("return", message.reply("You should try setting up a meeting channel first with ".concat(PREFIX, "meeting in <channel_name>")));

            case 21:
              _context8.next = 23;
              return guildService.unlockMeetingChannel(message.guild.id);

            case 23:
              if (_context8.sent) {
                _context8.next = 25;
                break;
              }

              return _context8.abrupt("return", message.reply("I don't have permissions for that"));

            case 25:
              return _context8.abrupt("return", message.reply("The meeting has started at ".concat(_channel.name, "!")));

            case 28:
              if (!(params[0].toLowerCase() === "ends")) {
                _context8.next = 39;
                break;
              }

              _context8.next = 31;
              return guildService.getMeetingChannel(message.guild.id);

            case 31:
              _channel2 = _context8.sent;

              if (_channel2) {
                _context8.next = 34;
                break;
              }

              return _context8.abrupt("return", message.reply("You should try setting up a meeting channel first with ".concat(PREFIX, "meeting in <channel_name>")));

            case 34:
              _context8.next = 36;
              return guildService.lockMeetingChannel(message.guild.id);

            case 36:
              if (_context8.sent) {
                _context8.next = 38;
                break;
              }

              return _context8.abrupt("return", message.reply("I don't have permissions for that"));

            case 38:
              return _context8.abrupt("return", message.reply("The meeting at ".concat(_channel2.name, " has ended!")));

            case 39:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function execute(_x12, _x13) {
      return _execute8.apply(this, arguments);
    }

    return execute;
  }()
};
var commandsList = [setChannel, top, topGlobal, inactivesGlobal, inactives, meetingCommands];
var commands = [help, saveMessages].concat(commandsList);
var _default = commands;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tYW5kcy50cyJdLCJuYW1lcyI6WyJQUkVGSVgiLCJwcm9jZXNzIiwiZW52IiwiaGVscCIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImV4ZWN1dGUiLCJtZXNzYWdlIiwicGFyYW1zIiwibGVuZ3RoIiwiY29tbWFuZHNEZXNjcmlwdGlvbnMiLCJjb21tYW5kc0xpc3QiLCJtYXAiLCJjIiwiam9pbiIsInJlcGx5IiwiY29tbWFuZCIsImZpbmQiLCJ0b0xvd2VyQ2FzZSIsImluYWN0aXZlc0dsb2JhbCIsInVzZXJTZXJ2aWNlIiwiZ2V0SW5hY3RpdmVVc2VycyIsImd1aWxkIiwiaWQiLCJ1c2VycyIsImNvbnRlbnQiLCJmb3JFYWNoIiwidXNlciIsImkiLCJ1c2VybmFtZSIsInBvaW50cyIsImNoYW5uZWwiLCJzZW5kIiwiY29kZSIsImluYWN0aXZlcyIsImdldEluYWN0aXZlVXNlcnNUaGlzV2VlayIsInBvaW50c1dlZWtseSIsInRvcCIsImdldE1vc3RBY3RpdmVVc2Vyc1RoaXNXZWVrIiwidG9wR2xvYmFsIiwiZ2V0TW9zdEFjdGl2ZVVzZXJzIiwic2V0RGVmYXVsdENoYW5uZWwiLCJ0eXBlIiwicGVybWlzc2lvbnNGb3IiLCJtZSIsImhhcyIsImd1aWxkU2VydmljZSIsInNldENoYW5uZWwiLCJ1dGlscyIsImZpbmRDaGFubmVsIiwiY2hhbm5lbHMiLCJzYXZlTWVzc2FnZXMiLCJfIiwibWVzc2FnZVNlcnZpY2UiLCJtZWV0aW5nQ29tbWFuZHMiLCJzZXRNZWV0aW5nQ2hhbm5lbCIsImdldE1lZXRpbmdDaGFubmVsIiwidW5sb2NrTWVldGluZ0NoYW5uZWwiLCJsb2NrTWVldGluZ0NoYW5uZWwiLCJjb21tYW5kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztJQUVRQSxNLEdBQVdDLE9BQU8sQ0FBQ0MsRyxDQUFuQkYsTTtBQVFSLElBQU1HLElBQWMsR0FBRztBQUNuQkMsRUFBQUEsSUFBSSxF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SHNCLENBQWpDO0FBMENBLElBQU1PLFlBQVksR0FBRyxDQUNqQm9DLFVBRGlCLEVBRWpCVixHQUZpQixFQUdqQkUsU0FIaUIsRUFJakJwQixlQUppQixFQUtqQmUsU0FMaUIsRUFNakJvQixlQU5pQixDQUFyQjtBQVNBLElBQU1LLFFBQVEsSUFBSXhELElBQUosRUFBVWdELFlBQVYsU0FBMkJ4QyxZQUEzQixDQUFkO2VBRWVnRCxRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSwgVGV4dENoYW5uZWwgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5cclxuaW1wb3J0ICogYXMgZ3VpbGRTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy9ndWlsZFwiO1xyXG5pbXBvcnQgKiBhcyB1c2VyU2VydmljZSBmcm9tIFwic2VydmljZXMvdXNlclwiO1xyXG5pbXBvcnQgKiBhcyBtZXNzYWdlU2VydmljZSBmcm9tIFwic2VydmljZXMvbWVzc2FnZVwiO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiZGlzY29yZFV0aWxcIjtcclxuXHJcbmNvbnN0IHsgUFJFRklYIH0gPSBwcm9jZXNzLmVudjtcclxuXHJcbnR5cGUgQ29tbWFuZCA9IHtcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICBleGVjdXRlOiAobWVzc2FnZTogTWVzc2FnZSwgcGFyYW1zPzogc3RyaW5nW10pID0+IFByb21pc2U8YW55PixcclxufVxyXG5cclxuY29uc3QgaGVscCA6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcImhlbHBcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3dzIGluZm9ybWF0aW9uIGFib3V0IG90aGVyIGNvbW1hbmRzXCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSwgcGFyYW1zKSA9PiB7XHJcblxyXG4gICAgICAgIGlmICghcGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb21tYW5kc0Rlc2NyaXB0aW9ucyA9IGNvbW1hbmRzTGlzdFxyXG4gICAgICAgICAgICAgICAgLm1hcCgoYykgPT4gYCR7UFJFRklYfSR7Yy5uYW1lfSAke2MuZGVzY3JpcHRpb259YClcclxuICAgICAgICAgICAgICAgIC5qb2luKFwiXFxuLSBcIilcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYFRoaXMgaXMgYSBsaXN0IG9mIHRoZSBhdmFpbGFibGUgY29tbWFuZHMuIFR5cGUgJHtQUkVGSVh9aGVscCA8Y29tbWFuZD4gZm9yIG1vcmUgZGV0YWlscy5cXG4tICR7Y29tbWFuZHNEZXNjcmlwdGlvbnN9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kc0xpc3QuZmluZChcclxuICAgICAgICAgICAgKGMpID0+IHBhcmFtc1swXS50b0xvd2VyQ2FzZSgpID09PSBjLm5hbWUudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChjb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGNvbW1hbmQuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcImhlbHAgc2hvdWxkIGJlIGZvbGxvd2VkIGJ5IGEgY29tbWFuZC4gVXNhZ2U6IGhlbHAgc2V0Y2hhbm5lbFwiKTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBpbmFjdGl2ZXNHbG9iYWwgOiBDb21tYW5kID0ge1xyXG4gICAgbmFtZTogXCJpbmFjdGl2ZXNHbG9iYWxcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3dzIHRoZSBtZW1iZXJzIHdpdGggdGhlIGxvd2VzdCBhY3Rpdml0eVwiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldEluYWN0aXZlVXNlcnMobWVzc2FnZS5ndWlsZC5pZCwgMTApO1xyXG4gICAgICAgIGxldCBjb250ZW50O1xyXG4gICAgICAgIGlmICh1c2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IGBMZWFzdCBhY3RpdmUgbWVtYmVyc1xyXG5SYW5rIHwgTmFtZSB8IFNjb3JlXFxuXFxuYDtcclxuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlciwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPSBgIyR7aSArIDF9OiAke3VzZXIudXNlcm5hbWV9IHwgJHt1c2VyLnBvaW50c30gcG9pbnRzXFxuYDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGVudCA9IFwiVGhlcmUgYXJlIG5vIGluYWN0aXZlIG1lbWJlcnMgaW4gdGhlIHNlcnZlci4gQ29uZ3JhdHVsYXRpb25zIVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGNvbnRlbnQsIHsgY29kZTogdHJ1ZSB9KTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBpbmFjdGl2ZXMgOiBDb21tYW5kID0ge1xyXG4gICAgbmFtZTogXCJpbmFjdGl2ZXNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3dzIHRoZSBtZW1iZXJzIHdpdGggdGhlIGxvd2VzdCBhY3Rpdml0eSB0aGlzIHdlZWtcIixcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCB1c2VyU2VydmljZS5nZXRJbmFjdGl2ZVVzZXJzVGhpc1dlZWsobWVzc2FnZS5ndWlsZC5pZCwgMTApO1xyXG4gICAgICAgIGxldCBjb250ZW50O1xyXG4gICAgICAgIGlmICh1c2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IGBMZWFzdCBhY3RpdmUgbWVtYmVyc1xyXG5SYW5rIHwgTmFtZSB8IFNjb3JlXFxuXFxuYDtcclxuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlciwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPSBgIyR7aSArIDF9OiAke3VzZXIudXNlcm5hbWV9IHwgJHt1c2VyLnBvaW50c1dlZWtseX0gcG9pbnRzXFxuYDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGVudCA9IFwiVGhlcmUgYXJlIG5vIGluYWN0aXZlIG1lbWJlcnMgdGhpcyB3ZWVrLiBDb25ncmF0dWxhdGlvbnMhXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoY29udGVudCwgeyBjb2RlOiB0cnVlIH0pO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmNvbnN0IHRvcCA6IENvbW1hbmQgID0ge1xyXG4gICAgbmFtZTogXCJ0b3BcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3dzIHRoZSB0b3AgMTAgbWVtYmVycyBiYXNlZCBvbiB0aGlzIHdlZWsncyBhY3Rpdml0eVwiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldE1vc3RBY3RpdmVVc2Vyc1RoaXNXZWVrKG1lc3NhZ2UuZ3VpbGQuaWQsIDEwKTtcclxuICAgICAgICBsZXQgY29udGVudDtcclxuICAgICAgICBpZiAodXNlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBgTW9zdCBhY3RpdmUgbWVtYmVyc1xyXG5SYW5rIHwgTmFtZSB8IFNjb3JlXFxuXFxuYDtcclxuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlciwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPSBgIyR7aSArIDF9OiAke3VzZXIudXNlcm5hbWV9IHwgJHt1c2VyLnBvaW50c1dlZWtseX0gcG9pbnRzXFxuYDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gU2hvdWxkbid0IGhhcHBlbiBiZWNhdXNlIEkgaGFuZGxlIHRoZSBtZXNzYWdlIGJlZm9yZSBydW5uaW5nIHRoZSBjb21tYW5kXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBcIlRoZXJlIHdhcyBubyBhY3Rpdml0eSBpbiB0aGUgc2VydmVyIHRoaXMgd2Vlay5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChjb250ZW50LCB7IGNvZGU6IHRydWUgfSk7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3QgdG9wR2xvYmFsIDogQ29tbWFuZCAgPSB7XHJcbiAgICBuYW1lOiBcInRvcEdsb2JhbFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiU2hvd3MgdGhlIHRvcCAxMCBtZW1iZXJzIGJhc2VkIG9uIGFjdGl2aXR5XCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0TW9zdEFjdGl2ZVVzZXJzKG1lc3NhZ2UuZ3VpbGQuaWQsIDEwKTtcclxuICAgICAgICBsZXQgY29udGVudDtcclxuICAgICAgICBpZiAodXNlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBgTW9zdCBhY3RpdmUgbWVtYmVyc1xyXG5SYW5rIHwgTmFtZSB8IFNjb3JlXFxuXFxuYDtcclxuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlciwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPSBgIyR7aSArIDF9OiAke3VzZXIudXNlcm5hbWV9IHwgJHt1c2VyLnBvaW50c30gcG9pbnRzXFxuYDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gU2hvdWxkbid0IGhhcHBlbiBiZWNhdXNlIEkgaGFuZGxlIHRoZSBtZXNzYWdlIGJlZm9yZSBydW5uaW5nIHRoZSBjb21tYW5kXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBcIlRoZXJlIHdhcyBubyBhY3Rpdml0eSBpbiB0aGUgc2VydmVyLi4uIEV2ZXIuXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoY29udGVudCwgeyBjb2RlOiB0cnVlIH0pO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNldERlZmF1bHRDaGFubmVsKGNoYW5uZWwsIG1lc3NhZ2UpIHtcclxuICAgIGlmIChjaGFubmVsWzFdLnR5cGUgIT09IFwidGV4dFwiIHx8ICFjaGFubmVsWzFdLnBlcm1pc3Npb25zRm9yKG1lc3NhZ2UuZ3VpbGQubWUpLmhhcyhcIlNFTkRfTUVTU0FHRVNcIikpIHtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcIkkgY2FuJ3Qgc2VuZCBtZXNzYWdlcyBpbiB0aGF0IGNoYW5uZWxcIik7XHJcbiAgICB9XHJcbiAgICBhd2FpdCBndWlsZFNlcnZpY2Uuc2V0RGVmYXVsdENoYW5uZWwobWVzc2FnZS5ndWlsZC5pZCwgY2hhbm5lbFsxXSk7XHJcbiAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgU2V0dGluZyAke2NoYW5uZWxbMV19IGZvciB3ZWxjb21lIGFuZCBsZWF2aW5nIG1lc3NhZ2VzYCk7XHJcbn1cclxuXHJcbmNvbnN0IHNldENoYW5uZWw6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcInNldGNoYW5uZWxcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNldHMgdGhlIGRlZmF1bHQgY2hhbm5lbCB3aGVyZSBJIHNob3VsZCBzZW5kIHdlbGNvbWUvbGVhdmluZyBtZXNzYWdlc1wiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UsIHBhcmFtcykgPT4ge1xyXG4gICAgICAgIGlmICghcGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgJHtQUkVGSVh9c2V0Y2hhbm5lbCBzaG91bGQgYmUgZm9sbG93ZWQgYnkgdGhlIG5hbWUgb2YgdGhlIGNoYW5uZWwuIFVzYWdlOiAke1BSRUZJWH1zZXRjaGFubmVsICR7bWVzc2FnZS5jaGFubmVsfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjaGFubmVsID0gYXdhaXQgdXRpbHMuZmluZENoYW5uZWwocGFyYW1zWzBdLCBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzKTtcclxuXHJcbiAgICAgICAgaWYgKGNoYW5uZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNldERlZmF1bHRDaGFubmVsKGNoYW5uZWwsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcIkkgY291bGRuJ3QgZmluZCB0aGF0IGNoYW5uZWxcIik7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3Qgc2F2ZU1lc3NhZ2VzOiBDb21tYW5kID0ge1xyXG4gICAgbmFtZTogXCJzYXZlTWVzc2FnZXNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIllvdSBzaG91bGRuJ3QgYmUgc2VlaW5nIHRoaXNcIixcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChfKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VTZXJ2aWNlLnNhdmVNZXNzYWdlcygpO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmNvbnN0IG1lZXRpbmdDb21tYW5kczogQ29tbWFuZCA9IHtcclxuICAgIG5hbWU6IFwibWVldGluZ1wiLFxyXG4gICAgZGVzY3JpcHRpb246IGAke1BSRUZJWH1tZWV0aW5nIHN0YXJ0cyB1bmxvY2tzIHRoZSBtZWV0aW5nIGNoYW5uZWwgYW5kICR7UFJFRklYfW1lZXRpbmcgaW4gPGNoYW5uZWxfbmFtZT4gc2V0cyA8Y2hhbm5lbF9uYW1lPiB0byBiZSB0aGUgbWVldGluZyBjaGFubmVsLCBsb2NraW5nIGl0IHVudGlsIGEgbWVldGluZyBzdGFydHNgLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UsIHBhcmFtcykgPT4ge1xyXG4gICAgICAgIGlmICghcGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgJHtQUkVGSVh9bWVldGluZyBzaG91bGQgYmUgZm9sbG93ZWQgYnkgcGFyYW1ldGVycy4gRm9yIGV4YW1wbGUsICR7UFJFRklYfW1lZXRpbmcgc3RhcnRzIHVubG9ja3MgdGhlIG1lZXRpbmcgY2hhbm5lbCBhbmQgJHtQUkVGSVh9bWVldGluZyBpbiAke21lc3NhZ2UuY2hhbm5lbH0gc2V0cyAke21lc3NhZ2UuY2hhbm5lbH0gdG8gYmUgdGhlIG1lZXRpbmcgY2hhbm5lbCwgbG9ja2luZyBpdCB1bnRpbCBhIG1lZXRpbmcgc3RhcnRzYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbXNbMF0udG9Mb3dlckNhc2UoKSA9PT0gXCJpblwiKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYCR7UFJFRklYfW1lZXRpbmcgc2hvdWxkIGJlIGZvbGxvd2VkIGJ5IHBhcmFtZXRlcnMuIEZvciBleGFtcGxlLCAke1BSRUZJWH1tZWV0aW5nIHN0YXJ0cyB1bmxvY2tzIHRoZSBtZWV0aW5nIGNoYW5uZWwgYW5kICR7UFJFRklYfW1lZXRpbmcgaW4gJHttZXNzYWdlLmNoYW5uZWx9IHNldHMgJHttZXNzYWdlLmNoYW5uZWx9IHRvIGJlIHRoZSBtZWV0aW5nIGNoYW5uZWwsIGxvY2tpbmcgaXQgdW50aWwgYSBtZWV0aW5nIHN0YXJ0c2ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWwgPSB1dGlscy5maW5kQ2hhbm5lbChwYXJhbXNbMV0sIG1lc3NhZ2UuZ3VpbGQuY2hhbm5lbHMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICghYXdhaXQgZ3VpbGRTZXJ2aWNlLnNldE1lZXRpbmdDaGFubmVsKGNoYW5uZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJJIGRvbid0IGhhdmUgcGVybWlzc2lvbnMgZm9yIHRoYXRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgU2V0dGluZyAke2NoYW5uZWx9IGFzIG1lZXRpbmcgY2hhbm5lbGApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiSSBjb3VsZG4ndCBmaW5kIHRoYXQgY2hhbm5lbFwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtc1swXS50b0xvd2VyQ2FzZSgpID09PSBcInN0YXJ0c1wiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBndWlsZFNlcnZpY2UuZ2V0TWVldGluZ0NoYW5uZWwobWVzc2FnZS5ndWlsZC5pZCk7XHJcbiAgICAgICAgICAgIGlmICghY2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYFlvdSBzaG91bGQgdHJ5IHNldHRpbmcgdXAgYSBtZWV0aW5nIGNoYW5uZWwgZmlyc3Qgd2l0aCAke1BSRUZJWH1tZWV0aW5nIGluIDxjaGFubmVsX25hbWU+YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFhd2FpdCBndWlsZFNlcnZpY2UudW5sb2NrTWVldGluZ0NoYW5uZWwobWVzc2FnZS5ndWlsZC5pZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiSSBkb24ndCBoYXZlIHBlcm1pc3Npb25zIGZvciB0aGF0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBUaGUgbWVldGluZyBoYXMgc3RhcnRlZCBhdCAke2NoYW5uZWwubmFtZX0hYCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbXNbMF0udG9Mb3dlckNhc2UoKSA9PT0gXCJlbmRzXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hhbm5lbCA9IGF3YWl0IGd1aWxkU2VydmljZS5nZXRNZWV0aW5nQ2hhbm5lbChtZXNzYWdlLmd1aWxkLmlkKTtcclxuICAgICAgICAgICAgaWYgKCFjaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgWW91IHNob3VsZCB0cnkgc2V0dGluZyB1cCBhIG1lZXRpbmcgY2hhbm5lbCBmaXJzdCB3aXRoICR7UFJFRklYfW1lZXRpbmcgaW4gPGNoYW5uZWxfbmFtZT5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWF3YWl0IGd1aWxkU2VydmljZS5sb2NrTWVldGluZ0NoYW5uZWwobWVzc2FnZS5ndWlsZC5pZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiSSBkb24ndCBoYXZlIHBlcm1pc3Npb25zIGZvciB0aGF0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBUaGUgbWVldGluZyBhdCAke2NoYW5uZWwubmFtZX0gaGFzIGVuZGVkIWApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBjb21tYW5kc0xpc3QgPSBbXHJcbiAgICBzZXRDaGFubmVsLFxyXG4gICAgdG9wLFxyXG4gICAgdG9wR2xvYmFsLFxyXG4gICAgaW5hY3RpdmVzR2xvYmFsLFxyXG4gICAgaW5hY3RpdmVzLFxyXG4gICAgbWVldGluZ0NvbW1hbmRzLFxyXG5dO1xyXG5cclxuY29uc3QgY29tbWFuZHMgPSBbaGVscCwgc2F2ZU1lc3NhZ2VzLCAuLi5jb21tYW5kc0xpc3RdO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZHM7XHJcbiJdfQ==