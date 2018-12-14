"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.disconnect = exports.ready = exports.message = exports.guildMemberRemove = exports.guildMemberAdd = exports.guildCreate = void 0;

var _logger = _interopRequireDefault(require("logger"));

var util = _interopRequireWildcard(require("discordUtil"));

var _commands = _interopRequireDefault(require("commands"));

var guildService = _interopRequireWildcard(require("services/guild"));

var messageService = _interopRequireWildcard(require("services/message"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
    var _util$parseMessage, _util$parseMessage2, possibleCommand, params, command;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (_message.content.startsWith(PREFIX)) {
              _context4.next = 4;
              break;
            }

            _context4.next = 3;
            return messageService.handleMessage(_message);

          case 3:
            return _context4.abrupt("return");

          case 4:
            _util$parseMessage = util.parseMessage(_message), _util$parseMessage2 = _toArray(_util$parseMessage), possibleCommand = _util$parseMessage2[0], params = _util$parseMessage2.slice(1);
            command = _commands.default.find(function (c) {
              return c.name.toLowerCase() === possibleCommand.toLocaleLowerCase();
            });

            if (!command) {
              _context4.next = 9;
              break;
            }

            _context4.next = 9;
            return command.execute(_message, params);

          case 9:
            return _context4.abrupt("return");

          case 10:
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
            _context5.prev = 0;
            _context5.next = 3;
            return Promise.all([guildService.updateGuilds(client.guilds), client.user.setPresence({
              game: {
                name: "$help"
              }
            })]);

          case 3:
            _logger.default.log("Bot is ready");

            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);

            _logger.default.error("Couldn't handle ready event", _context5.t0);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 6]]);
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

            _logger.default.error("Couldn't handle disconnect event", _context6.t0);

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

var error =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(_error, client, token) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _logger.default.error("Error occured", _error);

            _context7.next = 3;
            return disconnect(undefined, client, token);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function error(_x9, _x10, _x11) {
    return _ref9.apply(this, arguments);
  };
}();

exports.error = error;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9kaXNjb3JkLnRzIl0sIm5hbWVzIjpbIlBSRUZJWCIsInByb2Nlc3MiLCJlbnYiLCJndWlsZENyZWF0ZSIsImd1aWxkIiwiZ3VpbGRTZXJ2aWNlIiwiYWRkR3VpbGQiLCJpZCIsIm5hbWUiLCJyZXNwb25zZSIsIkxvZ2dlciIsImVycm9yIiwiZ3VpbGRNZW1iZXJBZGQiLCJ1c2VyIiwiaGFzRGVmYXVsdENoYW5uZWwiLCJzZW5kVG9EZWZhdWx0Q2hhbm5lbCIsImd1aWxkTWVtYmVyUmVtb3ZlIiwidXNlcm5hbWUiLCJtZXNzYWdlIiwiY29udGVudCIsInN0YXJ0c1dpdGgiLCJtZXNzYWdlU2VydmljZSIsImhhbmRsZU1lc3NhZ2UiLCJ1dGlsIiwicGFyc2VNZXNzYWdlIiwicG9zc2libGVDb21tYW5kIiwicGFyYW1zIiwiY29tbWFuZCIsImNvbW1hbmRzIiwiZmluZCIsImMiLCJ0b0xvd2VyQ2FzZSIsInRvTG9jYWxlTG93ZXJDYXNlIiwiZXhlY3V0ZSIsInJlYWR5IiwiY2xpZW50IiwiUHJvbWlzZSIsImFsbCIsInVwZGF0ZUd1aWxkcyIsImd1aWxkcyIsInNldFByZXNlbmNlIiwiZ2FtZSIsImxvZyIsImRpc2Nvbm5lY3QiLCJfIiwidG9rZW4iLCJ3YXJuIiwibG9naW4iLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVFBLE0sR0FBV0MsT0FBTyxDQUFDQyxHLENBQW5CRixNOztBQUVELElBQU1HLFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHLGlCQUFPQyxLQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ0FDLFlBQVksQ0FBQ0MsUUFBYixDQUFzQkYsS0FBSyxDQUFDRyxFQUE1QixFQUFnQ0gsS0FBSyxDQUFDSSxJQUF0QyxDQURBOztBQUFBO0FBQ2pCQyxZQUFBQSxR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aWxkLCBHdWlsZE1lbWJlciwgQ2xpZW50LCBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuXHJcbmltcG9ydCBMb2dnZXIgZnJvbSBcImxvZ2dlclwiO1xyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJkaXNjb3JkVXRpbFwiO1xyXG5pbXBvcnQgY29tbWFuZHMgZnJvbSBcImNvbW1hbmRzXCI7XHJcbmltcG9ydCAqIGFzIGd1aWxkU2VydmljZSBmcm9tIFwic2VydmljZXMvZ3VpbGRcIjtcclxuaW1wb3J0ICogYXMgbWVzc2FnZVNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL21lc3NhZ2VcIjtcclxuXHJcbmNvbnN0IHsgUFJFRklYIH0gPSBwcm9jZXNzLmVudjtcclxuXHJcbmV4cG9ydCBjb25zdCBndWlsZENyZWF0ZSA9IGFzeW5jIChndWlsZDogR3VpbGQpID0+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ3VpbGRTZXJ2aWNlLmFkZEd1aWxkKGd1aWxkLmlkLCBndWlsZC5uYW1lKTtcclxuICAgIGlmIChcImVycm9yXCIgaW4gcmVzcG9uc2UpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoYENvdWxkbid0IGFkZCB0aGUgZ3VpbGQgJHtndWlsZC5uYW1lfSB0byB0aGUgc3RvcmVgKTtcclxuICAgICAgICBMb2dnZXIuZXJyb3IocmVzcG9uc2UuZXJyb3IpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGd1aWxkTWVtYmVyQWRkID0gYXN5bmMgKHsgZ3VpbGQsIHVzZXIgfTogR3VpbGRNZW1iZXIpID0+IHtcclxuICAgIGlmIChndWlsZFNlcnZpY2UuaGFzRGVmYXVsdENoYW5uZWwoZ3VpbGQuaWQpKSB7XHJcbiAgICAgICAgYXdhaXQgZ3VpbGRTZXJ2aWNlLnNlbmRUb0RlZmF1bHRDaGFubmVsKGd1aWxkLmlkLCBgJHt1c2VyfSBoYXMgam9pbmVkIHRoZSBzZXJ2ZXJgKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBndWlsZE1lbWJlclJlbW92ZSA9IGFzeW5jICh7IGd1aWxkLCB1c2VyIH06IEd1aWxkTWVtYmVyKSA9PiB7XHJcbiAgICBpZiAoZ3VpbGRTZXJ2aWNlLmhhc0RlZmF1bHRDaGFubmVsKGd1aWxkLmlkKSkge1xyXG4gICAgICAgIGF3YWl0IGd1aWxkU2VydmljZS5zZW5kVG9EZWZhdWx0Q2hhbm5lbChndWlsZC5pZCwgYCR7dXNlci51c2VybmFtZX0gaGFzIGxlZnQgdGhlIHNlcnZlcmApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG1lc3NhZ2UgPSBhc3luYyAobWVzc2FnZTogTWVzc2FnZSkgPT4ge1xyXG4gICAgaWYgKCFtZXNzYWdlLmNvbnRlbnQuc3RhcnRzV2l0aChQUkVGSVgpKSB7XHJcbiAgICAgICAgYXdhaXQgbWVzc2FnZVNlcnZpY2UuaGFuZGxlTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBbcG9zc2libGVDb21tYW5kLCAuLi5wYXJhbXNdID0gdXRpbC5wYXJzZU1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICBjb25zdCBjb21tYW5kID0gY29tbWFuZHMuZmluZCgoYykgPT4gXHJcbiAgICAgICAgYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHBvc3NpYmxlQ29tbWFuZC50b0xvY2FsZUxvd2VyQ2FzZSgpXHJcbiAgICApO1xyXG4gICAgaWYgKGNvbW1hbmQpIHtcclxuICAgICAgICBhd2FpdCBjb21tYW5kLmV4ZWN1dGUobWVzc2FnZSwgcGFyYW1zKTtcclxuICAgIH1cclxuICAgIHJldHVybjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWR5ID0gYXN5bmMgKGNsaWVudDogQ2xpZW50KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgZ3VpbGRTZXJ2aWNlLnVwZGF0ZUd1aWxkcyhjbGllbnQuZ3VpbGRzKSxcclxuICAgICAgICAgICAgY2xpZW50LnVzZXIuc2V0UHJlc2VuY2Uoe1xyXG4gICAgICAgICAgICAgICAgZ2FtZToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiJGhlbHBcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExvZ2dlci5sb2coXCJCb3QgaXMgcmVhZHlcIik7XHJcbiAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiQ291bGRuJ3QgaGFuZGxlIHJlYWR5IGV2ZW50XCIsIGVycm9yKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNjb25uZWN0ID0gYXN5bmMgKF8sIGNsaWVudDogQ2xpZW50LCB0b2tlbjogc3RyaW5nKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIExvZ2dlci53YXJuKFwiV2FzIGRpc2Nvbm5lY3RlZCBmcm9tIGRpc2NvcmQuIEF0dGVtcHRpbmcgdG8gcmVjb25uZWN0Li4uXCIpO1xyXG4gICAgICAgIGF3YWl0IGNsaWVudC5sb2dpbih0b2tlbik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIkNvdWxkbid0IGhhbmRsZSBkaXNjb25uZWN0IGV2ZW50XCIsIGVycm9yKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBlcnJvciA9IGFzeW5jIChlcnJvcjogRXJyb3IsIGNsaWVudDogQ2xpZW50LCB0b2tlbjogc3RyaW5nKSA9PiB7XHJcbiAgICBMb2dnZXIuZXJyb3IoXCJFcnJvciBvY2N1cmVkXCIsIGVycm9yKTtcclxuICAgIGF3YWl0IGRpc2Nvbm5lY3QodW5kZWZpbmVkLCBjbGllbnQsIHRva2VuKTtcclxufTsiXX0=