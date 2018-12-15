"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canManageMeetings = exports.lockMeetingChannel = exports.unlockMeetingChannel = exports.setMeetingChannel = exports.getMeetingChannel = exports.sendToDefaultChannel = exports.hasDefaultChannel = exports.updateGuilds = exports.setDefaultChannel = exports.addGuild = exports.getGuild = exports.getGuilds = void 0;

var _logger = _interopRequireDefault(require("logger"));

var _guild = _interopRequireDefault(require("models/guild"));

var _store = _interopRequireDefault(require("persistence/store"));

var userService = _interopRequireWildcard(require("services/user"));

var _types = require("domain/types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var guildsCache = _store.default.instance.guilds;

var getGuilds =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var dbGuilds;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!guildsCache.size) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", guildsCache);

          case 3:
            _context.next = 5;
            return _guild.default.find();

          case 5:
            dbGuilds = _context.sent;
            guildsCache.clear();
            dbGuilds.forEach(function (guild) {
              guildsCache.set(guild.id, new _types.Guild(guild));
            });
            return _context.abrupt("return", guildsCache);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);

            _logger.default.error(_context.t0);

            return _context.abrupt("return", false);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 11]]);
  }));

  return function getGuilds() {
    return _ref.apply(this, arguments);
  };
}();

exports.getGuilds = getGuilds;

var getGuild = function getGuild(id) {
  if (guildsCache.get(id)) {
    return guildsCache.get(id);
  }

  _logger.default.error("Couldn't find the guild ".concat(id));

  return null;
};

exports.getGuild = getGuild;

var addGuild =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(id, name) {
    var guild;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _guild.default.findOne({
              id: id
            });

          case 3:
            guild = _context2.sent;

            if (!guild) {
              _context2.next = 7;
              break;
            }

            _logger.default.log("The guild ".concat(id, ": ").concat(name, " already exists"));

            return _context2.abrupt("return", {
              error: "Guild already exists"
            });

          case 7:
            _context2.next = 9;
            return _guild.default.create({
              id: id,
              name: name,
              defaultChannelId: null,
              leftServer: false
            });

          case 9:
            guild = _context2.sent;
            guildsCache.set(id, new _types.Guild(guild));
            return _context2.abrupt("return", guild);

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);

            _logger.default.error(_context2.t0);

            return _context2.abrupt("return", false);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 14]]);
  }));

  return function addGuild(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addGuild = addGuild;

var setDefaultChannel =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(guildId, channel) {
    var guild;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _guild.default.findOne({
              id: guildId
            });

          case 2:
            guild = _context3.sent;
            guild.defaultChannelId = channel.id;
            _context3.next = 6;
            return guild.save();

          case 6:
            guildsCache.get(guildId).setDefaultChannel(channel);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function setDefaultChannel(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.setDefaultChannel = setDefaultChannel;

var updateGuilds =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(guilds) {
    var dbGuilds, promises;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getGuilds();

          case 2:
            dbGuilds = _context5.sent;

            if (dbGuilds) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return");

          case 5:
            dbGuilds.forEach(function (_, id) {
              if (!guilds.has(id)) {
                dbGuilds.delete(id);
              }
            });
            promises = [];
            guilds.forEach(
            /*#__PURE__*/
            function () {
              var _ref5 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee4(guild, id) {
                var guildName;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        promises.push(userService.addUsers(guild.members.array()));

                        if (!dbGuilds.has(id)) {
                          guildName = guild.name;
                          promises.push(addGuild(id, guildName));
                        } else if (dbGuilds.get(id).defaultChannelId) {
                          promises.push(setDefaultChannel(id, guild.channels.get(dbGuilds.get(id).defaultChannelId)));
                        }

                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, this);
              }));

              return function (_x6, _x7) {
                return _ref5.apply(this, arguments);
              };
            }());
            return _context5.abrupt("return", Promise.all(promises));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function updateGuilds(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateGuilds = updateGuilds;

var hasDefaultChannel = function hasDefaultChannel(guildId) {
  return getGuild(guildId).defaultChannel !== null;
};

exports.hasDefaultChannel = hasDefaultChannel;

var sendToDefaultChannel =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(guildId, message) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", getGuild(guildId).defaultChannel.send(message));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function sendToDefaultChannel(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

exports.sendToDefaultChannel = sendToDefaultChannel;

var getMeetingChannel = function getMeetingChannel(guildId) {
  return getGuild(guildId).meetingChannel;
};

exports.getMeetingChannel = getMeetingChannel;

var setMeetingChannel =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(channel) {
    var id, guild;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = channel.guild.id;
            _context7.next = 3;
            return _guild.default.findOne({
              id: id
            });

          case 3:
            guild = _context7.sent;
            guild.meetingChannelId = channel.id;
            _context7.next = 7;
            return guild.save();

          case 7:
            guildsCache.get(id).setMeetingChannel(channel);
            _context7.next = 10;
            return lockMeetingChannel(id);

          case 10:
            if (_context7.sent) {
              _context7.next = 12;
              break;
            }

            return _context7.abrupt("return", false);

          case 12:
            return _context7.abrupt("return", getMeetingChannel(id));

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function setMeetingChannel(_x10) {
    return _ref7.apply(this, arguments);
  };
}();

exports.setMeetingChannel = setMeetingChannel;

var unlockMeetingChannel =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(guildId) {
    var channel;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            channel = getMeetingChannel(guildId);
            _context8.prev = 1;
            _context8.next = 4;
            return channel.overwritePermissions(guildId, {
              SEND_MESSAGES: true
            });

          case 4:
            return _context8.abrupt("return", true);

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](1);
            return _context8.abrupt("return", false);

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this, [[1, 7]]);
  }));

  return function unlockMeetingChannel(_x11) {
    return _ref8.apply(this, arguments);
  };
}();

exports.unlockMeetingChannel = unlockMeetingChannel;

var lockMeetingChannel =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(guildId) {
    var channel;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            channel = getMeetingChannel(guildId);

            if (channel) {
              _context9.next = 4;
              break;
            }

            _logger.default.warn("The server ".concat(guildId, " doesn't have a meeting channel"));

            return _context9.abrupt("return", false);

          case 4:
            _context9.prev = 4;
            _context9.next = 7;
            return channel.overwritePermissions(guildId, {
              SEND_MESSAGES: false
            });

          case 7:
            return _context9.abrupt("return", true);

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](4);

            _logger.default.warn("Not enough permissions to overwrite ".concat(guildId, "'s meeting channel permissions"));

            return _context9.abrupt("return", false);

          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this, [[4, 10]]);
  }));

  return function lockMeetingChannel(_x12) {
    return _ref9.apply(this, arguments);
  };
}();

exports.lockMeetingChannel = lockMeetingChannel;

var canManageMeetings = function canManageMeetings(user, guild) {
  var author = guild.members.find(function (member) {
    return member.id === user.id;
  });

  if (!author) {
    _logger.default.error("The author ".concat(user, " was not found in ").concat(guild));

    return false;
  }

  return guild.ownerID === user.id;
};

exports.canManageMeetings = canManageMeetings;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9ndWlsZC50cyJdLCJuYW1lcyI6WyJndWlsZHNDYWNoZSIsIlN0b3JlIiwiaW5zdGFuY2UiLCJndWlsZHMiLCJnZXRHdWlsZHMiLCJzaXplIiwiR3VpbGRzIiwiZmluZCIsImRiR3VpbGRzIiwiY2xlYXIiLCJmb3JFYWNoIiwiZ3VpbGQiLCJzZXQiLCJpZCIsIkd1aWxkIiwiTG9nZ2VyIiwiZXJyb3IiLCJnZXRHdWlsZCIsImdldCIsImFkZEd1aWxkIiwibmFtZSIsImZpbmRPbmUiLCJsb2ciLCJjcmVhdGUiLCJkZWZhdWx0Q2hhbm5lbElkIiwibGVmdFNlcnZlciIsInNldERlZmF1bHRDaGFubmVsIiwiZ3VpbGRJZCIsImNoYW5uZWwiLCJzYXZlIiwidXBkYXRlR3VpbGRzIiwiXyIsImhhcyIsImRlbGV0ZSIsInByb21pc2VzIiwicHVzaCIsInVzZXJTZXJ2aWNlIiwiYWRkVXNlcnMiLCJtZW1iZXJzIiwiYXJyYXkiLCJndWlsZE5hbWUiLCJjaGFubmVscyIsIlByb21pc2UiLCJhbGwiLCJoYXNEZWZhdWx0Q2hhbm5lbCIsImRlZmF1bHRDaGFubmVsIiwic2VuZFRvRGVmYXVsdENoYW5uZWwiLCJtZXNzYWdlIiwic2VuZCIsImdldE1lZXRpbmdDaGFubmVsIiwibWVldGluZ0NoYW5uZWwiLCJzZXRNZWV0aW5nQ2hhbm5lbCIsIm1lZXRpbmdDaGFubmVsSWQiLCJsb2NrTWVldGluZ0NoYW5uZWwiLCJ1bmxvY2tNZWV0aW5nQ2hhbm5lbCIsIm92ZXJ3cml0ZVBlcm1pc3Npb25zIiwiU0VORF9NRVNTQUdFUyIsIndhcm4iLCJjYW5NYW5hZ2VNZWV0aW5ncyIsInVzZXIiLCJhdXRob3IiLCJtZW1iZXIiLCJvd25lcklEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFHQSxJQUFNQSxXQUFXLEdBQUdDLGVBQU1DLFFBQU4sQ0FBZUMsTUFBbkM7O0FBRU8sSUFBTUMs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LENBQUMrQyxNQUFMLEVBQWE7QUFDVDdDLG9CQUFPQyxLQUFQLHNCQUEyQjJDLElBQTNCLCtCQUFvRGhELEtBQXBEOztBQUNBLFdBQU8sS0FBUDtBQUNIOztBQUNELFNBQU9BLEtBQUssQ0FBQ21ELE9BQU4sS0FBa0JILElBQUksQ0FBQzlDLEVBQTlCO0FBQ0gsQ0FQTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2dnZXIgZnJvbSBcImxvZ2dlclwiO1xyXG5pbXBvcnQgR3VpbGRzIGZyb20gXCJtb2RlbHMvZ3VpbGRcIjtcclxuaW1wb3J0IFN0b3JlIGZyb20gXCJwZXJzaXN0ZW5jZS9zdG9yZVwiO1xyXG5pbXBvcnQgKiBhcyB1c2VyU2VydmljZSBmcm9tIFwic2VydmljZXMvdXNlclwiO1xyXG5pbXBvcnQgeyBHdWlsZCB9IGZyb20gXCJkb21haW4vdHlwZXNcIjtcclxuaW1wb3J0IHsgR3VpbGRDaGFubmVsLCBUZXh0Q2hhbm5lbCwgR3VpbGQgYXMgRGlzY29yZEd1aWxkLCBDb2xsZWN0aW9uLCBVc2VyIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuXHJcbmNvbnN0IGd1aWxkc0NhY2hlID0gU3RvcmUuaW5zdGFuY2UuZ3VpbGRzO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEd1aWxkcyA9IGFzeW5jICgpOiBQcm9taXNlPE1hcDxzdHJpbmcsIEd1aWxkPiB8IGZhbHNlPiA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChndWlsZHNDYWNoZS5zaXplKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBndWlsZHNDYWNoZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGJHdWlsZHMgPSBhd2FpdCBHdWlsZHMuZmluZCgpO1xyXG4gICAgICAgIGd1aWxkc0NhY2hlLmNsZWFyKCk7XHJcbiAgICAgICAgZGJHdWlsZHMuZm9yRWFjaCgoZ3VpbGQpID0+IHtcclxuICAgICAgICAgICAgZ3VpbGRzQ2FjaGUuc2V0KGd1aWxkLmlkLCBuZXcgR3VpbGQoZ3VpbGQpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZ3VpbGRzQ2FjaGU7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0R3VpbGQgPSAoaWQ6IHN0cmluZyk6IEd1aWxkID0+IHtcclxuICAgIGlmIChndWlsZHNDYWNoZS5nZXQoaWQpKSB7XHJcbiAgICAgICAgcmV0dXJuIGd1aWxkc0NhY2hlLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICBMb2dnZXIuZXJyb3IoYENvdWxkbid0IGZpbmQgdGhlIGd1aWxkICR7aWR9YCk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFkZEd1aWxkID0gYXN5bmMgKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBsZXQgZ3VpbGQgPSBhd2FpdCBHdWlsZHMuZmluZE9uZSh7IGlkIH0pO1xyXG4gICAgICAgIGlmIChndWlsZCkge1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKGBUaGUgZ3VpbGQgJHtpZH06ICR7bmFtZX0gYWxyZWFkeSBleGlzdHNgKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiR3VpbGQgYWxyZWFkeSBleGlzdHNcIiB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBndWlsZCA9IGF3YWl0IEd1aWxkcy5jcmVhdGUoe1xyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgZGVmYXVsdENoYW5uZWxJZDogbnVsbCxcclxuICAgICAgICAgICAgbGVmdFNlcnZlcjogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZ3VpbGRzQ2FjaGUuc2V0KGlkLCBuZXcgR3VpbGQoZ3VpbGQpKTtcclxuICAgICAgICByZXR1cm4gZ3VpbGQ7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0RGVmYXVsdENoYW5uZWwgPSBhc3luYyAoZ3VpbGRJZDogc3RyaW5nLCBjaGFubmVsOiBUZXh0Q2hhbm5lbCkgPT4ge1xyXG4gICAgY29uc3QgZ3VpbGQgPSBhd2FpdCBHdWlsZHMuZmluZE9uZSh7IGlkOiBndWlsZElkIH0pO1xyXG4gICAgZ3VpbGQuZGVmYXVsdENoYW5uZWxJZCA9IGNoYW5uZWwuaWQ7XHJcbiAgICBhd2FpdCBndWlsZC5zYXZlKCk7XHJcbiAgICBndWlsZHNDYWNoZS5nZXQoZ3VpbGRJZCkuc2V0RGVmYXVsdENoYW5uZWwoY2hhbm5lbCk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCB1cGRhdGVHdWlsZHMgPSBhc3luYyAoZ3VpbGRzOiBDb2xsZWN0aW9uPHN0cmluZywgRGlzY29yZEd1aWxkPikgPT4ge1xyXG4gICAgY29uc3QgZGJHdWlsZHMgPSBhd2FpdCBnZXRHdWlsZHMoKTtcclxuICAgIGlmKCFkYkd1aWxkcykgcmV0dXJuO1xyXG5cclxuICAgIGRiR3VpbGRzLmZvckVhY2goKF8sIGlkKSA9PiB7XHJcbiAgICAgICAgaWYgKCFndWlsZHMuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICBkYkd1aWxkcy5kZWxldGUoaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICBndWlsZHMuZm9yRWFjaChhc3luYyAoZ3VpbGQsIGlkKSA9PiB7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaCh1c2VyU2VydmljZS5hZGRVc2VycyhndWlsZC5tZW1iZXJzLmFycmF5KCkpKTtcclxuICAgICAgICBpZiAoIWRiR3VpbGRzLmhhcyhpZCkpIHtcclxuICAgICAgICAgICAgY29uc3QgZ3VpbGROYW1lID0gZ3VpbGQubmFtZTtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChhZGRHdWlsZChpZCwgZ3VpbGROYW1lKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYkd1aWxkcy5nZXQoaWQpLmRlZmF1bHRDaGFubmVsSWQpIHtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZXREZWZhdWx0Q2hhbm5lbChcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgPFRleHRDaGFubmVsPmd1aWxkLmNoYW5uZWxzLmdldChkYkd1aWxkcy5nZXQoaWQpLmRlZmF1bHRDaGFubmVsSWQpLFxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBoYXNEZWZhdWx0Q2hhbm5lbCA9IChndWlsZElkOiBzdHJpbmcpID0+IHtcclxuICAgIHJldHVybiBnZXRHdWlsZChndWlsZElkKS5kZWZhdWx0Q2hhbm5lbCAhPT0gbnVsbDtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNlbmRUb0RlZmF1bHRDaGFubmVsID0gYXN5bmMgKGd1aWxkSWQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gZ2V0R3VpbGQoZ3VpbGRJZCkuZGVmYXVsdENoYW5uZWwuc2VuZChtZXNzYWdlKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldE1lZXRpbmdDaGFubmVsID0gKGd1aWxkSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgcmV0dXJuIGdldEd1aWxkKGd1aWxkSWQpLm1lZXRpbmdDaGFubmVsO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0TWVldGluZ0NoYW5uZWwgPSBhc3luYyAoY2hhbm5lbDogR3VpbGRDaGFubmVsKSA9PiB7XHJcbiAgICBjb25zdCBpZCA9IGNoYW5uZWwuZ3VpbGQuaWQ7XHJcbiAgICBjb25zdCBndWlsZCA9IGF3YWl0IEd1aWxkcy5maW5kT25lKHsgaWQgfSk7XHJcbiAgICBndWlsZC5tZWV0aW5nQ2hhbm5lbElkID0gY2hhbm5lbC5pZDtcclxuICAgIGF3YWl0IGd1aWxkLnNhdmUoKTtcclxuICAgIGd1aWxkc0NhY2hlLmdldChpZCkuc2V0TWVldGluZ0NoYW5uZWwoY2hhbm5lbCk7XHJcbiAgICBpZiAoIWF3YWl0IGxvY2tNZWV0aW5nQ2hhbm5lbChpZCkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2V0TWVldGluZ0NoYW5uZWwoaWQpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgdW5sb2NrTWVldGluZ0NoYW5uZWwgPSBhc3luYyAoZ3VpbGRJZDogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCBjaGFubmVsID0gZ2V0TWVldGluZ0NoYW5uZWwoZ3VpbGRJZCk7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIGd1aWxkSWQgaXMgdGhlIHNub3dmbGFrZSBmb3IgQGV2ZXJ5b25lXHJcbiAgICAgICAgYXdhaXQgY2hhbm5lbC5vdmVyd3JpdGVQZXJtaXNzaW9ucyhndWlsZElkLCB7XHJcbiAgICAgICAgICAgIFNFTkRfTUVTU0FHRVM6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2goXykge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGxvY2tNZWV0aW5nQ2hhbm5lbCA9IGFzeW5jIChndWlsZElkOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IGNoYW5uZWwgPSBnZXRNZWV0aW5nQ2hhbm5lbChndWlsZElkKTtcclxuICAgIGlmICghY2hhbm5lbCkge1xyXG4gICAgICAgIExvZ2dlci53YXJuKGBUaGUgc2VydmVyICR7Z3VpbGRJZH0gZG9lc24ndCBoYXZlIGEgbWVldGluZyBjaGFubmVsYCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBndWlsZElkIGlzIHRoZSBzbm93Zmxha2UgZm9yIEBldmVyeW9uZVxyXG4gICAgICAgIGF3YWl0IGNoYW5uZWwub3ZlcndyaXRlUGVybWlzc2lvbnMoZ3VpbGRJZCwge1xyXG4gICAgICAgICAgICBTRU5EX01FU1NBR0VTOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaChfKSB7XHJcbiAgICAgICAgTG9nZ2VyLndhcm4oYE5vdCBlbm91Z2ggcGVybWlzc2lvbnMgdG8gb3ZlcndyaXRlICR7Z3VpbGRJZH0ncyBtZWV0aW5nIGNoYW5uZWwgcGVybWlzc2lvbnNgKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBjYW5NYW5hZ2VNZWV0aW5ncyA9ICh1c2VyOiBVc2VyLCBndWlsZDogRGlzY29yZEd1aWxkKSA9PiB7XHJcbiAgICBjb25zdCBhdXRob3IgPSBndWlsZC5tZW1iZXJzLmZpbmQoKG1lbWJlcikgPT4gbWVtYmVyLmlkID09PSB1c2VyLmlkKTtcclxuICAgIGlmICghYXV0aG9yKSB7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKGBUaGUgYXV0aG9yICR7dXNlcn0gd2FzIG5vdCBmb3VuZCBpbiAke2d1aWxkfWApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBndWlsZC5vd25lcklEID09PSB1c2VyLmlkO1xyXG59OyJdfQ==