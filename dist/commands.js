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
var inactivesGlobal = {
  name: "inactivesGlobal",
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

    function execute(_x2) {
      return _execute2.apply(this, arguments);
    }

    return execute;
  }()
};
var inactives = {
  name: "inactives",
  description: "inactives shows the members with the lowest activity this week",
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

    function execute(_x3) {
      return _execute3.apply(this, arguments);
    }

    return execute;
  }()
};
var top = {
  name: "top",
  description: "top shows the top 10 members based on this week's activity",
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

    function execute(_x4) {
      return _execute4.apply(this, arguments);
    }

    return execute;
  }()
};
var topGlobal = {
  name: "topGlobal",
  description: "topGlobal shows the top 10 members based on activity",
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

    function execute(_x5) {
      return _execute5.apply(this, arguments);
    }

    return execute;
  }()
};

function setDefaultChannel(_x6, _x7) {
  return _setDefaultChannel.apply(this, arguments);
}

function _setDefaultChannel() {
  _setDefaultChannel = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(channel, message) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!(channel[1].type !== "text" || !channel[1].permissionsFor(message.guild.me).has("SEND_MESSAGES"))) {
              _context8.next = 2;
              break;
            }

            return _context8.abrupt("return", message.reply("I can't send messages in that channel"));

          case 2:
            _context8.next = 4;
            return guildService.setDefaultChannel(message.guild.id, channel[1]);

          case 4:
            return _context8.abrupt("return", message.reply("Setting ".concat(channel[1], " for welcome and leaving messages")));

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _setDefaultChannel.apply(this, arguments);
}

var setChannel = {
  name: "setchannel",
  description: "setchannel sets the default channel where I should send welcome/leaving messages",
  execute: function () {
    var _execute6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(message) {
      var params, channel, snowflake, _channel;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              params = util.getParams(message);

              if (!(params.length === 0)) {
                _context6.next = 3;
                break;
              }

              return _context6.abrupt("return", message.reply("setchannel should be followed by the name of the channel. Usage: setchannel ".concat(message.channel)));

            case 3:
              if (!(params[0][0] !== "<")) {
                _context6.next = 10;
                break;
              }

              // It's a channel name
              channel = message.guild.channels.find(function (c) {
                return c[1].name === params[0];
              });

              if (!channel) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", setDefaultChannel(channel, message));

            case 7:
              return _context6.abrupt("return", message.reply("I couldn't find that channel"));

            case 10:
              // It's a channel tag
              snowflake = params[0].substring(2, params[0].length - 1);
              _channel = message.guild.channels.find(function (c) {
                return c[0] === snowflake;
              });

              if (!_channel) {
                _context6.next = 14;
                break;
              }

              return _context6.abrupt("return", setDefaultChannel(_channel, message));

            case 14:
              return _context6.abrupt("return", message.reply("I couldn't find that channel"));

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function execute(_x8) {
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

    function execute(_x9) {
      return _execute7.apply(this, arguments);
    }

    return execute;
  }()
};
var commandsList = [setChannel, top, topGlobal, inactivesGlobal, inactives];
var commands = [help, saveMessages].concat(commandsList);
var _default = commands;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tYW5kcy50cyJdLCJuYW1lcyI6WyJoZWxwIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiZXhlY3V0ZSIsIm1lc3NhZ2UiLCJwYXJhbXMiLCJ1dGlsIiwiZ2V0UGFyYW1zIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwicmVwbHkiLCJjb21tYW5kIiwiY29tbWFuZHNMaXN0IiwiZmluZCIsImMiLCJ0b0xvd2VyQ2FzZSIsImluYWN0aXZlc0dsb2JhbCIsInVzZXJTZXJ2aWNlIiwiZ2V0SW5hY3RpdmVVc2VycyIsImd1aWxkIiwiaWQiLCJ1c2VycyIsImNvbnRlbnQiLCJmb3JFYWNoIiwidXNlciIsImkiLCJ1c2VybmFtZSIsInBvaW50cyIsImNoYW5uZWwiLCJzZW5kIiwiY29kZSIsImluYWN0aXZlcyIsImdldEluYWN0aXZlVXNlcnNUaGlzV2VlayIsInBvaW50c1dlZWtseSIsInRvcCIsImdldE1vc3RBY3RpdmVVc2Vyc1RoaXNXZWVrIiwidG9wR2xvYmFsIiwiZ2V0TW9zdEFjdGl2ZVVzZXJzIiwic2V0RGVmYXVsdENoYW5uZWwiLCJ0eXBlIiwicGVybWlzc2lvbnNGb3IiLCJtZSIsImhhcyIsImd1aWxkU2VydmljZSIsInNldENoYW5uZWwiLCJjaGFubmVscyIsInNub3dmbGFrZSIsInN1YnN0cmluZyIsInNhdmVNZXNzYWdlcyIsIl8iLCJtZXNzYWdlU2VydmljZSIsImNvbW1hbmRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBU0EsSUFBTUEsSUFBYyxHQUFHO0FBQ25CQyxFQUFBQSxJQUFJLEVBQUUsTUFEYTtBQUVuQkMsRUFBQUEsV0FBVyxFQUFFLDZDQUZNO0FBR25CQyxFQUFBQSxPQUFPO0FBQUE7QUFBQTtBQUFBLDRCQUFFLGlCQUFPQyxPQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNDQyxjQUFBQSxNQURELEdBQ1VDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSCxP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QUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFIVSxDQUFyQjtBQVFBLElBQU1wQyxZQUFZLEdBQUcsQ0FDakJnQyxVQURpQixFQUVqQlYsR0FGaUIsRUFHakJFLFNBSGlCLEVBSWpCcEIsZUFKaUIsRUFLakJlLFNBTGlCLENBQXJCO0FBUUEsSUFBTW9CLFFBQVEsSUFBSXBELElBQUosRUFBVWlELFlBQVYsU0FBMkJwQyxZQUEzQixDQUFkO2VBRWV1QyxRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwiZGlzY29yZFV0aWxcIjtcclxuaW1wb3J0ICogYXMgZ3VpbGRTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy9ndWlsZFwiO1xyXG5pbXBvcnQgKiBhcyB1c2VyU2VydmljZSBmcm9tIFwic2VydmljZXMvdXNlclwiO1xyXG5pbXBvcnQgKiBhcyBtZXNzYWdlU2VydmljZSBmcm9tIFwic2VydmljZXMvbWVzc2FnZVwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuXHJcbnR5cGUgQ29tbWFuZCA9IHtcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICBleGVjdXRlOiAobWVzc2FnZTogTWVzc2FnZSkgPT4gUHJvbWlzZTxhbnk+LFxyXG59XHJcblxyXG5jb25zdCBoZWxwIDogQ29tbWFuZCA9IHtcclxuICAgIG5hbWU6IFwiaGVscFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiaGVscCBzaG93cyBpbmZvcm1hdGlvbiBhYm91dCBvdGhlciBjb21tYW5kc1wiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSB1dGlsLmdldFBhcmFtcyhtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHBhcmFtcykgfHwgcGFyYW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcImhlbHAgc2hvdWxkIGJlIGZvbGxvd2VkIGJ5IGEgY29tbWFuZC4gVXNhZ2U6IGhlbHAgc2V0Y2hhbm5lbFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRzTGlzdC5maW5kKFxyXG4gICAgICAgICAgICAoYykgPT4gcGFyYW1zWzBdLnRvTG93ZXJDYXNlKCkgPT09IGMubmFtZS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGNvbW1hbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoY29tbWFuZC5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiaGVscCBzaG91bGQgYmUgZm9sbG93ZWQgYnkgYSBjb21tYW5kLiBVc2FnZTogaGVscCBzZXRjaGFubmVsXCIpO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmNvbnN0IGluYWN0aXZlc0dsb2JhbCA6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcImluYWN0aXZlc0dsb2JhbFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiaW5hY3RpdmVzIHNob3dzIHRoZSBtZW1iZXJzIHdpdGggdGhlIGxvd2VzdCBhY3Rpdml0eVwiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldEluYWN0aXZlVXNlcnMobWVzc2FnZS5ndWlsZC5pZCwgMTApO1xyXG4gICAgICAgIGxldCBjb250ZW50O1xyXG4gICAgICAgIGlmICh1c2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IGBMZWFzdCBhY3RpdmUgbWVtYmVyc1xyXG5SYW5rIHwgTmFtZSB8IFNjb3JlXFxuXFxuYDtcclxuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlciwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPSBgIyR7aSArIDF9OiAke3VzZXIudXNlcm5hbWV9IHwgJHt1c2VyLnBvaW50c30gcG9pbnRzXFxuYDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGVudCA9IFwiVGhlcmUgYXJlIG5vIGluYWN0aXZlIG1lbWJlcnMgaW4gdGhlIHNlcnZlci4gQ29uZ3JhdHVsYXRpb25zIVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGNvbnRlbnQsIHsgY29kZTogdHJ1ZSB9KTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBpbmFjdGl2ZXMgOiBDb21tYW5kID0ge1xyXG4gICAgbmFtZTogXCJpbmFjdGl2ZXNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcImluYWN0aXZlcyBzaG93cyB0aGUgbWVtYmVycyB3aXRoIHRoZSBsb3dlc3QgYWN0aXZpdHkgdGhpcyB3ZWVrXCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0SW5hY3RpdmVVc2Vyc1RoaXNXZWVrKG1lc3NhZ2UuZ3VpbGQuaWQsIDEwKTtcclxuICAgICAgICBsZXQgY29udGVudDtcclxuICAgICAgICBpZiAodXNlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBgTGVhc3QgYWN0aXZlIG1lbWJlcnNcclxuUmFuayB8IE5hbWUgfCBTY29yZVxcblxcbmA7XHJcbiAgICAgICAgICAgIHVzZXJzLmZvckVhY2goKHVzZXIsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gYCMke2kgKyAxfTogJHt1c2VyLnVzZXJuYW1lfSB8ICR7dXNlci5wb2ludHNXZWVrbHl9IHBvaW50c1xcbmA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBcIlRoZXJlIGFyZSBubyBpbmFjdGl2ZSBtZW1iZXJzIHRoaXMgd2Vlay4gQ29uZ3JhdHVsYXRpb25zIVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGNvbnRlbnQsIHsgY29kZTogdHJ1ZSB9KTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCB0b3AgOiBDb21tYW5kICA9IHtcclxuICAgIG5hbWU6IFwidG9wXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJ0b3Agc2hvd3MgdGhlIHRvcCAxMCBtZW1iZXJzIGJhc2VkIG9uIHRoaXMgd2VlaydzIGFjdGl2aXR5XCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0TW9zdEFjdGl2ZVVzZXJzVGhpc1dlZWsobWVzc2FnZS5ndWlsZC5pZCwgMTApO1xyXG4gICAgICAgIGxldCBjb250ZW50O1xyXG4gICAgICAgIGlmICh1c2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IGBNb3N0IGFjdGl2ZSBtZW1iZXJzXHJcblJhbmsgfCBOYW1lIHwgU2NvcmVcXG5cXG5gO1xyXG4gICAgICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9IGAjJHtpICsgMX06ICR7dXNlci51c2VybmFtZX0gfCAke3VzZXIucG9pbnRzV2Vla2x5fSBwb2ludHNcXG5gO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBTaG91bGRuJ3QgaGFwcGVuIGJlY2F1c2UgSSBoYW5kbGUgdGhlIG1lc3NhZ2UgYmVmb3JlIHJ1bm5pbmcgdGhlIGNvbW1hbmRcclxuICAgICAgICAgICAgY29udGVudCA9IFwiVGhlcmUgd2FzIG5vIGFjdGl2aXR5IGluIHRoZSBzZXJ2ZXIgdGhpcyB3ZWVrLlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGNvbnRlbnQsIHsgY29kZTogdHJ1ZSB9KTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCB0b3BHbG9iYWwgOiBDb21tYW5kICA9IHtcclxuICAgIG5hbWU6IFwidG9wR2xvYmFsXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJ0b3BHbG9iYWwgc2hvd3MgdGhlIHRvcCAxMCBtZW1iZXJzIGJhc2VkIG9uIGFjdGl2aXR5XCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0TW9zdEFjdGl2ZVVzZXJzKG1lc3NhZ2UuZ3VpbGQuaWQsIDEwKTtcclxuICAgICAgICBsZXQgY29udGVudDtcclxuICAgICAgICBpZiAodXNlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBgTW9zdCBhY3RpdmUgbWVtYmVyc1xyXG5SYW5rIHwgTmFtZSB8IFNjb3JlXFxuXFxuYDtcclxuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlciwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPSBgIyR7aSArIDF9OiAke3VzZXIudXNlcm5hbWV9IHwgJHt1c2VyLnBvaW50c30gcG9pbnRzXFxuYDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gU2hvdWxkbid0IGhhcHBlbiBiZWNhdXNlIEkgaGFuZGxlIHRoZSBtZXNzYWdlIGJlZm9yZSBydW5uaW5nIHRoZSBjb21tYW5kXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBcIlRoZXJlIHdhcyBubyBhY3Rpdml0eSBpbiB0aGUgc2VydmVyLi4uIEV2ZXIuXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoY29udGVudCwgeyBjb2RlOiB0cnVlIH0pO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNldERlZmF1bHRDaGFubmVsKGNoYW5uZWwsIG1lc3NhZ2UpIHtcclxuICAgIGlmIChjaGFubmVsWzFdLnR5cGUgIT09IFwidGV4dFwiIHx8ICFjaGFubmVsWzFdLnBlcm1pc3Npb25zRm9yKG1lc3NhZ2UuZ3VpbGQubWUpLmhhcyhcIlNFTkRfTUVTU0FHRVNcIikpIHtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcIkkgY2FuJ3Qgc2VuZCBtZXNzYWdlcyBpbiB0aGF0IGNoYW5uZWxcIik7XHJcbiAgICB9XHJcbiAgICBhd2FpdCBndWlsZFNlcnZpY2Uuc2V0RGVmYXVsdENoYW5uZWwobWVzc2FnZS5ndWlsZC5pZCwgY2hhbm5lbFsxXSk7XHJcbiAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgU2V0dGluZyAke2NoYW5uZWxbMV19IGZvciB3ZWxjb21lIGFuZCBsZWF2aW5nIG1lc3NhZ2VzYCk7XHJcbn1cclxuXHJcbmNvbnN0IHNldENoYW5uZWwgPSB7XHJcbiAgICBuYW1lOiBcInNldGNoYW5uZWxcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcInNldGNoYW5uZWwgc2V0cyB0aGUgZGVmYXVsdCBjaGFubmVsIHdoZXJlIEkgc2hvdWxkIHNlbmQgd2VsY29tZS9sZWF2aW5nIG1lc3NhZ2VzXCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHV0aWwuZ2V0UGFyYW1zKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgc2V0Y2hhbm5lbCBzaG91bGQgYmUgZm9sbG93ZWQgYnkgdGhlIG5hbWUgb2YgdGhlIGNoYW5uZWwuIFVzYWdlOiBzZXRjaGFubmVsICR7bWVzc2FnZS5jaGFubmVsfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcmFtc1swXVswXSAhPT0gXCI8XCIpIHtcclxuICAgICAgICAgICAgLy8gSXQncyBhIGNoYW5uZWwgbmFtZVxyXG4gICAgICAgICAgICBjb25zdCBjaGFubmVsID0gbWVzc2FnZS5ndWlsZC5jaGFubmVscy5maW5kKFxyXG4gICAgICAgICAgICAgICAgKGMpID0+IGNbMV0ubmFtZSA9PT0gcGFyYW1zWzBdLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoY2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldERlZmF1bHRDaGFubmVsKGNoYW5uZWwsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiSSBjb3VsZG4ndCBmaW5kIHRoYXQgY2hhbm5lbFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBJdCdzIGEgY2hhbm5lbCB0YWdcclxuICAgICAgICAgICAgY29uc3Qgc25vd2ZsYWtlID0gcGFyYW1zWzBdLnN1YnN0cmluZygyLCBwYXJhbXNbMF0ubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWwgPSBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAoYykgPT4gY1swXSA9PT0gc25vd2ZsYWtlLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoY2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldERlZmF1bHRDaGFubmVsKGNoYW5uZWwsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiSSBjb3VsZG4ndCBmaW5kIHRoYXQgY2hhbm5lbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3Qgc2F2ZU1lc3NhZ2VzID0ge1xyXG4gICAgbmFtZTogXCJzYXZlTWVzc2FnZXNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIllvdSBzaG91bGRuJ3QgYmUgc2VlaW5nIHRoaXNcIixcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChfKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VTZXJ2aWNlLnNhdmVNZXNzYWdlcygpO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmNvbnN0IGNvbW1hbmRzTGlzdCA9IFtcclxuICAgIHNldENoYW5uZWwsXHJcbiAgICB0b3AsXHJcbiAgICB0b3BHbG9iYWwsXHJcbiAgICBpbmFjdGl2ZXNHbG9iYWwsXHJcbiAgICBpbmFjdGl2ZXMsXHJcbl07XHJcblxyXG5jb25zdCBjb21tYW5kcyA9IFtoZWxwLCBzYXZlTWVzc2FnZXMsIC4uLmNvbW1hbmRzTGlzdF07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tYW5kcztcclxuIl19