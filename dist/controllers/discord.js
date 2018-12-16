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
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", messageService.handleMessage(_message));

          case 2:
            _util$parseMessage = util.parseMessage(_message), _util$parseMessage2 = _toArray(_util$parseMessage), possibleCommand = _util$parseMessage2[0], params = _util$parseMessage2.slice(1);
            command = _commands.default.find(function (c) {
              return c.name.toLowerCase() === possibleCommand.toLocaleLowerCase();
            });

            if (!command) {
              _context4.next = 7;
              break;
            }

            _logger.default.log("Executing the command ".concat(command.name, ". Fired by ").concat(_message.author.username));

            return _context4.abrupt("return", command.execute(_message, params));

          case 7:
            _logger.default.warn("I couldn't find the command ".concat(possibleCommand));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9kaXNjb3JkLnRzIl0sIm5hbWVzIjpbIlBSRUZJWCIsInByb2Nlc3MiLCJlbnYiLCJndWlsZENyZWF0ZSIsImd1aWxkIiwiZ3VpbGRTZXJ2aWNlIiwiYWRkR3VpbGQiLCJpZCIsIm5hbWUiLCJyZXNwb25zZSIsIkxvZ2dlciIsImVycm9yIiwiZ3VpbGRNZW1iZXJBZGQiLCJ1c2VyIiwiaGFzRGVmYXVsdENoYW5uZWwiLCJzZW5kVG9EZWZhdWx0Q2hhbm5lbCIsImd1aWxkTWVtYmVyUmVtb3ZlIiwidXNlcm5hbWUiLCJtZXNzYWdlIiwiY29udGVudCIsInN0YXJ0c1dpdGgiLCJtZXNzYWdlU2VydmljZSIsImhhbmRsZU1lc3NhZ2UiLCJ1dGlsIiwicGFyc2VNZXNzYWdlIiwicG9zc2libGVDb21tYW5kIiwicGFyYW1zIiwiY29tbWFuZCIsImNvbW1hbmRzIiwiZmluZCIsImMiLCJ0b0xvd2VyQ2FzZSIsInRvTG9jYWxlTG93ZXJDYXNlIiwibG9nIiwiYXV0aG9yIiwiZXhlY3V0ZSIsIndhcm4iLCJyZWFkeSIsImNsaWVudCIsIlByb21pc2UiLCJhbGwiLCJ1cGRhdGVHdWlsZHMiLCJndWlsZHMiLCJzZXRQcmVzZW5jZSIsImdhbWUiLCJkaXNjb25uZWN0IiwiXyIsInRva2VuIiwibG9naW4iLCJjb25zb2xlIiwic2lnbkluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVRQSxNLEdBQVdDLE9BQU8sQ0FBQ0MsRyxDQUFuQkYsTTs7QUFFRCxJQUFNRyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRyxpQkFBT0MsS0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNBQyxZQUFZLENBQUNDLFFBQWIsQ0FBc0JGLEtBQUssQ0FBQ0csRUFBNUIsRUFBZ0NILEtBQUssQ0FBQ0ksSUFBdEMsQ0FEQTs7QUFB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Q0FBQ1UsS0FBUCxDQUFhRCxLQUFiLENBSk87O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBTVAsMkJBQWFULE1BQWIsRUFBcUJTLEtBQXJCLENBTk87O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFYOzs7O0FBVUEsSUFBTUcsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUcsa0JBQU9aLE1BQVAsRUFBdUJTLEtBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFZHJDLDRCQUFPdUIsR0FBUCxDQUFXLHFDQUFYOztBQUZjO0FBQUEsbUJBR1JLLE1BQU0sQ0FBQ1UsS0FBUCxDQUFhRCxLQUFiLENBSFE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFLZHJDLDRCQUFPQyxLQUFQLENBQWEsNkJBQWI7O0FBTGM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBTnVDLE1BQU07QUFBQTtBQUFBO0FBQUEsR0FBWiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEd1aWxkLCBHdWlsZE1lbWJlciwgQ2xpZW50LCBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuXHJcbmltcG9ydCBMb2dnZXIgZnJvbSBcImxvZ2dlclwiO1xyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJkaXNjb3JkVXRpbFwiO1xyXG5pbXBvcnQgY29tbWFuZHMgZnJvbSBcImNvbW1hbmRzXCI7XHJcbmltcG9ydCAqIGFzIGd1aWxkU2VydmljZSBmcm9tIFwic2VydmljZXMvZ3VpbGRcIjtcclxuaW1wb3J0ICogYXMgbWVzc2FnZVNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL21lc3NhZ2VcIjtcclxuXHJcbmNvbnN0IHsgUFJFRklYIH0gPSBwcm9jZXNzLmVudjtcclxuXHJcbmV4cG9ydCBjb25zdCBndWlsZENyZWF0ZSA9IGFzeW5jIChndWlsZDogR3VpbGQpID0+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ3VpbGRTZXJ2aWNlLmFkZEd1aWxkKGd1aWxkLmlkLCBndWlsZC5uYW1lKTtcclxuICAgIGlmICghcmVzcG9uc2UpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoYENvdWxkbid0IGFkZCB0aGUgZ3VpbGQgJHtndWlsZC5uYW1lfSB0byB0aGUgc3RvcmVgKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBndWlsZE1lbWJlckFkZCA9IGFzeW5jICh7IGd1aWxkLCB1c2VyIH06IEd1aWxkTWVtYmVyKSA9PiB7XHJcbiAgICBpZiAoZ3VpbGRTZXJ2aWNlLmhhc0RlZmF1bHRDaGFubmVsKGd1aWxkLmlkKSkge1xyXG4gICAgICAgIGF3YWl0IGd1aWxkU2VydmljZS5zZW5kVG9EZWZhdWx0Q2hhbm5lbChndWlsZC5pZCwgYCR7dXNlcn0gaGFzIGpvaW5lZCB0aGUgc2VydmVyYCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ3VpbGRNZW1iZXJSZW1vdmUgPSBhc3luYyAoeyBndWlsZCwgdXNlciB9OiBHdWlsZE1lbWJlcikgPT4ge1xyXG4gICAgaWYgKGd1aWxkU2VydmljZS5oYXNEZWZhdWx0Q2hhbm5lbChndWlsZC5pZCkpIHtcclxuICAgICAgICBhd2FpdCBndWlsZFNlcnZpY2Uuc2VuZFRvRGVmYXVsdENoYW5uZWwoZ3VpbGQuaWQsIGAke3VzZXIudXNlcm5hbWV9IGhhcyBsZWZ0IHRoZSBzZXJ2ZXJgKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBtZXNzYWdlID0gYXN5bmMgKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcclxuICAgIGlmICghbWVzc2FnZS5jb250ZW50LnN0YXJ0c1dpdGgoUFJFRklYKSkge1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlU2VydmljZS5oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgW3Bvc3NpYmxlQ29tbWFuZCwgLi4ucGFyYW1zXSA9IHV0aWwucGFyc2VNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRzLmZpbmQoKGMpID0+IFxyXG4gICAgICAgIGMubmFtZS50b0xvd2VyQ2FzZSgpID09PSBwb3NzaWJsZUNvbW1hbmQudG9Mb2NhbGVMb3dlckNhc2UoKVxyXG4gICAgKTtcclxuICAgIGlmIChjb21tYW5kKSB7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhgRXhlY3V0aW5nIHRoZSBjb21tYW5kICR7Y29tbWFuZC5uYW1lfS4gRmlyZWQgYnkgJHttZXNzYWdlLmF1dGhvci51c2VybmFtZX1gKTtcclxuICAgICAgICByZXR1cm4gY29tbWFuZC5leGVjdXRlKG1lc3NhZ2UsIHBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBMb2dnZXIud2FybihgSSBjb3VsZG4ndCBmaW5kIHRoZSBjb21tYW5kICR7cG9zc2libGVDb21tYW5kfWApO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVhZHkgPSBhc3luYyAoY2xpZW50OiBDbGllbnQpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICBndWlsZFNlcnZpY2UudXBkYXRlR3VpbGRzKGNsaWVudC5ndWlsZHMpLFxyXG4gICAgICAgICAgICBjbGllbnQudXNlci5zZXRQcmVzZW5jZSh7XHJcbiAgICAgICAgICAgICAgICBnYW1lOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCIkaGVscFwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIkJvdCBpcyByZWFkeVwiKTtcclxuICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJDb3VsZG4ndCBoYW5kbGUgcmVhZHkgZXZlbnRcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRpc2Nvbm5lY3QgPSBhc3luYyAoXywgY2xpZW50OiBDbGllbnQsIHRva2VuOiBzdHJpbmcpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgTG9nZ2VyLndhcm4oXCJXYXMgZGlzY29ubmVjdGVkIGZyb20gZGlzY29yZC5cIik7XHJcbiAgICAgICAgYXdhaXQgY2xpZW50LmxvZ2luKHRva2VuKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXdhaXQgZXJyb3IoZXJyb3IsIGNsaWVudCwgdG9rZW4pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGVycm9yID0gYXN5bmMgKGVycm9yOiBFcnJvciwgY2xpZW50OiBDbGllbnQsIHRva2VuOiBzdHJpbmcpID0+IHtcclxuICAgIExvZ2dlci5lcnJvcihcIkVycm9yIG9jY3VycmVkXCIsIGVycm9yKTtcclxuICAgIGNvbnNvbGUubG9nKGNsaWVudC5sb2dpbik7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGNsaWVudC5sb2dpbih0b2tlbik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGF3YWl0IGVycm9yKGVycm9yLCBjbGllbnQsIHRva2VuKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzaWduSW4gPSBhc3luYyAoY2xpZW50OiBDbGllbnQsIHRva2VuOiBzdHJpbmcpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIkF0dGVtcHRpbmcgdG8gY29ubmVjdCB0byBkaXNjb3JkLi4uXCIpO1xyXG4gICAgICAgIGF3YWl0IGNsaWVudC5sb2dpbih0b2tlbik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIkNvdWxkbid0IGNvbm5lY3QgdG8gZGlzY29yZFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbn0iXX0=