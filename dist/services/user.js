"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUsers = exports.addPoints = exports.getInactiveUsers = exports.getMostActiveUsers = exports.create = exports.get = void 0;

var _user = _interopRequireDefault(require("models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var get =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(id, serverId) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user.default.findOne({
              id: id,
              server: serverId
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function get(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.get = get;

var create =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(user) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _user.default.create(user));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function create(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.create = create;

var getMostActiveUsers =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(guildId, limit) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", _user.default.find({
              server: guildId
            }).sort({
              points: "desc"
            }).limit(limit));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getMostActiveUsers(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getMostActiveUsers = getMostActiveUsers;

var getInactiveUsers =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(guildId) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", _user.default.find({
              server: guildId,
              points: {
                $lte: 10
              }
            }).sort({
              points: "asc"
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getInactiveUsers(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getInactiveUsers = getInactiveUsers;

var addPoints =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(user, points) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            user.points += points;
            return _context5.abrupt("return", user.save());

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function addPoints(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

exports.addPoints = addPoints;

var addUsers =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(guildMembers) {
    var promises;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            promises = guildMembers.map(
            /*#__PURE__*/
            function () {
              var _ref8 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee6(_ref7) {
                var id, user, guild, dbUser, newUser;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        id = _ref7.id, user = _ref7.user, guild = _ref7.guild;
                        _context6.next = 3;
                        return get(id, guild.id);

                      case 3:
                        dbUser = _context6.sent;

                        if (dbUser) {
                          _context6.next = 7;
                          break;
                        }

                        newUser = {
                          id: id,
                          username: user.username,
                          server: guild.id
                        };
                        return _context6.abrupt("return", create(newUser));

                      case 7:
                        return _context6.abrupt("return", new Promise(function (resolve) {
                          return resolve(dbUser);
                        }));

                      case 8:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, this);
              }));

              return function (_x10) {
                return _ref8.apply(this, arguments);
              };
            }());
            return _context7.abrupt("return", Promise.all(promises));

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function addUsers(_x9) {
    return _ref6.apply(this, arguments);
  };
}();

exports.addUsers = addUsers;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy91c2VyLnRzIl0sIm5hbWVzIjpbImdldCIsImlkIiwic2VydmVySWQiLCJVc2VycyIsImZpbmRPbmUiLCJzZXJ2ZXIiLCJjcmVhdGUiLCJ1c2VyIiwiZ2V0TW9zdEFjdGl2ZVVzZXJzIiwiZ3VpbGRJZCIsImxpbWl0IiwiZmluZCIsInNvcnQiLCJwb2ludHMiLCJnZXRJbmFjdGl2ZVVzZXJzIiwiJGx0ZSIsImFkZFBvaW50cyIsInNhdmUiLCJhZGRVc2VycyIsImd1aWxkTWVtYmVycyIsInByb21pc2VzIiwibWFwIiwiZ3VpbGQiLCJkYlVzZXIiLCJuZXdVc2VyIiwidXNlcm5hbWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImFsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7OztBQUVPLElBQU1BLEdBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHLGlCQUFPQyxFQUFQLEVBQVdDLFFBQVg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ0ZDLGNBQU1DLE9BQU4sQ0FBYztBQUFFSCxjQUFBQSxFQUFFLEVBQUZBLEVBQUY7QUFBTUksY0FBQUEsTUFBTSxFQUFFSDtBQUFkLGFBQWQsQ0FERTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQUhGLEdBQUc7QUFBQTtBQUFBO0FBQUEsR0FBVDs7OztBQUdBLElBQU1NLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHLGtCQUFPQyxJQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0FDWEosY0FBTUcsTUFBTixDQUFhQyxJQUFiLENBRFc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBTkQsTUFBTTtBQUFBO0FBQUE7QUFBQSxHQUFaOzs7O0FBR0EsSUFBTUUsa0JBQWtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRyxrQkFBT0MsT0FBUCxFQUFnQkMsS0FBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQUN2QlAsY0FBTVEsSUFBTixDQUFXO0FBQUVOLGNBQUFBLE1BQU0sRUFBRUk7QUFBVixhQUFYLEVBQWdDRyxJQUFoQyxDQUFxQztBQUFFQyxjQUFBQSxNQUFNLEVBQUU7QUFBVixhQUFyQyxFQUF5REgsS0FBekQsQ0FBK0RBLEtBQS9ELENBRHVCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQWxCRixrQkFBa0I7QUFBQTtBQUFBO0FBQUEsR0FBeEI7Ozs7QUFHQSxJQUFNTSxnQkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHLGtCQUFPTCxPQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0FDckJOLGNBQU1RLElBQU4sQ0FBVztBQUNkTixjQUFBQSxNQUFNLEVBQUVJLE9BRE07QUFFZEksY0FBQUEsTUFBTSxFQUFFO0FBQUVFLGdCQUFBQSxJQUFJLEVBQUU7QUFBUjtBQUZNLGFBQVgsRUFHSkgsSUFISSxDQUdDO0FBQUVDLGNBQUFBLE1BQU0sRUFBRTtBQUFWLGFBSEQsQ0FEcUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBaEJDLGdCQUFnQjtBQUFBO0FBQUE7QUFBQSxHQUF0Qjs7OztBQU1BLElBQU1FLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHLGtCQUFPVCxJQUFQLEVBQWFNLE1BQWI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNyQk4sWUFBQUEsSUFBSSxDQUFDTSxNQUFMLElBQWVBLE1BQWY7QUFEcUIsOENBRWROLElBQUksQ0FBQ1UsSUFBTCxFQUZjOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQVRELFNBQVM7QUFBQTtBQUFBO0FBQUEsR0FBZjs7OztBQUlBLElBQU1FLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHLGtCQUFPQyxZQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNkQyxZQUFBQSxRQURjLEdBQ0hELFlBQVksQ0FBQ0UsR0FBYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0NBQWlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFTcEIsd0JBQUFBLEVBQVQsU0FBU0EsRUFBVCxFQUFhTSxJQUFiLFNBQWFBLElBQWIsRUFBbUJlLEtBQW5CLFNBQW1CQSxLQUFuQjtBQUFBO0FBQUEsK0JBQ1R0QixHQUFHLENBQUNDLEVBQUQsRUFBS3FCLEtBQUssQ0FBQ3JCLEVBQVgsQ0FETTs7QUFBQTtBQUN4QnNCLHdCQUFBQSxNQUR3Qjs7QUFBQSw0QkFFekJBLE1BRnlCO0FBQUE7QUFBQTtBQUFBOztBQUdwQkMsd0JBQUFBLE9BSG9CLEdBR1Y7QUFDWnZCLDBCQUFBQSxFQUFFLEVBQUZBLEVBRFk7QUFFWndCLDBCQUFBQSxRQUFRLEVBQUVsQixJQUFJLENBQUNrQixRQUZIO0FBR1pwQiwwQkFBQUEsTUFBTSxFQUFFaUIsS0FBSyxDQUFDckI7QUFIRix5QkFIVTtBQUFBLDBEQVFuQkssTUFBTSxDQUFDa0IsT0FBRCxDQVJhOztBQUFBO0FBQUEsMERBVXZCLElBQUlFLE9BQUosQ0FBWSxVQUFDQyxPQUFEO0FBQUEsaUNBQWFBLE9BQU8sQ0FBQ0osTUFBRCxDQUFwQjtBQUFBLHlCQUFaLENBVnVCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQWpCOztBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQURHO0FBQUEsOENBYWJHLE9BQU8sQ0FBQ0UsR0FBUixDQUFZUixRQUFaLENBYmE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBUkYsUUFBUTtBQUFBO0FBQUE7QUFBQSxHQUFkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVzZXJzIGZyb20gXCJtb2RlbHMvdXNlclwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldCA9IGFzeW5jIChpZCwgc2VydmVySWQpID0+IHtcclxuICAgIHJldHVybiBhd2FpdCBVc2Vycy5maW5kT25lKHsgaWQsIHNlcnZlcjogc2VydmVySWQgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBjcmVhdGUgPSBhc3luYyAodXNlcikgPT4ge1xyXG4gICAgcmV0dXJuIFVzZXJzLmNyZWF0ZSh1c2VyKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldE1vc3RBY3RpdmVVc2VycyA9IGFzeW5jIChndWlsZElkLCBsaW1pdCkgPT4ge1xyXG4gICAgcmV0dXJuIFVzZXJzLmZpbmQoeyBzZXJ2ZXI6IGd1aWxkSWQgfSkuc29ydCh7IHBvaW50czogXCJkZXNjXCIgfSkubGltaXQobGltaXQpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0SW5hY3RpdmVVc2VycyA9IGFzeW5jIChndWlsZElkKSA9PiB7XHJcbiAgICByZXR1cm4gVXNlcnMuZmluZCh7XHJcbiAgICAgICAgc2VydmVyOiBndWlsZElkLFxyXG4gICAgICAgIHBvaW50czogeyAkbHRlOiAxMCB9LFxyXG4gICAgfSkuc29ydCh7IHBvaW50czogXCJhc2NcIiB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFkZFBvaW50cyA9IGFzeW5jICh1c2VyLCBwb2ludHMpID0+IHtcclxuICAgIHVzZXIucG9pbnRzICs9IHBvaW50cztcclxuICAgIHJldHVybiB1c2VyLnNhdmUoKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFkZFVzZXJzID0gYXN5bmMgKGd1aWxkTWVtYmVycykgPT4ge1xyXG4gICAgY29uc3QgcHJvbWlzZXMgPSBndWlsZE1lbWJlcnMubWFwKGFzeW5jICh7IGlkLCB1c2VyLCBndWlsZCB9KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGJVc2VyID0gYXdhaXQgZ2V0KGlkLCBndWlsZC5pZCk7XHJcbiAgICAgICAgaWYgKCFkYlVzZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3VXNlciA9IHtcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXI6IGd1aWxkLmlkLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlKG5ld1VzZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHJlc29sdmUoZGJVc2VyKSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XHJcbn07Il19