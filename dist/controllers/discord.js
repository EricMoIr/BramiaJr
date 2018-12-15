"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = exports.error = exports.disconnect = exports.ready = exports.message = exports.guildMemberRemove = exports.guildMemberAdd = exports.guildCreate = void 0;

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

            if (!response) {
              _logger.default.error("Couldn't add the guild ".concat(guild.name, " to the store"));
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

            _logger.default.warn("Was disconnected from discord.");

            _context6.next = 4;
            return client.login(token);

          case 4:
            _context6.next = 10;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);
            _context6.next = 10;
            return _context6.t0(_context6.t0, client, token);

          case 10:
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
            _logger.default.error("Error occurred", _error);

            console.log(client.login);
            _context7.prev = 2;
            _context7.next = 5;
            return client.login(token);

          case 5:
            _context7.next = 11;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](2);
            _context7.next = 11;
            return _context7.t0(_context7.t0, client, token);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this, [[2, 7]]);
  }));

  return function error(_x9, _x10, _x11) {
    return _ref9.apply(this, arguments);
  };
}();

exports.error = error;

var signIn =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(client, token) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;

            _logger.default.log("Attempting to connect to discord...");

            _context8.next = 4;
            return client.login(token);

          case 4:
            _context8.next = 9;
            break;

          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8["catch"](0);

            _logger.default.error("Couldn't connect to discord", _context8.t0);

          case 9:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this, [[0, 6]]);
  }));

  return function signIn(_x12, _x13) {
    return _ref10.apply(this, arguments);
  };
}();

exports.signIn = signIn;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9kaXNjb3JkLnRzIl0sIm5hbWVzIjpbIlBSRUZJWCIsInByb2Nlc3MiLCJlbnYiLCJndWlsZENyZWF0ZSIsImd1aWxkIiwiZ3VpbGRTZXJ2aWNlIiwiYWRkR3VpbGQiLCJpZCIsIm5hbWUiLCJyZXNwb25zZSIsIkxvZ2dlciIsImVycm9yIiwiZ3VpbGRNZW1iZXJBZGQiLCJ1c2VyIiwiaGFzRGVmYXVsdENoYW5uZWwiLCJzZW5kVG9EZWZhdWx0Q2hhbm5lbCIsImd1aWxkTWVtYmVyUmVtb3ZlIiwidXNlcm5hbWUiLCJtZXNzYWdlIiwiY29udGVudCIsInN0YXJ0c1dpdGgiLCJtZXNzYWdlU2VydmljZSIsImhhbmRsZU1lc3NhZ2UiLCJ1dGlsIiwicGFyc2VNZXNzYWdlIiwicG9zc2libGVDb21tYW5kIiwicGFyYW1zIiwiY29tbWFuZCIsImNvbW1hbmRzIiwiZmluZCIsImMiLCJ0b0xvd2VyQ2FzZSIsInRvTG9jYWxlTG93ZXJDYXNlIiwiZXhlY3V0ZSIsInJlYWR5IiwiY2xpZW50IiwiUHJvbWlzZSIsImFsbCIsInVwZGF0ZUd1aWxkcyIsImd1aWxkcyIsInNldFByZXNlbmNlIiwiZ2FtZSIsImxvZyIsImRpc2Nvbm5lY3QiLCJfIiwidG9rZW4iLCJ3YXJuIiwibG9naW4iLCJjb25zb2xlIiwic2lnbkluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVRQSxNLEdBQVdDLE9BQU8sQ0FBQ0MsRyxDQUFuQkYsTTs7QUFFRCxJQUFNRyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRyxpQkFBT0MsS0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNBQyxZQUFZLENBQUNDLFFBQWIsQ0FBc0JGLEtBQUssQ0FBQ0csRUFBNUIsRUFBZ0NILEtBQUssQ0FBQ0ksSUFBdEMsQ0FEQTs7QUFBQTtBQUNqQkMs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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVg7Ozs7QUFVQSxJQUFNSSxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRyxrQkFBT2QsTUFBUCxFQUF1QlUsS0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVkbkMsNEJBQU9nQyxHQUFQLENBQVcscUNBQVg7O0FBRmM7QUFBQSxtQkFHUlAsTUFBTSxDQUFDWSxLQUFQLENBQWFGLEtBQWIsQ0FIUTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUtkbkMsNEJBQU9DLEtBQVAsQ0FBYSw2QkFBYjs7QUFMYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFOc0MsTUFBTTtBQUFBO0FBQUE7QUFBQSxHQUFaIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3VpbGQsIEd1aWxkTWVtYmVyLCBDbGllbnQsIE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5cclxuaW1wb3J0IExvZ2dlciBmcm9tIFwibG9nZ2VyXCI7XHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcImRpc2NvcmRVdGlsXCI7XHJcbmltcG9ydCBjb21tYW5kcyBmcm9tIFwiY29tbWFuZHNcIjtcclxuaW1wb3J0ICogYXMgZ3VpbGRTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy9ndWlsZFwiO1xyXG5pbXBvcnQgKiBhcyBtZXNzYWdlU2VydmljZSBmcm9tIFwic2VydmljZXMvbWVzc2FnZVwiO1xyXG5cclxuY29uc3QgeyBQUkVGSVggfSA9IHByb2Nlc3MuZW52O1xyXG5cclxuZXhwb3J0IGNvbnN0IGd1aWxkQ3JlYXRlID0gYXN5bmMgKGd1aWxkOiBHdWlsZCkgPT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBndWlsZFNlcnZpY2UuYWRkR3VpbGQoZ3VpbGQuaWQsIGd1aWxkLm5hbWUpO1xyXG4gICAgaWYgKCFyZXNwb25zZSkge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihgQ291bGRuJ3QgYWRkIHRoZSBndWlsZCAke2d1aWxkLm5hbWV9IHRvIHRoZSBzdG9yZWApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGd1aWxkTWVtYmVyQWRkID0gYXN5bmMgKHsgZ3VpbGQsIHVzZXIgfTogR3VpbGRNZW1iZXIpID0+IHtcclxuICAgIGlmIChndWlsZFNlcnZpY2UuaGFzRGVmYXVsdENoYW5uZWwoZ3VpbGQuaWQpKSB7XHJcbiAgICAgICAgYXdhaXQgZ3VpbGRTZXJ2aWNlLnNlbmRUb0RlZmF1bHRDaGFubmVsKGd1aWxkLmlkLCBgJHt1c2VyfSBoYXMgam9pbmVkIHRoZSBzZXJ2ZXJgKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBndWlsZE1lbWJlclJlbW92ZSA9IGFzeW5jICh7IGd1aWxkLCB1c2VyIH06IEd1aWxkTWVtYmVyKSA9PiB7XHJcbiAgICBpZiAoZ3VpbGRTZXJ2aWNlLmhhc0RlZmF1bHRDaGFubmVsKGd1aWxkLmlkKSkge1xyXG4gICAgICAgIGF3YWl0IGd1aWxkU2VydmljZS5zZW5kVG9EZWZhdWx0Q2hhbm5lbChndWlsZC5pZCwgYCR7dXNlci51c2VybmFtZX0gaGFzIGxlZnQgdGhlIHNlcnZlcmApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG1lc3NhZ2UgPSBhc3luYyAobWVzc2FnZTogTWVzc2FnZSkgPT4ge1xyXG4gICAgaWYgKCFtZXNzYWdlLmNvbnRlbnQuc3RhcnRzV2l0aChQUkVGSVgpKSB7XHJcbiAgICAgICAgYXdhaXQgbWVzc2FnZVNlcnZpY2UuaGFuZGxlTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBbcG9zc2libGVDb21tYW5kLCAuLi5wYXJhbXNdID0gdXRpbC5wYXJzZU1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICBjb25zdCBjb21tYW5kID0gY29tbWFuZHMuZmluZCgoYykgPT4gXHJcbiAgICAgICAgYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHBvc3NpYmxlQ29tbWFuZC50b0xvY2FsZUxvd2VyQ2FzZSgpXHJcbiAgICApO1xyXG4gICAgaWYgKGNvbW1hbmQpIHtcclxuICAgICAgICBhd2FpdCBjb21tYW5kLmV4ZWN1dGUobWVzc2FnZSwgcGFyYW1zKTtcclxuICAgIH1cclxuICAgIHJldHVybjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWR5ID0gYXN5bmMgKGNsaWVudDogQ2xpZW50KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgZ3VpbGRTZXJ2aWNlLnVwZGF0ZUd1aWxkcyhjbGllbnQuZ3VpbGRzKSxcclxuICAgICAgICAgICAgY2xpZW50LnVzZXIuc2V0UHJlc2VuY2Uoe1xyXG4gICAgICAgICAgICAgICAgZ2FtZToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiJGhlbHBcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExvZ2dlci5sb2coXCJCb3QgaXMgcmVhZHlcIik7XHJcbiAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiQ291bGRuJ3QgaGFuZGxlIHJlYWR5IGV2ZW50XCIsIGVycm9yKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNjb25uZWN0ID0gYXN5bmMgKF8sIGNsaWVudDogQ2xpZW50LCB0b2tlbjogc3RyaW5nKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIExvZ2dlci53YXJuKFwiV2FzIGRpc2Nvbm5lY3RlZCBmcm9tIGRpc2NvcmQuXCIpO1xyXG4gICAgICAgIGF3YWl0IGNsaWVudC5sb2dpbih0b2tlbik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGF3YWl0IGVycm9yKGVycm9yLCBjbGllbnQsIHRva2VuKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBlcnJvciA9IGFzeW5jIChlcnJvcjogRXJyb3IsIGNsaWVudDogQ2xpZW50LCB0b2tlbjogc3RyaW5nKSA9PiB7XHJcbiAgICBMb2dnZXIuZXJyb3IoXCJFcnJvciBvY2N1cnJlZFwiLCBlcnJvcik7XHJcbiAgICBjb25zb2xlLmxvZyhjbGllbnQubG9naW4pO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBjbGllbnQubG9naW4odG9rZW4pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBhd2FpdCBlcnJvcihlcnJvciwgY2xpZW50LCB0b2tlbik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2lnbkluID0gYXN5bmMgKGNsaWVudDogQ2xpZW50LCB0b2tlbjogc3RyaW5nKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJBdHRlbXB0aW5nIHRvIGNvbm5lY3QgdG8gZGlzY29yZC4uLlwiKTtcclxuICAgICAgICBhd2FpdCBjbGllbnQubG9naW4odG9rZW4pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJDb3VsZG4ndCBjb25uZWN0IHRvIGRpc2NvcmRcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG59Il19