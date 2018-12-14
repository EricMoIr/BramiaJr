"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePoints = exports.addUsers = exports.addPoints = exports.getInactiveUsersThisWeek = exports.getInactiveUsers = exports.getMostActiveUsersThisWeek = exports.getMostActiveUsers = exports.create = exports.get = void 0;

var _user = _interopRequireDefault(require("models/user"));

var configurationService = _interopRequireWildcard(require("services/configuration"));

var _is_same_week = _interopRequireDefault(require("date-fns/is_same_week"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
              server: guildId,
              points: {
                $gt: 0
              }
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

var getMostActiveUsersThisWeek =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(guildId, limit) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", _user.default.find({
              server: guildId,
              pointsWeekly: {
                $gt: 0
              }
            }).sort({
              pointsWeekly: "desc"
            }).limit(limit));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getMostActiveUsersThisWeek(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getMostActiveUsersThisWeek = getMostActiveUsersThisWeek;

var getInactiveUsers =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(guildId, limit) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", _user.default.find({
              server: guildId,
              points: {
                $lte: 10
              }
            }).sort({
              points: "asc"
            }).limit(limit));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getInactiveUsers(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getInactiveUsers = getInactiveUsers;

var getInactiveUsersThisWeek =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(guildId, limit) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", _user.default.find({
              server: guildId,
              pointsWeekly: {
                $lte: 10
              }
            }).sort({
              pointsWeekly: "asc"
            }).limit(limit));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getInactiveUsersThisWeek(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getInactiveUsersThisWeek = getInactiveUsersThisWeek;

var addPoints =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(user, points) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            user.points += points;
            user.pointsWeekly += points;
            return _context7.abrupt("return", user.save());

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function addPoints(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

exports.addPoints = addPoints;

var addUsers =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(guildMembers) {
    var promises;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            promises = guildMembers.map(
            /*#__PURE__*/
            function () {
              var _ref10 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee8(_ref9) {
                var id, user, guild, dbUser, newUser;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        id = _ref9.id, user = _ref9.user, guild = _ref9.guild;
                        _context8.next = 3;
                        return get(id, guild.id);

                      case 3:
                        dbUser = _context8.sent;

                        if (dbUser) {
                          _context8.next = 7;
                          break;
                        }

                        newUser = {
                          id: id,
                          username: user.username,
                          server: guild.id,
                          isBot: user.bot
                        };
                        return _context8.abrupt("return", create(newUser));

                      case 7:
                        return _context8.abrupt("return", new Promise(function (resolve) {
                          return resolve(dbUser);
                        }));

                      case 8:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8, this);
              }));

              return function (_x15) {
                return _ref10.apply(this, arguments);
              };
            }());
            return _context9.abrupt("return", Promise.all(promises));

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function addUsers(_x14) {
    return _ref8.apply(this, arguments);
  };
}();

exports.addUsers = addUsers;

var updatePoints =
/*#__PURE__*/
function () {
  var _ref11 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10() {
    var lastSync, today, users, promises;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return configurationService.getLastSync();

          case 2:
            lastSync = _context10.sent;
            today = new Date();

            if (!(0, _is_same_week.default)(lastSync, today)) {
              _context10.next = 6;
              break;
            }

            return _context10.abrupt("return");

          case 6:
            _context10.next = 8;
            return _user.default.find();

          case 8:
            users = _context10.sent;
            promises = users.map(function (user) {
              user.pointsWeekly = 0;
              return user.save();
            });
            _context10.next = 12;
            return Promise.all(promises);

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function updatePoints() {
    return _ref11.apply(this, arguments);
  };
}();

exports.updatePoints = updatePoints;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy91c2VyLnRzIl0sIm5hbWVzIjpbImdldCIsImlkIiwic2VydmVySWQiLCJVc2VycyIsImZpbmRPbmUiLCJzZXJ2ZXIiLCJjcmVhdGUiLCJ1c2VyIiwiZ2V0TW9zdEFjdGl2ZVVzZXJzIiwiZ3VpbGRJZCIsImxpbWl0IiwiZmluZCIsInBvaW50cyIsIiRndCIsInNvcnQiLCJnZXRNb3N0QWN0aXZlVXNlcnNUaGlzV2VlayIsInBvaW50c1dlZWtseSIsImdldEluYWN0aXZlVXNlcnMiLCIkbHRlIiwiZ2V0SW5hY3RpdmVVc2Vyc1RoaXNXZWVrIiwiYWRkUG9pbnRzIiwic2F2ZSIsImFkZFVzZXJzIiwiZ3VpbGRNZW1iZXJzIiwicHJvbWlzZXMiLCJtYXAiLCJndWlsZCIsImRiVXNlciIsIm5ld1VzZXIiLCJ1c2VybmFtZSIsImlzQm90IiwiYm90IiwiUHJvbWlzZSIsInJlc29sdmUiLCJhbGwiLCJ1cGRhdGVQb2ludHMiLCJjb25maWd1cmF0aW9uU2VydmljZSIsImdldExhc3RTeW5jIiwibGFzdFN5bmMiLCJ0b2RheSIsIkRhdGUiLCJ1c2VycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBR08sSUFBTUEsR0FBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUcsaUJBQU9DLEVBQVAsRUFBV0MsUUFBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDRkMsY0FBTUMsT0FBTixDQUFjO0FBQUVILGNBQUFBLEVBQUUsRUFBRkEsRUFBRjtBQUFNSSxjQUFBQSxNQUFNLEVBQUVIO0FBQWQsYUFBZCxDQURFOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBSEYsR0FBRztBQUFBO0FBQUE7QUFBQSxHQUFUOzs7O0FBR0EsSUFBTU0sTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUcsa0JBQU9D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O0FBQUEsZ0JBREc7QUFBQSw4Q0FjYkssT0FBTyxDQUFDRSxHQUFSLENBQVlWLFFBQVosQ0FkYTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFSRixRQUFRO0FBQUE7QUFBQTtBQUFBLEdBQWQ7Ozs7QUFnQkEsSUFBTWEsWUFBWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDREMsb0JBQW9CLENBQUNDLFdBQXJCLEVBREM7O0FBQUE7QUFDbEJDLFlBQUFBLFFBRGtCO0FBRWxCQyxZQUFBQSxLQUZrQixHQUVWLElBQUlDLElBQUosRUFGVTs7QUFBQSxpQkFHcEIsMkJBQVdGLFFBQVgsRUFBcUJDLEtBQXJCLENBSG9CO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQSxtQkFNSnBDLGNBQU1RLElBQU4sRUFOSTs7QUFBQTtBQU1sQjhCLFlBQUFBLEtBTmtCO0FBT2xCakIsWUFBQUEsUUFQa0IsR0FPUGlCLEtBQUssQ0FBQ2hCLEdBQU4sQ0FBVSxVQUFDbEIsSUFBRCxFQUFVO0FBQ2pDQSxjQUFBQSxJQUFJLENBQUNTLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxxQkFBT1QsSUFBSSxDQUFDYyxJQUFMLEVBQVA7QUFDSCxhQUhnQixDQVBPO0FBQUE7QUFBQSxtQkFXbEJXLE9BQU8sQ0FBQ0UsR0FBUixDQUFZVixRQUFaLENBWGtCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQVpXLFlBQVk7QUFBQTtBQUFBO0FBQUEsR0FBbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXNlcnMgZnJvbSBcIm1vZGVscy91c2VyXCI7XHJcbmltcG9ydCAqIGFzIGNvbmZpZ3VyYXRpb25TZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy9jb25maWd1cmF0aW9uXCI7XHJcbmltcG9ydCBpc1NhbWVXZWVrIGZyb20gXCJkYXRlLWZucy9pc19zYW1lX3dlZWtcIjtcclxuaW1wb3J0IHsgR3VpbGRNZW1iZXIgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldCA9IGFzeW5jIChpZCwgc2VydmVySWQpID0+IHtcclxuICAgIHJldHVybiBhd2FpdCBVc2Vycy5maW5kT25lKHsgaWQsIHNlcnZlcjogc2VydmVySWQgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBjcmVhdGUgPSBhc3luYyAodXNlcikgPT4ge1xyXG4gICAgcmV0dXJuIFVzZXJzLmNyZWF0ZSh1c2VyKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldE1vc3RBY3RpdmVVc2VycyA9IGFzeW5jIChndWlsZElkLCBsaW1pdCkgPT4ge1xyXG4gICAgcmV0dXJuIFVzZXJzXHJcbiAgICAgICAgLmZpbmQoeyBzZXJ2ZXI6IGd1aWxkSWQsIHBvaW50czogeyAkZ3Q6IDAgfSB9KVxyXG4gICAgICAgIC5zb3J0KHsgcG9pbnRzOiBcImRlc2NcIiB9KVxyXG4gICAgICAgIC5saW1pdChsaW1pdCk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRNb3N0QWN0aXZlVXNlcnNUaGlzV2VlayA9IGFzeW5jIChndWlsZElkLCBsaW1pdCkgPT4ge1xyXG4gICAgcmV0dXJuIFVzZXJzXHJcbiAgICAgICAgLmZpbmQoeyBzZXJ2ZXI6IGd1aWxkSWQsIHBvaW50c1dlZWtseTogeyAkZ3Q6IDAgfSB9KVxyXG4gICAgICAgIC5zb3J0KHsgcG9pbnRzV2Vla2x5OiBcImRlc2NcIiB9KVxyXG4gICAgICAgIC5saW1pdChsaW1pdCk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRJbmFjdGl2ZVVzZXJzID0gYXN5bmMgKGd1aWxkSWQsIGxpbWl0KSA9PiB7XHJcbiAgICByZXR1cm4gVXNlcnNcclxuICAgICAgICAuZmluZCh7IHNlcnZlcjogZ3VpbGRJZCwgcG9pbnRzOiB7ICRsdGU6IDEwIH19KVxyXG4gICAgICAgIC5zb3J0KHsgcG9pbnRzOiBcImFzY1wiIH0pXHJcbiAgICAgICAgLmxpbWl0KGxpbWl0KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEluYWN0aXZlVXNlcnNUaGlzV2VlayA9IGFzeW5jIChndWlsZElkLCBsaW1pdCkgPT4ge1xyXG4gICAgcmV0dXJuIFVzZXJzXHJcbiAgICAgICAgLmZpbmQoeyBzZXJ2ZXI6IGd1aWxkSWQsIHBvaW50c1dlZWtseTogeyAkbHRlOiAxMCB9LCB9KVxyXG4gICAgICAgIC5zb3J0KHsgcG9pbnRzV2Vla2x5OiBcImFzY1wiIH0pXHJcbiAgICAgICAgLmxpbWl0KGxpbWl0KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFkZFBvaW50cyA9IGFzeW5jICh1c2VyLCBwb2ludHMpID0+IHtcclxuICAgIHVzZXIucG9pbnRzICs9IHBvaW50cztcclxuICAgIHVzZXIucG9pbnRzV2Vla2x5ICs9IHBvaW50cztcclxuICAgIHJldHVybiB1c2VyLnNhdmUoKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFkZFVzZXJzID0gYXN5bmMgKGd1aWxkTWVtYmVyczogR3VpbGRNZW1iZXJbXSkgPT4ge1xyXG4gICAgY29uc3QgcHJvbWlzZXMgPSBndWlsZE1lbWJlcnMubWFwKGFzeW5jICh7IGlkLCB1c2VyLCBndWlsZCB9KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGJVc2VyID0gYXdhaXQgZ2V0KGlkLCBndWlsZC5pZCk7XHJcbiAgICAgICAgaWYgKCFkYlVzZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3VXNlciA9IHtcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXI6IGd1aWxkLmlkLFxyXG4gICAgICAgICAgICAgICAgaXNCb3Q6IHVzZXIuYm90LFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlKG5ld1VzZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHJlc29sdmUoZGJVc2VyKSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCB1cGRhdGVQb2ludHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBsYXN0U3luYyA9IGF3YWl0IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmdldExhc3RTeW5jKCk7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICBpZiAoaXNTYW1lV2VlayhsYXN0U3luYywgdG9kYXkpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdXNlcnMgPSBhd2FpdCBVc2Vycy5maW5kKCk7XHJcbiAgICBjb25zdCBwcm9taXNlcyA9IHVzZXJzLm1hcCgodXNlcikgPT4ge1xyXG4gICAgICAgIHVzZXIucG9pbnRzV2Vla2x5ID0gMDtcclxuICAgICAgICByZXR1cm4gdXNlci5zYXZlKCk7XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcclxufTsiXX0=