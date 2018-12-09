"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disconnect = exports.ready = exports.message = exports.guildMemberRemove = exports.guildMemberAdd = exports.guildCreate = void 0;

var _logger = _interopRequireDefault(require("logger"));

var _commands = _interopRequireDefault(require("commands"));

var guildService = _interopRequireWildcard(require("services/guild"));

var messageService = _interopRequireWildcard(require("services/message"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PREFIX = process.env.PREFIX;

var guildCreate =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(guild) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return guildService.addGuild(guild.id, guild.name);

          case 2:
            response = _context.sent;

            if ("error" in response) {
              _logger.default.error("Couldn't add the guild ".concat(guild.name, " to the store"));

              _logger.default.error(response.error);
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function guildCreate(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.guildCreate = guildCreate;

var guildMemberAdd =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref2) {
    var guild, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            guild = _ref2.guild, user = _ref2.user;

            if (!guildService.hasDefaultChannel(guild.id)) {
              _context2.next = 4;
              break;
            }

            _context2.next = 4;
            return guildService.sendToDefaultChannel(guild.id, "".concat(user, " has joined the server"));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function guildMemberAdd(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.guildMemberAdd = guildMemberAdd;

var guildMemberRemove =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref4) {
    var guild, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            guild = _ref4.guild, user = _ref4.user;

            if (!guildService.hasDefaultChannel(guild.id)) {
              _context3.next = 4;
              break;
            }

            _context3.next = 4;
            return guildService.sendToDefaultChannel(guild.id, "".concat(user.username, " has left the server"));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function guildMemberRemove(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

exports.guildMemberRemove = guildMemberRemove;

var message =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_message) {
    var messageLowerCase, command;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return messageService.handleMessage(_message);

          case 2:
            messageLowerCase = _message.content.toLowerCase();
            command = _commands.default.find(function (c) {
              return "".concat(PREFIX).concat(c.name.toLowerCase()).split(messageLowerCase).length > 1;
            });

            if (!command) {
              _context4.next = 7;
              break;
            }

            _context4.next = 7;
            return command.execute(_message);

          case 7:
            return _context4.abrupt("return");

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function message(_x4) {
    return _ref6.apply(this, arguments);
  };
}();

exports.message = message;

var ready =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(client) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return guildService.updateGuilds(client.guilds);

          case 2:
            _context5.next = 4;
            return client.user.setPresence({
              game: {
                name: "$help"
              }
            });

          case 4:
            _logger.default.log("Bot is ready");

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function ready(_x5) {
    return _ref7.apply(this, arguments);
  };
}();

exports.ready = ready;

var disconnect =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(_, client, token) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;

            _logger.default.warn("Was disconnected from discord. Attempting to reconnect...");

            _context6.next = 4;
            return client.login(token);

          case 4:
            _context6.next = 9;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);

            _logger.default.error("Couldn't connect to discord", _context6.t0);

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this, [[0, 6]]);
  }));

  return function disconnect(_x6, _x7, _x8) {
    return _ref8.apply(this, arguments);
  };
}();

exports.disconnect = disconnect;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9kaXNjb3JkLnRzIl0sIm5hbWVzIjpbIlBSRUZJWCIsInByb2Nlc3MiLCJlbnYiLCJndWlsZENyZWF0ZSIsImd1aWxkIiwiZ3VpbGRTZXJ2aWNlIiwiYWRkR3VpbGQiLCJpZCIsIm5hbWUiLCJyZXNwb25zZSIsIkxvZ2dlciIsImVycm9yIiwiZ3VpbGRNZW1iZXJBZGQiLCJ1c2VyIiwiaGFzRGVmYXVsdENoYW5uZWwiLCJzZW5kVG9EZWZhdWx0Q2hhbm5lbCIsImd1aWxkTWVtYmVyUmVtb3ZlIiwidXNlcm5hbWUiLCJtZXNzYWdlIiwibWVzc2FnZVNlcnZpY2UiLCJoYW5kbGVNZXNzYWdlIiwibWVzc2FnZUxvd2VyQ2FzZSIsImNvbnRlbnQiLCJ0b0xvd2VyQ2FzZSIsImNvbW1hbmQiLCJjb21tYW5kcyIsImZpbmQiLCJjIiwic3BsaXQiLCJsZW5ndGgiLCJleGVjdXRlIiwicmVhZHkiLCJjbGllbnQiLCJ1cGRhdGVHdWlsZHMiLCJndWlsZHMiLCJzZXRQcmVzZW5jZSIsImdhbWUiLCJsb2ciLCJkaXNjb25uZWN0IiwiXyIsInRva2VuIiwid2FybiIsImxvZ2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFUUEsTSxHQUFXQyxPQUFPLENBQUNDLEcsQ0FBbkJGLE07O0FBRUQsSUFBTUcsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUcsaUJBQU9DLEtBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDQUMsWUFBWSxDQUFDQyxRQUFiLENBQXNCRixLQUFLLENBQUNHLEVBQTVCLEVBQWdDSCxLQUFLLENBQUNJLElBQXRDLENBREE7O0FBQUE7QUFDakJDLFlBQUFBLFFBRGlCOztBQUV2QixnQkFBSSxXQUFXQSxRQUFmLEVBQXlCO0FBQ3JCQyw4QkFBT0MsS0FBUCxrQ0FBdUNQLEtBQUssQ0FBQ0ksSUFBN0M7O0FBQ0FFLDhC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Ozs7O0FBVUEsSUFBTU8sVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUcsa0JBQU9DLENBQVAsRUFBVVAsTUFBVixFQUFrQlEsS0FBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVsQjlCLDRCQUFPK0IsSUFBUCxDQUFZLDJEQUFaOztBQUZrQjtBQUFBLG1CQUdaVCxNQUFNLENBQUNVLEtBQVAsQ0FBYUYsS0FBYixDQUhZOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBS2xCOUIsNEJBQU9DLEtBQVAsQ0FBYSw2QkFBYjs7QUFMa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBVjJCLFVBQVU7QUFBQTtBQUFBO0FBQUEsR0FBaEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHdWlsZCwgR3VpbGRNZW1iZXIsIENsaWVudCwgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcblxyXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCJsb2dnZXJcIjtcclxuaW1wb3J0IGNvbW1hbmRzIGZyb20gXCJjb21tYW5kc1wiO1xyXG5pbXBvcnQgKiBhcyBndWlsZFNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL2d1aWxkXCI7XHJcbmltcG9ydCAqIGFzIG1lc3NhZ2VTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy9tZXNzYWdlXCI7XHJcblxyXG5jb25zdCB7IFBSRUZJWCB9ID0gcHJvY2Vzcy5lbnY7XHJcblxyXG5leHBvcnQgY29uc3QgZ3VpbGRDcmVhdGUgPSBhc3luYyAoZ3VpbGQpID0+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ3VpbGRTZXJ2aWNlLmFkZEd1aWxkKGd1aWxkLmlkLCBndWlsZC5uYW1lKTtcclxuICAgIGlmIChcImVycm9yXCIgaW4gcmVzcG9uc2UpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoYENvdWxkbid0IGFkZCB0aGUgZ3VpbGQgJHtndWlsZC5uYW1lfSB0byB0aGUgc3RvcmVgKTtcclxuICAgICAgICBMb2dnZXIuZXJyb3IocmVzcG9uc2UuZXJyb3IpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGd1aWxkTWVtYmVyQWRkID0gYXN5bmMgKHsgZ3VpbGQsIHVzZXIgfSkgPT4ge1xyXG4gICAgaWYgKGd1aWxkU2VydmljZS5oYXNEZWZhdWx0Q2hhbm5lbChndWlsZC5pZCkpIHtcclxuICAgICAgICBhd2FpdCBndWlsZFNlcnZpY2Uuc2VuZFRvRGVmYXVsdENoYW5uZWwoZ3VpbGQuaWQsIGAke3VzZXJ9IGhhcyBqb2luZWQgdGhlIHNlcnZlcmApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGd1aWxkTWVtYmVyUmVtb3ZlID0gYXN5bmMgKHsgZ3VpbGQsIHVzZXIgfSkgPT4ge1xyXG4gICAgaWYgKGd1aWxkU2VydmljZS5oYXNEZWZhdWx0Q2hhbm5lbChndWlsZC5pZCkpIHtcclxuICAgICAgICBhd2FpdCBndWlsZFNlcnZpY2Uuc2VuZFRvRGVmYXVsdENoYW5uZWwoZ3VpbGQuaWQsIGAke3VzZXIudXNlcm5hbWV9IGhhcyBsZWZ0IHRoZSBzZXJ2ZXJgKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBtZXNzYWdlID0gYXN5bmMgKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcclxuICAgIGF3YWl0IG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZU1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICBjb25zdCBtZXNzYWdlTG93ZXJDYXNlID0gbWVzc2FnZS5jb250ZW50LnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb25zdCBjb21tYW5kID0gY29tbWFuZHMuZmluZCgoYykgPT4gXHJcbiAgICAgICAgYCR7UFJFRklYfSR7Yy5uYW1lLnRvTG93ZXJDYXNlKCl9YC5zcGxpdChtZXNzYWdlTG93ZXJDYXNlKS5sZW5ndGggPiAxXHJcbiAgICApO1xyXG4gICAgaWYgKGNvbW1hbmQpIHtcclxuICAgICAgICBhd2FpdCBjb21tYW5kLmV4ZWN1dGUobWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZWFkeSA9IGFzeW5jIChjbGllbnQpID0+IHtcclxuICAgIGF3YWl0IGd1aWxkU2VydmljZS51cGRhdGVHdWlsZHMoY2xpZW50Lmd1aWxkcyk7XHJcbiAgICBhd2FpdCBjbGllbnQudXNlci5zZXRQcmVzZW5jZSh7XHJcbiAgICAgICAgZ2FtZToge1xyXG4gICAgICAgICAgICBuYW1lOiBcIiRoZWxwXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgTG9nZ2VyLmxvZyhcIkJvdCBpcyByZWFkeVwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNjb25uZWN0ID0gYXN5bmMgKF8sIGNsaWVudCwgdG9rZW4pID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgTG9nZ2VyLndhcm4oXCJXYXMgZGlzY29ubmVjdGVkIGZyb20gZGlzY29yZC4gQXR0ZW1wdGluZyB0byByZWNvbm5lY3QuLi5cIik7XHJcbiAgICAgICAgYXdhaXQgY2xpZW50LmxvZ2luKHRva2VuKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiQ291bGRuJ3QgY29ubmVjdCB0byBkaXNjb3JkXCIsIGVycm9yKTtcclxuICAgIH1cclxufTsiXX0=