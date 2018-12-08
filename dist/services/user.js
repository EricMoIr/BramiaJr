"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUsers = exports.addPoints = exports.getInactiveUsers = exports.getMostActiveUsers = exports.create = exports.get = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = require("models/user");

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
            return _context.abrupt("return", User.findOne({
              id: id,
              server: serverId
            }));

          case 1:
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
            return _context2.abrupt("return", User.create(user));

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
            return _context3.abrupt("return", User.find({
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
            return _context4.abrupt("return", User.find({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy91c2VyLnRzIl0sIm5hbWVzIjpbIlVzZXIiLCJyZXF1aXJlIiwiZ2V0IiwiaWQiLCJzZXJ2ZXJJZCIsImZpbmRPbmUiLCJzZXJ2ZXIiLCJjcmVhdGUiLCJ1c2VyIiwiZ2V0TW9zdEFjdGl2ZVVzZXJzIiwiZ3VpbGRJZCIsImxpbWl0IiwiZmluZCIsInNvcnQiLCJwb2ludHMiLCJnZXRJbmFjdGl2ZVVzZXJzIiwiJGx0ZSIsImFkZFBvaW50cyIsInNhdmUiLCJhZGRVc2VycyIsImd1aWxkTWVtYmVycyIsInByb21pc2VzIiwibWFwIiwiZ3VpbGQiLCJkYlVzZXIiLCJuZXdVc2VyIiwidXNlcm5hbWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImFsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxhQUFELENBQXBCOztBQUVPLElBQU1DLEdBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHLGlCQUFPQyxFQUFQLEVBQVdDLFFBQVg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZDQUNSSixJQUFJLENBQUNLLE9BQUwsQ0FBYTtBQUFFRixjQUFBQSxFQUFFLEVBQUZBLEVBQUY7QUFBTUcsY0FBQUEsTUFBTSxFQUFFRjtBQUFkLGFBQWIsQ0FEUTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFIRixHQUFHO0FBQUE7QUFBQTtBQUFBLEdBQVQ7Ozs7QUFHQSxJQUFNSyxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRyxrQkFBT0MsSUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBQ1hSLElBQUksQ0FBQ08sTUFBTCxDQUFZQyxJQUFaLENBRFc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBTkQsTUFBTTtBQUFBO0FBQUE7QUFBQSxHQUFaOzs7O0FBR0Es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PSByZXF1aXJlKFwibW9kZWxzL3VzZXJcIik7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0ID0gYXN5bmMgKGlkLCBzZXJ2ZXJJZCkgPT4ge1xyXG4gICAgcmV0dXJuIFVzZXIuZmluZE9uZSh7IGlkLCBzZXJ2ZXI6IHNlcnZlcklkIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgY3JlYXRlID0gYXN5bmMgKHVzZXIpID0+IHtcclxuICAgIHJldHVybiBVc2VyLmNyZWF0ZSh1c2VyKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldE1vc3RBY3RpdmVVc2VycyA9IGFzeW5jIChndWlsZElkLCBsaW1pdCkgPT4ge1xyXG4gICAgcmV0dXJuIFVzZXIuZmluZCh7IHNlcnZlcjogZ3VpbGRJZCB9KS5zb3J0KHsgcG9pbnRzOiBcImRlc2NcIiB9KS5saW1pdChsaW1pdCk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRJbmFjdGl2ZVVzZXJzID0gYXN5bmMgKGd1aWxkSWQpID0+IHtcclxuICAgIHJldHVybiBVc2VyLmZpbmQoe1xyXG4gICAgICAgIHNlcnZlcjogZ3VpbGRJZCxcclxuICAgICAgICBwb2ludHM6IHsgJGx0ZTogMTAgfSxcclxuICAgIH0pLnNvcnQoeyBwb2ludHM6IFwiYXNjXCIgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhZGRQb2ludHMgPSBhc3luYyAodXNlciwgcG9pbnRzKSA9PiB7XHJcbiAgICB1c2VyLnBvaW50cyArPSBwb2ludHM7XHJcbiAgICByZXR1cm4gdXNlci5zYXZlKCk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhZGRVc2VycyA9IGFzeW5jIChndWlsZE1lbWJlcnMpID0+IHtcclxuICAgIGNvbnN0IHByb21pc2VzID0gZ3VpbGRNZW1iZXJzLm1hcChhc3luYyAoeyBpZCwgdXNlciwgZ3VpbGQgfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRiVXNlciA9IGF3YWl0IGdldChpZCwgZ3VpbGQuaWQpO1xyXG4gICAgICAgIGlmICghZGJVc2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1VzZXIgPSB7XHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyOiBndWlsZC5pZCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZShuZXdVc2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXNvbHZlKGRiVXNlcikpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xyXG59OyJdfQ==