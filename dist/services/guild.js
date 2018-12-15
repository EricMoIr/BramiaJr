"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lockMeetingChannel = exports.unlockMeetingChannel = exports.setMeetingChannel = exports.getMeetingChannel = exports.sendToDefaultChannel = exports.hasDefaultChannel = exports.updateGuilds = exports.setDefaultChannel = exports.addGuild = exports.getGuild = exports.getGuilds = void 0;

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
            Object.keys(dbGuilds).forEach(function (id) {
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
            return _context7.abrupt("return", getMeetingChannel(id));

          case 11:
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
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _logger.default.warn("TODO: unlockMeetingChannel");

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
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
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _logger.default.warn("TODO: lockMeetingChannel");

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function lockMeetingChannel(_x12) {
    return _ref9.apply(this, arguments);
  };
}();

exports.lockMeetingChannel = lockMeetingChannel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9ndWlsZC50cyJdLCJuYW1lcyI6WyJndWlsZHNDYWNoZSIsIlN0b3JlIiwiaW5zdGFuY2UiLCJndWlsZHMiLCJnZXRHdWlsZHMiLCJzaXplIiwiR3VpbGRzIiwiZmluZCIsImRiR3VpbGRzIiwiY2xlYXIiLCJmb3JFYWNoIiwiZ3VpbGQiLCJzZXQiLCJpZCIsIkd1aWxkIiwiTG9nZ2VyIiwiZXJyb3IiLCJnZXRHdWlsZCIsImdldCIsImFkZEd1aWxkIiwibmFtZSIsImZpbmRPbmUiLCJsb2ciLCJjcmVhdGUiLCJkZWZhdWx0Q2hhbm5lbElkIiwibGVmdFNlcnZlciIsInNldERlZmF1bHRDaGFubmVsIiwiZ3VpbGRJZCIsImNoYW5uZWwiLCJzYXZlIiwidXBkYXRlR3VpbGRzIiwiT2JqZWN0Iiwia2V5cyIsImhhcyIsImRlbGV0ZSIsInByb21pc2VzIiwicHVzaCIsInVzZXJTZXJ2aWNlIiwiYWRkVXNlcnMiLCJtZW1iZXJzIiwiYXJyYXkiLCJndWlsZE5hbWUiLCJjaGFubmVscyIsIlByb21pc2UiLCJhbGwiLCJoYXNEZWZhdWx0Q2hhbm5lbCIsImRlZmF1bHRDaGFubmVsIiwic2VuZFRvRGVmYXVsdENoYW5uZWwiLCJtZXNzYWdlIiwic2VuZCIsImdldE1lZXRpbmdDaGFubmVsIiwibWVldGluZ0NoYW5uZWwiLCJzZXRNZWV0aW5nQ2hhbm5lbCIsIm1lZXRpbmdDaGFubmVsSWQiLCJsb2NrTWVldGluZ0NoYW5uZWwiLCJ1bmxvY2tNZWV0aW5nQ2hhbm5lbCIsIndhcm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUdBLElBQU1BLFdBQVcsR0FBR0MsZUFBTUMsUUFBTixDQUFlQyxNQUFuQzs7QUFFTyxJQUFNQyxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxpQkFFYkosV0FB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QTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBbEJGLGtCQUFrQjtBQUFBO0FBQUE7QUFBQSxHQUF4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2dnZXIgZnJvbSBcImxvZ2dlclwiO1xyXG5pbXBvcnQgR3VpbGRzIGZyb20gXCJtb2RlbHMvZ3VpbGRcIjtcclxuaW1wb3J0IFN0b3JlIGZyb20gXCJwZXJzaXN0ZW5jZS9zdG9yZVwiO1xyXG5pbXBvcnQgKiBhcyB1c2VyU2VydmljZSBmcm9tIFwic2VydmljZXMvdXNlclwiO1xyXG5pbXBvcnQgeyBHdWlsZCB9IGZyb20gXCJkb21haW4vdHlwZXNcIjtcclxuaW1wb3J0IHsgR3VpbGRDaGFubmVsLCBUZXh0Q2hhbm5lbCwgR3VpbGQgYXMgRGlzY29yZEd1aWxkLCBDb2xsZWN0aW9uIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuXHJcbmNvbnN0IGd1aWxkc0NhY2hlID0gU3RvcmUuaW5zdGFuY2UuZ3VpbGRzO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEd1aWxkcyA9IGFzeW5jICgpOiBQcm9taXNlPE1hcDxzdHJpbmcsIEd1aWxkPiB8IGZhbHNlPiA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChndWlsZHNDYWNoZS5zaXplKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBndWlsZHNDYWNoZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGJHdWlsZHMgPSBhd2FpdCBHdWlsZHMuZmluZCgpO1xyXG4gICAgICAgIGd1aWxkc0NhY2hlLmNsZWFyKCk7XHJcbiAgICAgICAgZGJHdWlsZHMuZm9yRWFjaCgoZ3VpbGQpID0+IHtcclxuICAgICAgICAgICAgZ3VpbGRzQ2FjaGUuc2V0KGd1aWxkLmlkLCBuZXcgR3VpbGQoZ3VpbGQpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZ3VpbGRzQ2FjaGU7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0R3VpbGQgPSAoaWQ6IHN0cmluZyk6IEd1aWxkID0+IHtcclxuICAgIGlmIChndWlsZHNDYWNoZS5nZXQoaWQpKSB7XHJcbiAgICAgICAgcmV0dXJuIGd1aWxkc0NhY2hlLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICBMb2dnZXIuZXJyb3IoYENvdWxkbid0IGZpbmQgdGhlIGd1aWxkICR7aWR9YCk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFkZEd1aWxkID0gYXN5bmMgKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBsZXQgZ3VpbGQgPSBhd2FpdCBHdWlsZHMuZmluZE9uZSh7IGlkIH0pO1xyXG4gICAgICAgIGlmIChndWlsZCkge1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKGBUaGUgZ3VpbGQgJHtpZH06ICR7bmFtZX0gYWxyZWFkeSBleGlzdHNgKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiR3VpbGQgYWxyZWFkeSBleGlzdHNcIiB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBndWlsZCA9IGF3YWl0IEd1aWxkcy5jcmVhdGUoe1xyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgZGVmYXVsdENoYW5uZWxJZDogbnVsbCxcclxuICAgICAgICAgICAgbGVmdFNlcnZlcjogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZ3VpbGRzQ2FjaGUuc2V0KGlkLCBuZXcgR3VpbGQoZ3VpbGQpKTtcclxuICAgICAgICByZXR1cm4gZ3VpbGQ7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0RGVmYXVsdENoYW5uZWwgPSBhc3luYyAoZ3VpbGRJZDogc3RyaW5nLCBjaGFubmVsOiBUZXh0Q2hhbm5lbCkgPT4ge1xyXG4gICAgY29uc3QgZ3VpbGQgPSBhd2FpdCBHdWlsZHMuZmluZE9uZSh7IGlkOiBndWlsZElkIH0pO1xyXG4gICAgZ3VpbGQuZGVmYXVsdENoYW5uZWxJZCA9IGNoYW5uZWwuaWQ7XHJcbiAgICBhd2FpdCBndWlsZC5zYXZlKCk7XHJcbiAgICBndWlsZHNDYWNoZS5nZXQoZ3VpbGRJZCkuc2V0RGVmYXVsdENoYW5uZWwoY2hhbm5lbCk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCB1cGRhdGVHdWlsZHMgPSBhc3luYyAoZ3VpbGRzOiBDb2xsZWN0aW9uPHN0cmluZywgRGlzY29yZEd1aWxkPikgPT4ge1xyXG4gICAgY29uc3QgZGJHdWlsZHMgPSBhd2FpdCBnZXRHdWlsZHMoKTtcclxuICAgIGlmKCFkYkd1aWxkcykgcmV0dXJuO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGRiR3VpbGRzKS5mb3JFYWNoKChpZCkgPT4ge1xyXG4gICAgICAgIGlmICghZ3VpbGRzLmhhcyhpZCkpIHtcclxuICAgICAgICAgICAgZGJHdWlsZHMuZGVsZXRlKGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgZ3VpbGRzLmZvckVhY2goYXN5bmMgKGd1aWxkLCBpZCkgPT4ge1xyXG4gICAgICAgIHByb21pc2VzLnB1c2godXNlclNlcnZpY2UuYWRkVXNlcnMoZ3VpbGQubWVtYmVycy5hcnJheSgpKSk7XHJcbiAgICAgICAgaWYgKCFkYkd1aWxkcy5oYXMoaWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGd1aWxkTmFtZSA9IGd1aWxkLm5hbWU7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goYWRkR3VpbGQoaWQsIGd1aWxkTmFtZSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGJHdWlsZHMuZ2V0KGlkKS5kZWZhdWx0Q2hhbm5lbElkKSB7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2V0RGVmYXVsdENoYW5uZWwoXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIDxUZXh0Q2hhbm5lbD5ndWlsZC5jaGFubmVscy5nZXQoZGJHdWlsZHMuZ2V0KGlkKS5kZWZhdWx0Q2hhbm5lbElkKSxcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgaGFzRGVmYXVsdENoYW5uZWwgPSAoZ3VpbGRJZDogc3RyaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gZ2V0R3VpbGQoZ3VpbGRJZCkuZGVmYXVsdENoYW5uZWwgIT09IG51bGw7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZW5kVG9EZWZhdWx0Q2hhbm5lbCA9IGFzeW5jIChndWlsZElkOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykgPT4ge1xyXG4gICAgcmV0dXJuIGdldEd1aWxkKGd1aWxkSWQpLmRlZmF1bHRDaGFubmVsLnNlbmQobWVzc2FnZSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRNZWV0aW5nQ2hhbm5lbCA9IChndWlsZElkOiBzdHJpbmcpID0+IHtcclxuICAgIHJldHVybiBnZXRHdWlsZChndWlsZElkKS5tZWV0aW5nQ2hhbm5lbDtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldE1lZXRpbmdDaGFubmVsID0gYXN5bmMgKGNoYW5uZWw6IEd1aWxkQ2hhbm5lbCkgPT4ge1xyXG4gICAgY29uc3QgaWQgPSBjaGFubmVsLmd1aWxkLmlkO1xyXG4gICAgY29uc3QgZ3VpbGQgPSBhd2FpdCBHdWlsZHMuZmluZE9uZSh7IGlkIH0pO1xyXG4gICAgZ3VpbGQubWVldGluZ0NoYW5uZWxJZCA9IGNoYW5uZWwuaWQ7XHJcbiAgICBhd2FpdCBndWlsZC5zYXZlKCk7XHJcbiAgICBndWlsZHNDYWNoZS5nZXQoaWQpLnNldE1lZXRpbmdDaGFubmVsKGNoYW5uZWwpO1xyXG4gICAgYXdhaXQgbG9ja01lZXRpbmdDaGFubmVsKGlkKTtcclxuICAgIHJldHVybiBnZXRNZWV0aW5nQ2hhbm5lbChpZCk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCB1bmxvY2tNZWV0aW5nQ2hhbm5lbCA9IGFzeW5jIChndWlsZElkOiBzdHJpbmcpID0+IHtcclxuICAgIExvZ2dlci53YXJuKFwiVE9ETzogdW5sb2NrTWVldGluZ0NoYW5uZWxcIik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBsb2NrTWVldGluZ0NoYW5uZWwgPSBhc3luYyAoZ3VpbGRJZDogc3RyaW5nKSA9PiB7XHJcbiAgICBMb2dnZXIud2FybihcIlRPRE86IGxvY2tNZWV0aW5nQ2hhbm5lbFwiKTtcclxufTsiXX0=