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
            if (_message.content.startsWith(PREFIX)) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt("return");

          case 4:
            messageLowerCase = _message.content.toLowerCase();
            command = _commands.default.find(function (c) {
              return c.name.toLowerCase().split(messageLowerCase).length > 1;
            });

            if (!command) {
              _context4.next = 9;
              break;
            }

            _context4.next = 9;
            return command.execute(_message);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9kaXNjb3JkLnRzIl0sIm5hbWVzIjpbIlBSRUZJWCIsInByb2Nlc3MiLCJlbnYiLCJndWlsZENyZWF0ZSIsImd1aWxkIiwiZ3VpbGRTZXJ2aWNlIiwiYWRkR3VpbGQiLCJpZCIsIm5hbWUiLCJyZXNwb25zZSIsIkxvZ2dlciIsImVycm9yIiwiZ3VpbGRNZW1iZXJBZGQiLCJ1c2VyIiwiaGFzRGVmYXVsdENoYW5uZWwiLCJzZW5kVG9EZWZhdWx0Q2hhbm5lbCIsImd1aWxkTWVtYmVyUmVtb3ZlIiwidXNlcm5hbWUiLCJtZXNzYWdlIiwibWVzc2FnZVNlcnZpY2UiLCJoYW5kbGVNZXNzYWdlIiwiY29udGVudCIsInN0YXJ0c1dpdGgiLCJtZXNzYWdlTG93ZXJDYXNlIiwidG9Mb3dlckNhc2UiLCJjb21tYW5kIiwiY29tbWFuZHMiLCJmaW5kIiwiYyIsInNwbGl0IiwibGVuZ3RoIiwiZXhlY3V0ZSIsInJlYWR5IiwiY2xpZW50IiwidXBkYXRlR3VpbGRzIiwiZ3VpbGRzIiwic2V0UHJlc2VuY2UiLCJnYW1lIiwibG9nIiwiZGlzY29ubmVjdCIsIl8iLCJ0b2tlbiIsIndhcm4iLCJsb2dpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBRVFBLE0sR0FBV0MsT0FBTyxDQUFDQyxHLENBQW5CRixNOztBQUVELElBQU1HLFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHLGlCQUFPQyxLQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ0FDLFlBQVksQ0FBQ0MsUUFBYixDQUFzQkYsS0FBSyxDQUFDRyxFQUE1QixFQUFnQ0gsS0FBSyxDQUFDSSxJQUF0QyxDQURBOztBQUFBO0FBQ2pCQyxZQUFBQSxRQURpQjs7QUFFdkIsZ0JBQUksV0FBV0EsUUFBZixFQUF5QjtBQUNyQkMsOEJBQU9DLEtBQVAsa0NBQXVDUCxLQUFLLENBQUNJLElB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O0FBUGlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQUxOLEtBQUs7QUFBQTtBQUFBO0FBQUEsR0FBWDs7OztBQVVBLElBQU1PLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHLGtCQUFPQyxDQUFQLEVBQVVQLE1BQVYsRUFBa0JRLEtBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFbEIvQiw0QkFBT2dDLElBQVAsQ0FBWSwyREFBWjs7QUFGa0I7QUFBQSxtQkFHWlQsTUFBTSxDQUFDVSxLQUFQLENBQWFGLEtBQWIsQ0FIWTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUtsQi9CLDRCQUFPQyxLQUFQLENBQWEsNkJBQWI7O0FBTGtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQVY0QixVQUFVO0FBQUE7QUFBQTtBQUFBLEdBQWhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3VpbGQsIEd1aWxkTWVtYmVyLCBDbGllbnQsIE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5cclxuaW1wb3J0IExvZ2dlciBmcm9tIFwibG9nZ2VyXCI7XHJcbmltcG9ydCBjb21tYW5kcyBmcm9tIFwiY29tbWFuZHNcIjtcclxuaW1wb3J0ICogYXMgZ3VpbGRTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy9ndWlsZFwiO1xyXG5pbXBvcnQgKiBhcyBtZXNzYWdlU2VydmljZSBmcm9tIFwic2VydmljZXMvbWVzc2FnZVwiO1xyXG5cclxuY29uc3QgeyBQUkVGSVggfSA9IHByb2Nlc3MuZW52O1xyXG5cclxuZXhwb3J0IGNvbnN0IGd1aWxkQ3JlYXRlID0gYXN5bmMgKGd1aWxkKSA9PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGd1aWxkU2VydmljZS5hZGRHdWlsZChndWlsZC5pZCwgZ3VpbGQubmFtZSk7XHJcbiAgICBpZiAoXCJlcnJvclwiIGluIHJlc3BvbnNlKSB7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKGBDb3VsZG4ndCBhZGQgdGhlIGd1aWxkICR7Z3VpbGQubmFtZX0gdG8gdGhlIHN0b3JlYCk7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKHJlc3BvbnNlLmVycm9yKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBndWlsZE1lbWJlckFkZCA9IGFzeW5jICh7IGd1aWxkLCB1c2VyIH0pID0+IHtcclxuICAgIGlmIChndWlsZFNlcnZpY2UuaGFzRGVmYXVsdENoYW5uZWwoZ3VpbGQuaWQpKSB7XHJcbiAgICAgICAgYXdhaXQgZ3VpbGRTZXJ2aWNlLnNlbmRUb0RlZmF1bHRDaGFubmVsKGd1aWxkLmlkLCBgJHt1c2VyfSBoYXMgam9pbmVkIHRoZSBzZXJ2ZXJgKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBndWlsZE1lbWJlclJlbW92ZSA9IGFzeW5jICh7IGd1aWxkLCB1c2VyIH0pID0+IHtcclxuICAgIGlmIChndWlsZFNlcnZpY2UuaGFzRGVmYXVsdENoYW5uZWwoZ3VpbGQuaWQpKSB7XHJcbiAgICAgICAgYXdhaXQgZ3VpbGRTZXJ2aWNlLnNlbmRUb0RlZmF1bHRDaGFubmVsKGd1aWxkLmlkLCBgJHt1c2VyLnVzZXJuYW1lfSBoYXMgbGVmdCB0aGUgc2VydmVyYCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbWVzc2FnZSA9IGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XHJcbiAgICBhd2FpdCBtZXNzYWdlU2VydmljZS5oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgaWYgKCFtZXNzYWdlLmNvbnRlbnQuc3RhcnRzV2l0aChQUkVGSVgpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWVzc2FnZUxvd2VyQ2FzZSA9IG1lc3NhZ2UuY29udGVudC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRzLmZpbmQoKGMpID0+IFxyXG4gICAgICAgIGMubmFtZS50b0xvd2VyQ2FzZSgpLnNwbGl0KG1lc3NhZ2VMb3dlckNhc2UpLmxlbmd0aCA+IDFcclxuICAgICk7XHJcbiAgICBpZiAoY29tbWFuZCkge1xyXG4gICAgICAgIGF3YWl0IGNvbW1hbmQuZXhlY3V0ZShtZXNzYWdlKTtcclxuICAgIH1cclxuICAgIHJldHVybjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWR5ID0gYXN5bmMgKGNsaWVudCkgPT4ge1xyXG4gICAgYXdhaXQgZ3VpbGRTZXJ2aWNlLnVwZGF0ZUd1aWxkcyhjbGllbnQuZ3VpbGRzKTtcclxuICAgIGF3YWl0IGNsaWVudC51c2VyLnNldFByZXNlbmNlKHtcclxuICAgICAgICBnYW1lOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiJGhlbHBcIixcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBMb2dnZXIubG9nKFwiQm90IGlzIHJlYWR5XCIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRpc2Nvbm5lY3QgPSBhc3luYyAoXywgY2xpZW50LCB0b2tlbikgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBMb2dnZXIud2FybihcIldhcyBkaXNjb25uZWN0ZWQgZnJvbSBkaXNjb3JkLiBBdHRlbXB0aW5nIHRvIHJlY29ubmVjdC4uLlwiKTtcclxuICAgICAgICBhd2FpdCBjbGllbnQubG9naW4odG9rZW4pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJDb3VsZG4ndCBjb25uZWN0IHRvIGRpc2NvcmRcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG59OyJdfQ==