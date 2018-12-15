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
                _context8.next = 26;
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
              return _context8.abrupt("return", message.reply("The meeting has started at ".concat(_channel.name, "!")));

            case 26:
              if (!(params[0].toLowerCase() === "ends")) {
                _context8.next = 35;
                break;
              }

              _context8.next = 29;
              return guildService.getMeetingChannel(message.guild.id);

            case 29:
              _channel2 = _context8.sent;

              if (_channel2) {
                _context8.next = 32;
                break;
              }

              return _context8.abrupt("return", message.reply("You should try setting up a meeting channel first with ".concat(PREFIX, "meeting in <channel_name>")));

            case 32:
              _context8.next = 34;
              return guildService.lockMeetingChannel(message.guild.id);

            case 34:
              return _context8.abrupt("return", message.reply("The meeting at ".concat(_channel2.name, " has ended!")));

            case 35:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tYW5kcy50cyJdLCJuYW1lcyI6WyJQUkVGSVgiLCJwcm9jZXNzIiwiZW52IiwiaGVscCIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImV4ZWN1dGUiLCJtZXNzYWdlIiwicGFyYW1zIiwibGVuZ3RoIiwiY29tbWFuZHNEZXNjcmlwdGlvbnMiLCJjb21tYW5kc0xpc3QiLCJtYXAiLCJjIiwiam9pbiIsInJlcGx5IiwiY29tbWFuZCIsImZpbmQiLCJ0b0xvd2VyQ2FzZSIsImluYWN0aXZlc0dsb2JhbCIsInVzZXJTZXJ2aWNlIiwiZ2V0SW5hY3RpdmVVc2VycyIsImd1aWxkIiwiaWQiLCJ1c2VycyIsImNvbnRlbnQiLCJmb3JFYWNoIiwidXNlciIsImkiLCJ1c2VybmFtZSIsInBvaW50cyIsImNoYW5uZWwiLCJzZW5kIiwiY29kZSIsImluYWN0aXZlcyIsImdldEluYWN0aXZlVXNlcnNUaGlzV2VlayIsInBvaW50c1dlZWtseSIsInRvcCIsImdldE1vc3RBY3RpdmVVc2Vyc1RoaXNXZWVrIiwidG9wR2xvYmFsIiwiZ2V0TW9zdEFjdGl2ZVVzZXJzIiwic2V0RGVmYXVsdENoYW5uZWwiLCJ0eXBlIiwicGVybWlzc2lvbnNGb3IiLCJtZSIsImhhcyIsImd1aWxkU2VydmljZSIsInNldENoYW5uZWwiLCJ1dGlscyIsImZpbmRDaGFubmVsIiwiY2hhbm5lbHMiLCJzYXZlTWVzc2FnZXMiLCJfIiwibWVzc2FnZVNlcnZpY2UiLCJtZWV0aW5nQ29tbWFuZHMiLCJzZXRNZWV0aW5nQ2hhbm5lbCIsImdldE1lZXRpbmdDaGFubmVsIiwidW5sb2NrTWVldGluZ0NoYW5uZWwiLCJsb2NrTWVldGluZ0NoYW5uZWwiLCJjb21tYW5kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztJQUVRQSxNLEdBQVdDLE9BQU8sQ0FBQ0MsRyxDQUFuQkYsTTtBQVFSLElBQU1HLElBQWMsR0FBRztBQUNuQkMsRUFBQUEsSUFBSSxF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LEVBQVVnRCxZQUFWLFNBQTJCeEMsWUFBM0IsQ0FBZDtlQUVlZ0QsUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UsIFRleHRDaGFubmVsIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuXHJcbmltcG9ydCAqIGFzIGd1aWxkU2VydmljZSBmcm9tIFwic2VydmljZXMvZ3VpbGRcIjtcclxuaW1wb3J0ICogYXMgdXNlclNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL3VzZXJcIjtcclxuaW1wb3J0ICogYXMgbWVzc2FnZVNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL21lc3NhZ2VcIjtcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcImRpc2NvcmRVdGlsXCI7XHJcblxyXG5jb25zdCB7IFBSRUZJWCB9ID0gcHJvY2Vzcy5lbnY7XHJcblxyXG50eXBlIENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgZXhlY3V0ZTogKG1lc3NhZ2U6IE1lc3NhZ2UsIHBhcmFtcz86IHN0cmluZ1tdKSA9PiBQcm9taXNlPGFueT4sXHJcbn1cclxuXHJcbmNvbnN0IGhlbHAgOiBDb21tYW5kID0ge1xyXG4gICAgbmFtZTogXCJoZWxwXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJTaG93cyBpbmZvcm1hdGlvbiBhYm91dCBvdGhlciBjb21tYW5kc1wiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UsIHBhcmFtcykgPT4ge1xyXG5cclxuICAgICAgICBpZiAoIXBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tbWFuZHNEZXNjcmlwdGlvbnMgPSBjb21tYW5kc0xpc3RcclxuICAgICAgICAgICAgICAgIC5tYXAoKGMpID0+IGAke1BSRUZJWH0ke2MubmFtZX0gJHtjLmRlc2NyaXB0aW9ufWApXHJcbiAgICAgICAgICAgICAgICAuam9pbihcIlxcbi0gXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBUaGlzIGlzIGEgbGlzdCBvZiB0aGUgYXZhaWxhYmxlIGNvbW1hbmRzLiBUeXBlICR7UFJFRklYfWhlbHAgPGNvbW1hbmQ+IGZvciBtb3JlIGRldGFpbHMuXFxuLSAke2NvbW1hbmRzRGVzY3JpcHRpb25zfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjb21tYW5kID0gY29tbWFuZHNMaXN0LmZpbmQoXHJcbiAgICAgICAgICAgIChjKSA9PiBwYXJhbXNbMF0udG9Mb3dlckNhc2UoKSA9PT0gYy5uYW1lLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoY29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShjb21tYW5kLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJoZWxwIHNob3VsZCBiZSBmb2xsb3dlZCBieSBhIGNvbW1hbmQuIFVzYWdlOiBoZWxwIHNldGNoYW5uZWxcIik7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3QgaW5hY3RpdmVzR2xvYmFsIDogQ29tbWFuZCA9IHtcclxuICAgIG5hbWU6IFwiaW5hY3RpdmVzR2xvYmFsXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJTaG93cyB0aGUgbWVtYmVycyB3aXRoIHRoZSBsb3dlc3QgYWN0aXZpdHlcIixcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCB1c2VyU2VydmljZS5nZXRJbmFjdGl2ZVVzZXJzKG1lc3NhZ2UuZ3VpbGQuaWQsIDEwKTtcclxuICAgICAgICBsZXQgY29udGVudDtcclxuICAgICAgICBpZiAodXNlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBgTGVhc3QgYWN0aXZlIG1lbWJlcnNcclxuUmFuayB8IE5hbWUgfCBTY29yZVxcblxcbmA7XHJcbiAgICAgICAgICAgIHVzZXJzLmZvckVhY2goKHVzZXIsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gYCMke2kgKyAxfTogJHt1c2VyLnVzZXJuYW1lfSB8ICR7dXNlci5wb2ludHN9IHBvaW50c1xcbmA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBcIlRoZXJlIGFyZSBubyBpbmFjdGl2ZSBtZW1iZXJzIGluIHRoZSBzZXJ2ZXIuIENvbmdyYXR1bGF0aW9ucyFcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChjb250ZW50LCB7IGNvZGU6IHRydWUgfSk7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3QgaW5hY3RpdmVzIDogQ29tbWFuZCA9IHtcclxuICAgIG5hbWU6IFwiaW5hY3RpdmVzXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJTaG93cyB0aGUgbWVtYmVycyB3aXRoIHRoZSBsb3dlc3QgYWN0aXZpdHkgdGhpcyB3ZWVrXCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0SW5hY3RpdmVVc2Vyc1RoaXNXZWVrKG1lc3NhZ2UuZ3VpbGQuaWQsIDEwKTtcclxuICAgICAgICBsZXQgY29udGVudDtcclxuICAgICAgICBpZiAodXNlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBgTGVhc3QgYWN0aXZlIG1lbWJlcnNcclxuUmFuayB8IE5hbWUgfCBTY29yZVxcblxcbmA7XHJcbiAgICAgICAgICAgIHVzZXJzLmZvckVhY2goKHVzZXIsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gYCMke2kgKyAxfTogJHt1c2VyLnVzZXJuYW1lfSB8ICR7dXNlci5wb2ludHNXZWVrbHl9IHBvaW50c1xcbmA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBcIlRoZXJlIGFyZSBubyBpbmFjdGl2ZSBtZW1iZXJzIHRoaXMgd2Vlay4gQ29uZ3JhdHVsYXRpb25zIVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGNvbnRlbnQsIHsgY29kZTogdHJ1ZSB9KTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCB0b3AgOiBDb21tYW5kICA9IHtcclxuICAgIG5hbWU6IFwidG9wXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJTaG93cyB0aGUgdG9wIDEwIG1lbWJlcnMgYmFzZWQgb24gdGhpcyB3ZWVrJ3MgYWN0aXZpdHlcIixcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCB1c2VyU2VydmljZS5nZXRNb3N0QWN0aXZlVXNlcnNUaGlzV2VlayhtZXNzYWdlLmd1aWxkLmlkLCAxMCk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ7XHJcbiAgICAgICAgaWYgKHVzZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gYE1vc3QgYWN0aXZlIG1lbWJlcnNcclxuUmFuayB8IE5hbWUgfCBTY29yZVxcblxcbmA7XHJcbiAgICAgICAgICAgIHVzZXJzLmZvckVhY2goKHVzZXIsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gYCMke2kgKyAxfTogJHt1c2VyLnVzZXJuYW1lfSB8ICR7dXNlci5wb2ludHNXZWVrbHl9IHBvaW50c1xcbmA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFNob3VsZG4ndCBoYXBwZW4gYmVjYXVzZSBJIGhhbmRsZSB0aGUgbWVzc2FnZSBiZWZvcmUgcnVubmluZyB0aGUgY29tbWFuZFxyXG4gICAgICAgICAgICBjb250ZW50ID0gXCJUaGVyZSB3YXMgbm8gYWN0aXZpdHkgaW4gdGhlIHNlcnZlciB0aGlzIHdlZWsuXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoY29udGVudCwgeyBjb2RlOiB0cnVlIH0pO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmNvbnN0IHRvcEdsb2JhbCA6IENvbW1hbmQgID0ge1xyXG4gICAgbmFtZTogXCJ0b3BHbG9iYWxcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3dzIHRoZSB0b3AgMTAgbWVtYmVycyBiYXNlZCBvbiBhY3Rpdml0eVwiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldE1vc3RBY3RpdmVVc2VycyhtZXNzYWdlLmd1aWxkLmlkLCAxMCk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ7XHJcbiAgICAgICAgaWYgKHVzZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gYE1vc3QgYWN0aXZlIG1lbWJlcnNcclxuUmFuayB8IE5hbWUgfCBTY29yZVxcblxcbmA7XHJcbiAgICAgICAgICAgIHVzZXJzLmZvckVhY2goKHVzZXIsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gYCMke2kgKyAxfTogJHt1c2VyLnVzZXJuYW1lfSB8ICR7dXNlci5wb2ludHN9IHBvaW50c1xcbmA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFNob3VsZG4ndCBoYXBwZW4gYmVjYXVzZSBJIGhhbmRsZSB0aGUgbWVzc2FnZSBiZWZvcmUgcnVubmluZyB0aGUgY29tbWFuZFxyXG4gICAgICAgICAgICBjb250ZW50ID0gXCJUaGVyZSB3YXMgbm8gYWN0aXZpdHkgaW4gdGhlIHNlcnZlci4uLiBFdmVyLlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGNvbnRlbnQsIHsgY29kZTogdHJ1ZSB9KTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzZXREZWZhdWx0Q2hhbm5lbChjaGFubmVsLCBtZXNzYWdlKSB7XHJcbiAgICBpZiAoY2hhbm5lbFsxXS50eXBlICE9PSBcInRleHRcIiB8fCAhY2hhbm5lbFsxXS5wZXJtaXNzaW9uc0ZvcihtZXNzYWdlLmd1aWxkLm1lKS5oYXMoXCJTRU5EX01FU1NBR0VTXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJJIGNhbid0IHNlbmQgbWVzc2FnZXMgaW4gdGhhdCBjaGFubmVsXCIpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgZ3VpbGRTZXJ2aWNlLnNldERlZmF1bHRDaGFubmVsKG1lc3NhZ2UuZ3VpbGQuaWQsIGNoYW5uZWxbMV0pO1xyXG4gICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYFNldHRpbmcgJHtjaGFubmVsWzFdfSBmb3Igd2VsY29tZSBhbmQgbGVhdmluZyBtZXNzYWdlc2ApO1xyXG59XHJcblxyXG5jb25zdCBzZXRDaGFubmVsOiBDb21tYW5kID0ge1xyXG4gICAgbmFtZTogXCJzZXRjaGFubmVsXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJTZXRzIHRoZSBkZWZhdWx0IGNoYW5uZWwgd2hlcmUgSSBzaG91bGQgc2VuZCB3ZWxjb21lL2xlYXZpbmcgbWVzc2FnZXNcIixcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChtZXNzYWdlLCBwYXJhbXMpID0+IHtcclxuICAgICAgICBpZiAoIXBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYCR7UFJFRklYfXNldGNoYW5uZWwgc2hvdWxkIGJlIGZvbGxvd2VkIGJ5IHRoZSBuYW1lIG9mIHRoZSBjaGFubmVsLiBVc2FnZTogJHtQUkVGSVh9c2V0Y2hhbm5lbCAke21lc3NhZ2UuY2hhbm5lbH1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IGF3YWl0IHV0aWxzLmZpbmRDaGFubmVsKHBhcmFtc1swXSwgbWVzc2FnZS5ndWlsZC5jaGFubmVscyk7XHJcblxyXG4gICAgICAgIGlmIChjaGFubmVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXREZWZhdWx0Q2hhbm5lbChjaGFubmVsLCBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJJIGNvdWxkbid0IGZpbmQgdGhhdCBjaGFubmVsXCIpO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmNvbnN0IHNhdmVNZXNzYWdlczogQ29tbWFuZCA9IHtcclxuICAgIG5hbWU6IFwic2F2ZU1lc3NhZ2VzXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJZb3Ugc2hvdWxkbid0IGJlIHNlZWluZyB0aGlzXCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAoXykgPT4ge1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlU2VydmljZS5zYXZlTWVzc2FnZXMoKTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBtZWV0aW5nQ29tbWFuZHM6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcIm1lZXRpbmdcIixcclxuICAgIGRlc2NyaXB0aW9uOiBgJHtQUkVGSVh9bWVldGluZyBzdGFydHMgdW5sb2NrcyB0aGUgbWVldGluZyBjaGFubmVsIGFuZCAke1BSRUZJWH1tZWV0aW5nIGluIDxjaGFubmVsX25hbWU+IHNldHMgPGNoYW5uZWxfbmFtZT4gdG8gYmUgdGhlIG1lZXRpbmcgY2hhbm5lbCwgbG9ja2luZyBpdCB1bnRpbCBhIG1lZXRpbmcgc3RhcnRzYCxcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChtZXNzYWdlLCBwYXJhbXMpID0+IHtcclxuICAgICAgICBpZiAoIXBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYCR7UFJFRklYfW1lZXRpbmcgc2hvdWxkIGJlIGZvbGxvd2VkIGJ5IHBhcmFtZXRlcnMuIEZvciBleGFtcGxlLCAke1BSRUZJWH1tZWV0aW5nIHN0YXJ0cyB1bmxvY2tzIHRoZSBtZWV0aW5nIGNoYW5uZWwgYW5kICR7UFJFRklYfW1lZXRpbmcgaW4gJHttZXNzYWdlLmNoYW5uZWx9IHNldHMgJHttZXNzYWdlLmNoYW5uZWx9IHRvIGJlIHRoZSBtZWV0aW5nIGNoYW5uZWwsIGxvY2tpbmcgaXQgdW50aWwgYSBtZWV0aW5nIHN0YXJ0c2ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyYW1zWzBdLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5cIikge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGAke1BSRUZJWH1tZWV0aW5nIHNob3VsZCBiZSBmb2xsb3dlZCBieSBwYXJhbWV0ZXJzLiBGb3IgZXhhbXBsZSwgJHtQUkVGSVh9bWVldGluZyBzdGFydHMgdW5sb2NrcyB0aGUgbWVldGluZyBjaGFubmVsIGFuZCAke1BSRUZJWH1tZWV0aW5nIGluICR7bWVzc2FnZS5jaGFubmVsfSBzZXRzICR7bWVzc2FnZS5jaGFubmVsfSB0byBiZSB0aGUgbWVldGluZyBjaGFubmVsLCBsb2NraW5nIGl0IHVudGlsIGEgbWVldGluZyBzdGFydHNgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBjaGFubmVsID0gdXRpbHMuZmluZENoYW5uZWwocGFyYW1zWzFdLCBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWF3YWl0IGd1aWxkU2VydmljZS5zZXRNZWV0aW5nQ2hhbm5lbChjaGFubmVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiSSBkb24ndCBoYXZlIHBlcm1pc3Npb25zIGZvciB0aGF0XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYFNldHRpbmcgJHtjaGFubmVsfSBhcyBtZWV0aW5nIGNoYW5uZWxgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcIkkgY291bGRuJ3QgZmluZCB0aGF0IGNoYW5uZWxcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbXNbMF0udG9Mb3dlckNhc2UoKSA9PT0gXCJzdGFydHNcIikge1xyXG4gICAgICAgICAgICBjb25zdCBjaGFubmVsID0gYXdhaXQgZ3VpbGRTZXJ2aWNlLmdldE1lZXRpbmdDaGFubmVsKG1lc3NhZ2UuZ3VpbGQuaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBZb3Ugc2hvdWxkIHRyeSBzZXR0aW5nIHVwIGEgbWVldGluZyBjaGFubmVsIGZpcnN0IHdpdGggJHtQUkVGSVh9bWVldGluZyBpbiA8Y2hhbm5lbF9uYW1lPmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGF3YWl0IGd1aWxkU2VydmljZS51bmxvY2tNZWV0aW5nQ2hhbm5lbChtZXNzYWdlLmd1aWxkLmlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYFRoZSBtZWV0aW5nIGhhcyBzdGFydGVkIGF0ICR7Y2hhbm5lbC5uYW1lfSFgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtc1swXS50b0xvd2VyQ2FzZSgpID09PSBcImVuZHNcIikge1xyXG4gICAgICAgICAgICBjb25zdCBjaGFubmVsID0gYXdhaXQgZ3VpbGRTZXJ2aWNlLmdldE1lZXRpbmdDaGFubmVsKG1lc3NhZ2UuZ3VpbGQuaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBZb3Ugc2hvdWxkIHRyeSBzZXR0aW5nIHVwIGEgbWVldGluZyBjaGFubmVsIGZpcnN0IHdpdGggJHtQUkVGSVh9bWVldGluZyBpbiA8Y2hhbm5lbF9uYW1lPmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGF3YWl0IGd1aWxkU2VydmljZS5sb2NrTWVldGluZ0NoYW5uZWwobWVzc2FnZS5ndWlsZC5pZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBUaGUgbWVldGluZyBhdCAke2NoYW5uZWwubmFtZX0gaGFzIGVuZGVkIWApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBjb21tYW5kc0xpc3QgPSBbXHJcbiAgICBzZXRDaGFubmVsLFxyXG4gICAgdG9wLFxyXG4gICAgdG9wR2xvYmFsLFxyXG4gICAgaW5hY3RpdmVzR2xvYmFsLFxyXG4gICAgaW5hY3RpdmVzLFxyXG4gICAgbWVldGluZ0NvbW1hbmRzLFxyXG5dO1xyXG5cclxuY29uc3QgY29tbWFuZHMgPSBbaGVscCwgc2F2ZU1lc3NhZ2VzLCAuLi5jb21tYW5kc0xpc3RdO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZHM7XHJcbiJdfQ==