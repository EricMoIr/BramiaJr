"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var guildService = _interopRequireWildcard(require("services/guild"));

var userService = _interopRequireWildcard(require("services/user"));

var messageService = _interopRequireWildcard(require("services/message"));

var utils = _interopRequireWildcard(require("discordUtil"));

var _messages = _interopRequireDefault(require("messages/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
              if (guildService.canManageMeetings(message.author, message.guild)) {
                _context8.next = 2;
                break;
              }

              return _context8.abrupt("return", message.reply(_messages.default.your_permissions));

            case 2:
              if (params.length) {
                _context8.next = 4;
                break;
              }

              return _context8.abrupt("return", message.reply(_messages.default.meeting_missing_params(PREFIX)));

            case 4:
              if (!(params[0].toLowerCase() === "in")) {
                _context8.next = 17;
                break;
              }

              if (!(params.length < 2)) {
                _context8.next = 7;
                break;
              }

              return _context8.abrupt("return", message.reply(_messages.default.meeting_missing_params(PREFIX)));

            case 7:
              channel = utils.findChannel(params[1], message.guild.channels);

              if (!channel) {
                _context8.next = 14;
                break;
              }

              _context8.next = 11;
              return guildService.setMeetingChannel(channel);

            case 11:
              if (_context8.sent) {
                _context8.next = 13;
                break;
              }

              return _context8.abrupt("return", message.reply(_messages.default.my_permissions));

            case 13:
              return _context8.abrupt("return", message.reply("Setting ".concat(channel, " as meeting channel")));

            case 14:
              return _context8.abrupt("return", message.reply("I couldn't find that channel"));

            case 17:
              if (!(params[0].toLowerCase() === "starts")) {
                _context8.next = 30;
                break;
              }

              _context8.next = 20;
              return guildService.getMeetingChannel(message.guild.id);

            case 20:
              _channel = _context8.sent;

              if (_channel) {
                _context8.next = 23;
                break;
              }

              return _context8.abrupt("return", message.reply("You should try setting up a meeting channel first with ".concat(PREFIX, "meeting in <channel_name>")));

            case 23:
              _context8.next = 25;
              return guildService.unlockMeetingChannel(message.guild.id);

            case 25:
              if (_context8.sent) {
                _context8.next = 27;
                break;
              }

              return _context8.abrupt("return", message.reply(_messages.default.my_permissions));

            case 27:
              return _context8.abrupt("return", message.reply("The meeting has started at ".concat(_channel.name, "!")));

            case 30:
              if (!(params[0].toLowerCase() === "ends")) {
                _context8.next = 41;
                break;
              }

              _context8.next = 33;
              return guildService.getMeetingChannel(message.guild.id);

            case 33:
              _channel2 = _context8.sent;

              if (_channel2) {
                _context8.next = 36;
                break;
              }

              return _context8.abrupt("return", message.reply("You should try setting up a meeting channel first with ".concat(PREFIX, "meeting in <channel_name>")));

            case 36:
              _context8.next = 38;
              return guildService.lockMeetingChannel(message.guild.id);

            case 38:
              if (_context8.sent) {
                _context8.next = 40;
                break;
              }

              return _context8.abrupt("return", message.reply(_messages.default.my_permissions));

            case 40:
              return _context8.abrupt("return", message.reply("The meeting at ".concat(_channel2.name, " has ended!")));

            case 41:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tYW5kcy50cyJdLCJuYW1lcyI6WyJQUkVGSVgiLCJwcm9jZXNzIiwiZW52IiwiaGVscCIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImV4ZWN1dGUiLCJtZXNzYWdlIiwicGFyYW1zIiwibGVuZ3RoIiwiY29tbWFuZHNEZXNjcmlwdGlvbnMiLCJjb21tYW5kc0xpc3QiLCJtYXAiLCJjIiwiam9pbiIsInJlcGx5IiwiY29tbWFuZCIsImZpbmQiLCJ0b0xvd2VyQ2FzZSIsImluYWN0aXZlc0dsb2JhbCIsInVzZXJTZXJ2aWNlIiwiZ2V0SW5hY3RpdmVVc2VycyIsImd1aWxkIiwiaWQiLCJ1c2VycyIsImNvbnRlbnQiLCJmb3JFYWNoIiwidXNlciIsImkiLCJ1c2VybmFtZSIsInBvaW50cyIsImNoYW5uZWwiLCJzZW5kIiwiY29kZSIsImluYWN0aXZlcyIsImdldEluYWN0aXZlVXNlcnNUaGlzV2VlayIsInBvaW50c1dlZWtseSIsInRvcCIsImdldE1vc3RBY3RpdmVVc2Vyc1RoaXNXZWVrIiwidG9wR2xvYmFsIiwiZ2V0TW9zdEFjdGl2ZVVzZXJzIiwic2V0RGVmYXVsdENoYW5uZWwiLCJ0eXBlIiwicGVybWlzc2lvbnNGb3IiLCJtZSIsImhhcyIsImd1aWxkU2VydmljZSIsInNldENoYW5uZWwiLCJ1dGlscyIsImZpbmRDaGFubmVsIiwiY2hhbm5lbHMiLCJzYXZlTWVzc2FnZXMiLCJfIiwibWVzc2FnZVNlcnZpY2UiLCJtZWV0aW5nQ29tbWFuZHMiLCJjYW5NYW5hZ2VNZWV0aW5ncyIsImF1dGhvciIsIk1lc3NhZ2VzIiwieW91cl9wZXJtaXNzaW9ucyIsIm1lZXRpbmdfbWlzc2luZ19wYXJhbXMiLCJzZXRNZWV0aW5nQ2hhbm5lbCIsIm15X3Blcm1pc3Npb25zIiwiZ2V0TWVldGluZ0NoYW5uZWwiLCJ1bmxvY2tNZWV0aW5nQ2hhbm5lbCIsImxvY2tNZWV0aW5nQ2hhbm5lbCIsImNvbW1hbmRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7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QUFBQSxnREFtQ1VoQixPQUFPLENBQUNRLEtBQVIsQ0FBYzBDLGtCQUFTSSxjQUF2QixDQW5DVjs7QUFBQTtBQUFBLGdEQXFDTXRELE9BQU8sQ0FBQ1EsS0FBUiwwQkFBZ0NnQixTQUFPLENBQUMzQixJQUF4QyxpQkFyQ047O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUhzQixDQUFqQztBQTZDQSxJQUFNTyxZQUFZLEdBQUcsQ0FDakJvQyxVQURpQixFQUVqQlYsR0FGaUIsRUFHakJFLFNBSGlCLEVBSWpCcEIsZUFKaUIsRUFLakJlLFNBTGlCLEVBTWpCb0IsZUFOaUIsQ0FBckI7QUFTQSxJQUFNVyxRQUFRLElBQUk5RCxJQUFKLEVBQVVnRCxZQUFWLFNBQTJCeEMsWUFBM0IsQ0FBZDtlQUVlc0QsUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UsIFRleHRDaGFubmVsIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuXHJcbmltcG9ydCAqIGFzIGd1aWxkU2VydmljZSBmcm9tIFwic2VydmljZXMvZ3VpbGRcIjtcclxuaW1wb3J0ICogYXMgdXNlclNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL3VzZXJcIjtcclxuaW1wb3J0ICogYXMgbWVzc2FnZVNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL21lc3NhZ2VcIjtcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcImRpc2NvcmRVdGlsXCI7XHJcbmltcG9ydCBNZXNzYWdlcyBmcm9tIFwibWVzc2FnZXMvbWVzc2FnZXNcIjtcclxuXHJcbmNvbnN0IHsgUFJFRklYIH0gPSBwcm9jZXNzLmVudjtcclxuXHJcbnR5cGUgQ29tbWFuZCA9IHtcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICBleGVjdXRlOiAobWVzc2FnZTogTWVzc2FnZSwgcGFyYW1zPzogc3RyaW5nW10pID0+IFByb21pc2U8YW55PixcclxufVxyXG5cclxuY29uc3QgaGVscCA6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcImhlbHBcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3dzIGluZm9ybWF0aW9uIGFib3V0IG90aGVyIGNvbW1hbmRzXCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSwgcGFyYW1zKSA9PiB7XHJcblxyXG4gICAgICAgIGlmICghcGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb21tYW5kc0Rlc2NyaXB0aW9ucyA9IGNvbW1hbmRzTGlzdFxyXG4gICAgICAgICAgICAgICAgLm1hcCgoYykgPT4gYCR7UFJFRklYfSR7Yy5uYW1lfSAke2MuZGVzY3JpcHRpb259YClcclxuICAgICAgICAgICAgICAgIC5qb2luKFwiXFxuLSBcIilcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYFRoaXMgaXMgYSBsaXN0IG9mIHRoZSBhdmFpbGFibGUgY29tbWFuZHMuIFR5cGUgJHtQUkVGSVh9aGVscCA8Y29tbWFuZD4gZm9yIG1vcmUgZGV0YWlscy5cXG4tICR7Y29tbWFuZHNEZXNjcmlwdGlvbnN9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kc0xpc3QuZmluZChcclxuICAgICAgICAgICAgKGMpID0+IHBhcmFtc1swXS50b0xvd2VyQ2FzZSgpID09PSBjLm5hbWUudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChjb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGNvbW1hbmQuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcImhlbHAgc2hvdWxkIGJlIGZvbGxvd2VkIGJ5IGEgY29tbWFuZC4gVXNhZ2U6IGhlbHAgc2V0Y2hhbm5lbFwiKTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBpbmFjdGl2ZXNHbG9iYWwgOiBDb21tYW5kID0ge1xyXG4gICAgbmFtZTogXCJpbmFjdGl2ZXNHbG9iYWxcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3dzIHRoZSBtZW1iZXJzIHdpdGggdGhlIGxvd2VzdCBhY3Rpdml0eVwiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldEluYWN0aXZlVXNlcnMobWVzc2FnZS5ndWlsZC5pZCwgMTApO1xyXG4gICAgICAgIGxldCBjb250ZW50O1xyXG4gICAgICAgIGlmICh1c2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IGBMZWFzdCBhY3RpdmUgbWVtYmVyc1xyXG5SYW5rIHwgTmFtZSB8IFNjb3JlXFxuXFxuYDtcclxuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlciwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPSBgIyR7aSArIDF9OiAke3VzZXIudXNlcm5hbWV9IHwgJHt1c2VyLnBvaW50c30gcG9pbnRzXFxuYDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGVudCA9IFwiVGhlcmUgYXJlIG5vIGluYWN0aXZlIG1lbWJlcnMgaW4gdGhlIHNlcnZlci4gQ29uZ3JhdHVsYXRpb25zIVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGNvbnRlbnQsIHsgY29kZTogdHJ1ZSB9KTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBpbmFjdGl2ZXMgOiBDb21tYW5kID0ge1xyXG4gICAgbmFtZTogXCJpbmFjdGl2ZXNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3dzIHRoZSBtZW1iZXJzIHdpdGggdGhlIGxvd2VzdCBhY3Rpdml0eSB0aGlzIHdlZWtcIixcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCB1c2VyU2VydmljZS5nZXRJbmFjdGl2ZVVzZXJzVGhpc1dlZWsobWVzc2FnZS5ndWlsZC5pZCwgMTApO1xyXG4gICAgICAgIGxldCBjb250ZW50O1xyXG4gICAgICAgIGlmICh1c2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IGBMZWFzdCBhY3RpdmUgbWVtYmVyc1xyXG5SYW5rIHwgTmFtZSB8IFNjb3JlXFxuXFxuYDtcclxuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlciwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPSBgIyR7aSArIDF9OiAke3VzZXIudXNlcm5hbWV9IHwgJHt1c2VyLnBvaW50c1dlZWtseX0gcG9pbnRzXFxuYDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGVudCA9IFwiVGhlcmUgYXJlIG5vIGluYWN0aXZlIG1lbWJlcnMgdGhpcyB3ZWVrLiBDb25ncmF0dWxhdGlvbnMhXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoY29udGVudCwgeyBjb2RlOiB0cnVlIH0pO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmNvbnN0IHRvcCA6IENvbW1hbmQgID0ge1xyXG4gICAgbmFtZTogXCJ0b3BcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3dzIHRoZSB0b3AgMTAgbWVtYmVycyBiYXNlZCBvbiB0aGlzIHdlZWsncyBhY3Rpdml0eVwiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldE1vc3RBY3RpdmVVc2Vyc1RoaXNXZWVrKG1lc3NhZ2UuZ3VpbGQuaWQsIDEwKTtcclxuICAgICAgICBsZXQgY29udGVudDtcclxuICAgICAgICBpZiAodXNlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBgTW9zdCBhY3RpdmUgbWVtYmVyc1xyXG5SYW5rIHwgTmFtZSB8IFNjb3JlXFxuXFxuYDtcclxuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlciwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPSBgIyR7aSArIDF9OiAke3VzZXIudXNlcm5hbWV9IHwgJHt1c2VyLnBvaW50c1dlZWtseX0gcG9pbnRzXFxuYDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gU2hvdWxkbid0IGhhcHBlbiBiZWNhdXNlIEkgaGFuZGxlIHRoZSBtZXNzYWdlIGJlZm9yZSBydW5uaW5nIHRoZSBjb21tYW5kXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBcIlRoZXJlIHdhcyBubyBhY3Rpdml0eSBpbiB0aGUgc2VydmVyIHRoaXMgd2Vlay5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChjb250ZW50LCB7IGNvZGU6IHRydWUgfSk7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3QgdG9wR2xvYmFsIDogQ29tbWFuZCAgPSB7XHJcbiAgICBuYW1lOiBcInRvcEdsb2JhbFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiU2hvd3MgdGhlIHRvcCAxMCBtZW1iZXJzIGJhc2VkIG9uIGFjdGl2aXR5XCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0TW9zdEFjdGl2ZVVzZXJzKG1lc3NhZ2UuZ3VpbGQuaWQsIDEwKTtcclxuICAgICAgICBsZXQgY29udGVudDtcclxuICAgICAgICBpZiAodXNlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBgTW9zdCBhY3RpdmUgbWVtYmVyc1xyXG5SYW5rIHwgTmFtZSB8IFNjb3JlXFxuXFxuYDtcclxuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlciwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPSBgIyR7aSArIDF9OiAke3VzZXIudXNlcm5hbWV9IHwgJHt1c2VyLnBvaW50c30gcG9pbnRzXFxuYDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gU2hvdWxkbid0IGhhcHBlbiBiZWNhdXNlIEkgaGFuZGxlIHRoZSBtZXNzYWdlIGJlZm9yZSBydW5uaW5nIHRoZSBjb21tYW5kXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBcIlRoZXJlIHdhcyBubyBhY3Rpdml0eSBpbiB0aGUgc2VydmVyLi4uIEV2ZXIuXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoY29udGVudCwgeyBjb2RlOiB0cnVlIH0pO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNldERlZmF1bHRDaGFubmVsKGNoYW5uZWwsIG1lc3NhZ2UpIHtcclxuICAgIGlmIChjaGFubmVsWzFdLnR5cGUgIT09IFwidGV4dFwiIHx8ICFjaGFubmVsWzFdLnBlcm1pc3Npb25zRm9yKG1lc3NhZ2UuZ3VpbGQubWUpLmhhcyhcIlNFTkRfTUVTU0FHRVNcIikpIHtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcIkkgY2FuJ3Qgc2VuZCBtZXNzYWdlcyBpbiB0aGF0IGNoYW5uZWxcIik7XHJcbiAgICB9XHJcbiAgICBhd2FpdCBndWlsZFNlcnZpY2Uuc2V0RGVmYXVsdENoYW5uZWwobWVzc2FnZS5ndWlsZC5pZCwgY2hhbm5lbFsxXSk7XHJcbiAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgU2V0dGluZyAke2NoYW5uZWxbMV19IGZvciB3ZWxjb21lIGFuZCBsZWF2aW5nIG1lc3NhZ2VzYCk7XHJcbn1cclxuXHJcbmNvbnN0IHNldENoYW5uZWw6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcInNldGNoYW5uZWxcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNldHMgdGhlIGRlZmF1bHQgY2hhbm5lbCB3aGVyZSBJIHNob3VsZCBzZW5kIHdlbGNvbWUvbGVhdmluZyBtZXNzYWdlc1wiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UsIHBhcmFtcykgPT4ge1xyXG4gICAgICAgIGlmICghcGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgJHtQUkVGSVh9c2V0Y2hhbm5lbCBzaG91bGQgYmUgZm9sbG93ZWQgYnkgdGhlIG5hbWUgb2YgdGhlIGNoYW5uZWwuIFVzYWdlOiAke1BSRUZJWH1zZXRjaGFubmVsICR7bWVzc2FnZS5jaGFubmVsfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjaGFubmVsID0gYXdhaXQgdXRpbHMuZmluZENoYW5uZWwocGFyYW1zWzBdLCBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzKTtcclxuXHJcbiAgICAgICAgaWYgKGNoYW5uZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNldERlZmF1bHRDaGFubmVsKGNoYW5uZWwsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcIkkgY291bGRuJ3QgZmluZCB0aGF0IGNoYW5uZWxcIik7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3Qgc2F2ZU1lc3NhZ2VzOiBDb21tYW5kID0ge1xyXG4gICAgbmFtZTogXCJzYXZlTWVzc2FnZXNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIllvdSBzaG91bGRuJ3QgYmUgc2VlaW5nIHRoaXNcIixcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChfKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VTZXJ2aWNlLnNhdmVNZXNzYWdlcygpO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmNvbnN0IG1lZXRpbmdDb21tYW5kczogQ29tbWFuZCA9IHtcclxuICAgIG5hbWU6IFwibWVldGluZ1wiLFxyXG4gICAgZGVzY3JpcHRpb246IGAke1BSRUZJWH1tZWV0aW5nIHN0YXJ0cyB1bmxvY2tzIHRoZSBtZWV0aW5nIGNoYW5uZWwgYW5kICR7UFJFRklYfW1lZXRpbmcgaW4gPGNoYW5uZWxfbmFtZT4gc2V0cyA8Y2hhbm5lbF9uYW1lPiB0byBiZSB0aGUgbWVldGluZyBjaGFubmVsLCBsb2NraW5nIGl0IHVudGlsIGEgbWVldGluZyBzdGFydHNgLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UsIHBhcmFtcykgPT4ge1xyXG4gICAgICAgIGlmICghZ3VpbGRTZXJ2aWNlLmNhbk1hbmFnZU1lZXRpbmdzKG1lc3NhZ2UuYXV0aG9yLCBtZXNzYWdlLmd1aWxkKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShNZXNzYWdlcy55b3VyX3Blcm1pc3Npb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFwYXJhbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KE1lc3NhZ2VzLm1lZXRpbmdfbWlzc2luZ19wYXJhbXMoUFJFRklYKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbXNbMF0udG9Mb3dlckNhc2UoKSA9PT0gXCJpblwiKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoTWVzc2FnZXMubWVldGluZ19taXNzaW5nX3BhcmFtcyhQUkVGSVgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBjaGFubmVsID0gdXRpbHMuZmluZENoYW5uZWwocGFyYW1zWzFdLCBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWF3YWl0IGd1aWxkU2VydmljZS5zZXRNZWV0aW5nQ2hhbm5lbChjaGFubmVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KE1lc3NhZ2VzLm15X3Blcm1pc3Npb25zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBTZXR0aW5nICR7Y2hhbm5lbH0gYXMgbWVldGluZyBjaGFubmVsYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJJIGNvdWxkbid0IGZpbmQgdGhhdCBjaGFubmVsXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFyYW1zWzBdLnRvTG93ZXJDYXNlKCkgPT09IFwic3RhcnRzXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hhbm5lbCA9IGF3YWl0IGd1aWxkU2VydmljZS5nZXRNZWV0aW5nQ2hhbm5lbChtZXNzYWdlLmd1aWxkLmlkKTtcclxuICAgICAgICAgICAgaWYgKCFjaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgWW91IHNob3VsZCB0cnkgc2V0dGluZyB1cCBhIG1lZXRpbmcgY2hhbm5lbCBmaXJzdCB3aXRoICR7UFJFRklYfW1lZXRpbmcgaW4gPGNoYW5uZWxfbmFtZT5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWF3YWl0IGd1aWxkU2VydmljZS51bmxvY2tNZWV0aW5nQ2hhbm5lbChtZXNzYWdlLmd1aWxkLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoTWVzc2FnZXMubXlfcGVybWlzc2lvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBUaGUgbWVldGluZyBoYXMgc3RhcnRlZCBhdCAke2NoYW5uZWwubmFtZX0hYCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbXNbMF0udG9Mb3dlckNhc2UoKSA9PT0gXCJlbmRzXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hhbm5lbCA9IGF3YWl0IGd1aWxkU2VydmljZS5nZXRNZWV0aW5nQ2hhbm5lbChtZXNzYWdlLmd1aWxkLmlkKTtcclxuICAgICAgICAgICAgaWYgKCFjaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgWW91IHNob3VsZCB0cnkgc2V0dGluZyB1cCBhIG1lZXRpbmcgY2hhbm5lbCBmaXJzdCB3aXRoICR7UFJFRklYfW1lZXRpbmcgaW4gPGNoYW5uZWxfbmFtZT5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWF3YWl0IGd1aWxkU2VydmljZS5sb2NrTWVldGluZ0NoYW5uZWwobWVzc2FnZS5ndWlsZC5pZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KE1lc3NhZ2VzLm15X3Blcm1pc3Npb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgVGhlIG1lZXRpbmcgYXQgJHtjaGFubmVsLm5hbWV9IGhhcyBlbmRlZCFgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3QgY29tbWFuZHNMaXN0ID0gW1xyXG4gICAgc2V0Q2hhbm5lbCxcclxuICAgIHRvcCxcclxuICAgIHRvcEdsb2JhbCxcclxuICAgIGluYWN0aXZlc0dsb2JhbCxcclxuICAgIGluYWN0aXZlcyxcclxuICAgIG1lZXRpbmdDb21tYW5kcyxcclxuXTtcclxuXHJcbmNvbnN0IGNvbW1hbmRzID0gW2hlbHAsIHNhdmVNZXNzYWdlcywgLi4uY29tbWFuZHNMaXN0XTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRzO1xyXG4iXX0=