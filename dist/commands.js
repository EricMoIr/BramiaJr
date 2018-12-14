"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var guildService = _interopRequireWildcard(require("services/guild"));

var userService = _interopRequireWildcard(require("services/user"));

var messageService = _interopRequireWildcard(require("services/message"));

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
  description: "Sets the default channel where I should send welcome/leaving messages",
  execute: function () {
    var _execute6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(message, params) {
      var channel, snowflake, _channel;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(params.length === 0)) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return", message.reply("setchannel should be followed by the name of the channel. Usage: setchannel ".concat(message.channel)));

            case 2:
              if (!(params[0][0] !== "<")) {
                _context6.next = 9;
                break;
              }

              // It's a channel name
              channel = message.guild.channels.find(function (c) {
                return c[1].name === params[0];
              });

              if (!channel) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", setDefaultChannel(channel, message));

            case 6:
              return _context6.abrupt("return", message.reply("I couldn't find that channel"));

            case 9:
              // It's a channel tag
              snowflake = params[0].substring(2, params[0].length - 1);
              _channel = message.guild.channels.find(function (c) {
                return c[0] === snowflake;
              });

              if (!_channel) {
                _context6.next = 13;
                break;
              }

              return _context6.abrupt("return", setDefaultChannel(_channel, message));

            case 13:
              return _context6.abrupt("return", message.reply("I couldn't find that channel"));

            case 14:
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
var commandsList = [setChannel, top, topGlobal, inactivesGlobal, inactives];
var commands = [help, saveMessages].concat(commandsList);
var _default = commands;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tYW5kcy50cyJdLCJuYW1lcyI6WyJQUkVGSVgiLCJwcm9jZXNzIiwiZW52IiwiaGVscCIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImV4ZWN1dGUiLCJtZXNzYWdlIiwicGFyYW1zIiwibGVuZ3RoIiwiY29tbWFuZHNEZXNjcmlwdGlvbnMiLCJjb21tYW5kc0xpc3QiLCJtYXAiLCJjIiwiam9pbiIsInJlcGx5IiwiY29tbWFuZCIsImZpbmQiLCJ0b0xvd2VyQ2FzZSIsImluYWN0aXZlc0dsb2JhbCIsInVzZXJTZXJ2aWNlIiwiZ2V0SW5hY3RpdmVVc2VycyIsImd1aWxkIiwiaWQiLCJ1c2VycyIsImNvbnRlbnQiLCJmb3JFYWNoIiwidXNlciIsImkiLCJ1c2VybmFtZSIsInBvaW50cyIsImNoYW5uZWwiLCJzZW5kIiwiY29kZSIsImluYWN0aXZlcyIsImdldEluYWN0aXZlVXNlcnNUaGlzV2VlayIsInBvaW50c1dlZWtseSIsInRvcCIsImdldE1vc3RBY3RpdmVVc2Vyc1RoaXNXZWVrIiwidG9wR2xvYmFsIiwiZ2V0TW9zdEFjdGl2ZVVzZXJzIiwic2V0RGVmYXVsdENoYW5uZWwiLCJ0eXBlIiwicGVybWlzc2lvbnNGb3IiLCJtZSIsImhhcyIsImd1aWxkU2VydmljZSIsInNldENoYW5uZWwiLCJjaGFubmVscyIsInNub3dmbGFrZSIsInN1YnN0cmluZyIsInNhdmVNZXNzYWdlcyIsIl8iLCJtZXNzYWdlU2VydmljZSIsImNvbW1hbmRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0lBR1FBLE0sR0FBV0MsT0FBTyxDQUFDQyxHLENBQW5CRixNO0FBUVIsSUFBTUcsSUFBYyxHQUFHO0FBQ25CQyxFQUFBQSxJQUFJLEVBQUUsTUFEYTtBQUVuQkMsRUFBQUEsV0FBVyxFQUFFLHdDQUZNO0FBR25CQyxFQUFBQSxPQUFPO0FBQUE7QUFBQTtBQUFBLDRCQUFFLGlCQUFPQyxPQUFQLEVBQWdCQyxNQUFoQjtBQUFB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RSxrQkFBTzhDLENBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdEQUNFQyxjQUFjLENBQUNGLFlBQWYsRUFERjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFGOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBSG1CLENBQTlCO0FBUUEsSUFBTXhDLFlBQVksR0FBRyxDQUNqQm9DLFVBRGlCLEVBRWpCVixHQUZpQixFQUdqQkUsU0FIaUIsRUFJakJwQixlQUppQixFQUtqQmUsU0FMaUIsQ0FBckI7QUFRQSxJQUFNb0IsUUFBUSxJQUFJbkQsSUFBSixFQUFVZ0QsWUFBVixTQUEyQnhDLFlBQTNCLENBQWQ7ZUFFZTJDLFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBndWlsZFNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL2d1aWxkXCI7XHJcbmltcG9ydCAqIGFzIHVzZXJTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy91c2VyXCI7XHJcbmltcG9ydCAqIGFzIG1lc3NhZ2VTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy9tZXNzYWdlXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5cclxuY29uc3QgeyBQUkVGSVggfSA9IHByb2Nlc3MuZW52O1xyXG5cclxudHlwZSBDb21tYW5kID0ge1xyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIGV4ZWN1dGU6IChtZXNzYWdlOiBNZXNzYWdlLCBwYXJhbXM/OiBzdHJpbmdbXSkgPT4gUHJvbWlzZTxhbnk+LFxyXG59XHJcblxyXG5jb25zdCBoZWxwIDogQ29tbWFuZCA9IHtcclxuICAgIG5hbWU6IFwiaGVscFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiU2hvd3MgaW5mb3JtYXRpb24gYWJvdXQgb3RoZXIgY29tbWFuZHNcIixcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChtZXNzYWdlLCBwYXJhbXMpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKCFwYXJhbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRzRGVzY3JpcHRpb25zID0gY29tbWFuZHNMaXN0XHJcbiAgICAgICAgICAgICAgICAubWFwKChjKSA9PiBgJHtQUkVGSVh9JHtjLm5hbWV9ICR7Yy5kZXNjcmlwdGlvbn1gKVxyXG4gICAgICAgICAgICAgICAgLmpvaW4oXCJcXG4tIFwiKVxyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgVGhpcyBpcyBhIGxpc3Qgb2YgdGhlIGF2YWlsYWJsZSBjb21tYW5kcy4gVHlwZSAke1BSRUZJWH1oZWxwIDxjb21tYW5kPiBmb3IgbW9yZSBkZXRhaWxzLlxcbi0gJHtjb21tYW5kc0Rlc2NyaXB0aW9uc31gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRzTGlzdC5maW5kKFxyXG4gICAgICAgICAgICAoYykgPT4gcGFyYW1zWzBdLnRvTG93ZXJDYXNlKCkgPT09IGMubmFtZS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGNvbW1hbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoY29tbWFuZC5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiaGVscCBzaG91bGQgYmUgZm9sbG93ZWQgYnkgYSBjb21tYW5kLiBVc2FnZTogaGVscCBzZXRjaGFubmVsXCIpO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmNvbnN0IGluYWN0aXZlc0dsb2JhbCA6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcImluYWN0aXZlc0dsb2JhbFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiU2hvd3MgdGhlIG1lbWJlcnMgd2l0aCB0aGUgbG93ZXN0IGFjdGl2aXR5XCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0SW5hY3RpdmVVc2VycyhtZXNzYWdlLmd1aWxkLmlkLCAxMCk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ7XHJcbiAgICAgICAgaWYgKHVzZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gYExlYXN0IGFjdGl2ZSBtZW1iZXJzXHJcblJhbmsgfCBOYW1lIHwgU2NvcmVcXG5cXG5gO1xyXG4gICAgICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9IGAjJHtpICsgMX06ICR7dXNlci51c2VybmFtZX0gfCAke3VzZXIucG9pbnRzfSBwb2ludHNcXG5gO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gXCJUaGVyZSBhcmUgbm8gaW5hY3RpdmUgbWVtYmVycyBpbiB0aGUgc2VydmVyLiBDb25ncmF0dWxhdGlvbnMhXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoY29udGVudCwgeyBjb2RlOiB0cnVlIH0pO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmNvbnN0IGluYWN0aXZlcyA6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcImluYWN0aXZlc1wiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiU2hvd3MgdGhlIG1lbWJlcnMgd2l0aCB0aGUgbG93ZXN0IGFjdGl2aXR5IHRoaXMgd2Vla1wiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldEluYWN0aXZlVXNlcnNUaGlzV2VlayhtZXNzYWdlLmd1aWxkLmlkLCAxMCk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ7XHJcbiAgICAgICAgaWYgKHVzZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gYExlYXN0IGFjdGl2ZSBtZW1iZXJzXHJcblJhbmsgfCBOYW1lIHwgU2NvcmVcXG5cXG5gO1xyXG4gICAgICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9IGAjJHtpICsgMX06ICR7dXNlci51c2VybmFtZX0gfCAke3VzZXIucG9pbnRzV2Vla2x5fSBwb2ludHNcXG5gO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gXCJUaGVyZSBhcmUgbm8gaW5hY3RpdmUgbWVtYmVycyB0aGlzIHdlZWsuIENvbmdyYXR1bGF0aW9ucyFcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChjb250ZW50LCB7IGNvZGU6IHRydWUgfSk7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3QgdG9wIDogQ29tbWFuZCAgPSB7XHJcbiAgICBuYW1lOiBcInRvcFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiU2hvd3MgdGhlIHRvcCAxMCBtZW1iZXJzIGJhc2VkIG9uIHRoaXMgd2VlaydzIGFjdGl2aXR5XCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0TW9zdEFjdGl2ZVVzZXJzVGhpc1dlZWsobWVzc2FnZS5ndWlsZC5pZCwgMTApO1xyXG4gICAgICAgIGxldCBjb250ZW50O1xyXG4gICAgICAgIGlmICh1c2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IGBNb3N0IGFjdGl2ZSBtZW1iZXJzXHJcblJhbmsgfCBOYW1lIHwgU2NvcmVcXG5cXG5gO1xyXG4gICAgICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9IGAjJHtpICsgMX06ICR7dXNlci51c2VybmFtZX0gfCAke3VzZXIucG9pbnRzV2Vla2x5fSBwb2ludHNcXG5gO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBTaG91bGRuJ3QgaGFwcGVuIGJlY2F1c2UgSSBoYW5kbGUgdGhlIG1lc3NhZ2UgYmVmb3JlIHJ1bm5pbmcgdGhlIGNvbW1hbmRcclxuICAgICAgICAgICAgY29udGVudCA9IFwiVGhlcmUgd2FzIG5vIGFjdGl2aXR5IGluIHRoZSBzZXJ2ZXIgdGhpcyB3ZWVrLlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGNvbnRlbnQsIHsgY29kZTogdHJ1ZSB9KTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCB0b3BHbG9iYWwgOiBDb21tYW5kICA9IHtcclxuICAgIG5hbWU6IFwidG9wR2xvYmFsXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJTaG93cyB0aGUgdG9wIDEwIG1lbWJlcnMgYmFzZWQgb24gYWN0aXZpdHlcIixcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCB1c2VyU2VydmljZS5nZXRNb3N0QWN0aXZlVXNlcnMobWVzc2FnZS5ndWlsZC5pZCwgMTApO1xyXG4gICAgICAgIGxldCBjb250ZW50O1xyXG4gICAgICAgIGlmICh1c2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IGBNb3N0IGFjdGl2ZSBtZW1iZXJzXHJcblJhbmsgfCBOYW1lIHwgU2NvcmVcXG5cXG5gO1xyXG4gICAgICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9IGAjJHtpICsgMX06ICR7dXNlci51c2VybmFtZX0gfCAke3VzZXIucG9pbnRzfSBwb2ludHNcXG5gO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBTaG91bGRuJ3QgaGFwcGVuIGJlY2F1c2UgSSBoYW5kbGUgdGhlIG1lc3NhZ2UgYmVmb3JlIHJ1bm5pbmcgdGhlIGNvbW1hbmRcclxuICAgICAgICAgICAgY29udGVudCA9IFwiVGhlcmUgd2FzIG5vIGFjdGl2aXR5IGluIHRoZSBzZXJ2ZXIuLi4gRXZlci5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChjb250ZW50LCB7IGNvZGU6IHRydWUgfSk7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2V0RGVmYXVsdENoYW5uZWwoY2hhbm5lbCwgbWVzc2FnZSkge1xyXG4gICAgaWYgKGNoYW5uZWxbMV0udHlwZSAhPT0gXCJ0ZXh0XCIgfHwgIWNoYW5uZWxbMV0ucGVybWlzc2lvbnNGb3IobWVzc2FnZS5ndWlsZC5tZSkuaGFzKFwiU0VORF9NRVNTQUdFU1wiKSkge1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiSSBjYW4ndCBzZW5kIG1lc3NhZ2VzIGluIHRoYXQgY2hhbm5lbFwiKTtcclxuICAgIH1cclxuICAgIGF3YWl0IGd1aWxkU2VydmljZS5zZXREZWZhdWx0Q2hhbm5lbChtZXNzYWdlLmd1aWxkLmlkLCBjaGFubmVsWzFdKTtcclxuICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBTZXR0aW5nICR7Y2hhbm5lbFsxXX0gZm9yIHdlbGNvbWUgYW5kIGxlYXZpbmcgbWVzc2FnZXNgKTtcclxufVxyXG5cclxuY29uc3Qgc2V0Q2hhbm5lbDogQ29tbWFuZCA9IHtcclxuICAgIG5hbWU6IFwic2V0Y2hhbm5lbFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiU2V0cyB0aGUgZGVmYXVsdCBjaGFubmVsIHdoZXJlIEkgc2hvdWxkIHNlbmQgd2VsY29tZS9sZWF2aW5nIG1lc3NhZ2VzXCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSwgcGFyYW1zKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBzZXRjaGFubmVsIHNob3VsZCBiZSBmb2xsb3dlZCBieSB0aGUgbmFtZSBvZiB0aGUgY2hhbm5lbC4gVXNhZ2U6IHNldGNoYW5uZWwgJHttZXNzYWdlLmNoYW5uZWx9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyYW1zWzBdWzBdICE9PSBcIjxcIikge1xyXG4gICAgICAgICAgICAvLyBJdCdzIGEgY2hhbm5lbCBuYW1lXHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWwgPSBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAoYykgPT4gY1sxXS5uYW1lID09PSBwYXJhbXNbMF0sXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChjaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0RGVmYXVsdENoYW5uZWwoY2hhbm5lbCwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJJIGNvdWxkbid0IGZpbmQgdGhhdCBjaGFubmVsXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEl0J3MgYSBjaGFubmVsIHRhZ1xyXG4gICAgICAgICAgICBjb25zdCBzbm93Zmxha2UgPSBwYXJhbXNbMF0uc3Vic3RyaW5nKDIsIHBhcmFtc1swXS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgY29uc3QgY2hhbm5lbCA9IG1lc3NhZ2UuZ3VpbGQuY2hhbm5lbHMuZmluZChcclxuICAgICAgICAgICAgICAgIChjKSA9PiBjWzBdID09PSBzbm93Zmxha2UsXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChjaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0RGVmYXVsdENoYW5uZWwoY2hhbm5lbCwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJJIGNvdWxkbid0IGZpbmQgdGhhdCBjaGFubmVsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBzYXZlTWVzc2FnZXM6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcInNhdmVNZXNzYWdlc1wiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiWW91IHNob3VsZG4ndCBiZSBzZWVpbmcgdGhpc1wiLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKF8pID0+IHtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZVNlcnZpY2Uuc2F2ZU1lc3NhZ2VzKCk7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3QgY29tbWFuZHNMaXN0ID0gW1xyXG4gICAgc2V0Q2hhbm5lbCxcclxuICAgIHRvcCxcclxuICAgIHRvcEdsb2JhbCxcclxuICAgIGluYWN0aXZlc0dsb2JhbCxcclxuICAgIGluYWN0aXZlcyxcclxuXTtcclxuXHJcbmNvbnN0IGNvbW1hbmRzID0gW2hlbHAsIHNhdmVNZXNzYWdlcywgLi4uY29tbWFuZHNMaXN0XTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRzO1xyXG4iXX0=