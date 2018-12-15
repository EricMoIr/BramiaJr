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
    var channel;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            channel = getMeetingChannel(guildId); // guildId is the snowflake for @everyone

            return _context8.abrupt("return", channel.overwritePermissions(guildId, {
              SEND_MESSAGES: false
            }));

          case 2:
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
    var channel;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            channel = getMeetingChannel(guildId); // guildId is the snowflake for @everyone

            return _context9.abrupt("return", channel.overwritePermissions(guildId, {
              SEND_MESSAGES: true
            }));

          case 2:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9ndWlsZC50cyJdLCJuYW1lcyI6WyJndWlsZHNDYWNoZSIsIlN0b3JlIiwiaW5zdGFuY2UiLCJndWlsZHMiLCJnZXRHdWlsZHMiLCJzaXplIiwiR3VpbGRzIiwiZmluZCIsImRiR3VpbGRzIiwiY2xlYXIiLCJmb3JFYWNoIiwiZ3VpbGQiLCJzZXQiLCJpZCIsIkd1aWxkIiwiTG9nZ2VyIiwiZXJyb3IiLCJnZXRHdWlsZCIsImdldCIsImFkZEd1aWxkIiwibmFtZSIsImZpbmRPbmUiLCJsb2ciLCJjcmVhdGUiLCJkZWZhdWx0Q2hhbm5lbElkIiwibGVmdFNlcnZlciIsInNldERlZmF1bHRDaGFubmVsIiwiZ3VpbGRJZCIsImNoYW5uZWwiLCJzYXZlIiwidXBkYXRlR3VpbGRzIiwiXyIsImhhcyIsImRlbGV0ZSIsInByb21pc2VzIiwicHVzaCIsInVzZXJTZXJ2aWNlIiwiYWRkVXNlcnMiLCJtZW1iZXJzIiwiYXJyYXkiLCJndWlsZE5hbWUiLCJjaGFubmVscyIsIlByb21pc2UiLCJhbGwiLCJoYXNEZWZhdWx0Q2hhbm5lbCIsImRlZmF1bHRDaGFubmVsIiwic2VuZFRvRGVmYXVsdENoYW5uZWwiLCJtZXNzYWdlIiwic2VuZCIsImdldE1lZXRpbmdDaGFubmVsIiwibWVldGluZ0NoYW5uZWwiLCJzZXRNZWV0aW5nQ2hhbm5lbCIsIm1lZXRpbmdDaGFubmVsSWQiLCJsb2NrTWVldGluZ0NoYW5uZWwiLCJ1bmxvY2tNZWV0aW5nQ2hhbm5lbCIsIm92ZXJ3cml0ZVBlcm1pc3Npb25zIiwiU0VORF9NRVNTQUdFUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBR0EsSUFBTUEsV0FBVyxHQUFHQyxlQUFNQyxRQUFOLENBQWVDLE1BQW5DOztBQUVPLElBQU1DLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtB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QUFNRCxrQkFBa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHLGtCQUFPMUIsT0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDeEJDLFlBQUFBLE9BRHdCLEdBQ2RxQixpQkFBaUIsQ0FBQ3RCLE9BQUQsQ0FESCxFQUU5Qjs7QUFGOEIsOENBR3ZCQyxPQUFPLENBQUMyQixvQkFBUixDQUE2QjVCLE9BQTdCLEVBQXNDO0FBQ3pDNkIsY0FBQUEsYUFBYSxFQUFFO0FBRDBCLGFBQXRDLENBSHVCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQWxCSCxrQkFBa0I7QUFBQTtBQUFBO0FBQUEsR0FBeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9nZ2VyIGZyb20gXCJsb2dnZXJcIjtcclxuaW1wb3J0IEd1aWxkcyBmcm9tIFwibW9kZWxzL2d1aWxkXCI7XHJcbmltcG9ydCBTdG9yZSBmcm9tIFwicGVyc2lzdGVuY2Uvc3RvcmVcIjtcclxuaW1wb3J0ICogYXMgdXNlclNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL3VzZXJcIjtcclxuaW1wb3J0IHsgR3VpbGQgfSBmcm9tIFwiZG9tYWluL3R5cGVzXCI7XHJcbmltcG9ydCB7IEd1aWxkQ2hhbm5lbCwgVGV4dENoYW5uZWwsIEd1aWxkIGFzIERpc2NvcmRHdWlsZCwgQ29sbGVjdGlvbiB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcblxyXG5jb25zdCBndWlsZHNDYWNoZSA9IFN0b3JlLmluc3RhbmNlLmd1aWxkcztcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRHdWlsZHMgPSBhc3luYyAoKTogUHJvbWlzZTxNYXA8c3RyaW5nLCBHdWlsZD4gfCBmYWxzZT4gPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoZ3VpbGRzQ2FjaGUuc2l6ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ3VpbGRzQ2FjaGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRiR3VpbGRzID0gYXdhaXQgR3VpbGRzLmZpbmQoKTtcclxuICAgICAgICBndWlsZHNDYWNoZS5jbGVhcigpO1xyXG4gICAgICAgIGRiR3VpbGRzLmZvckVhY2goKGd1aWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGd1aWxkc0NhY2hlLnNldChndWlsZC5pZCwgbmV3IEd1aWxkKGd1aWxkKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGd1aWxkc0NhY2hlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEd1aWxkID0gKGlkOiBzdHJpbmcpOiBHdWlsZCA9PiB7XHJcbiAgICBpZiAoZ3VpbGRzQ2FjaGUuZ2V0KGlkKSkge1xyXG4gICAgICAgIHJldHVybiBndWlsZHNDYWNoZS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgTG9nZ2VyLmVycm9yKGBDb3VsZG4ndCBmaW5kIHRoZSBndWlsZCAke2lkfWApO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhZGRHdWlsZCA9IGFzeW5jIChpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGd1aWxkID0gYXdhaXQgR3VpbGRzLmZpbmRPbmUoeyBpZCB9KTtcclxuICAgICAgICBpZiAoZ3VpbGQpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhgVGhlIGd1aWxkICR7aWR9OiAke25hbWV9IGFscmVhZHkgZXhpc3RzYCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIkd1aWxkIGFscmVhZHkgZXhpc3RzXCIgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3VpbGQgPSBhd2FpdCBHdWlsZHMuY3JlYXRlKHtcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGRlZmF1bHRDaGFubmVsSWQ6IG51bGwsXHJcbiAgICAgICAgICAgIGxlZnRTZXJ2ZXI6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGd1aWxkc0NhY2hlLnNldChpZCwgbmV3IEd1aWxkKGd1aWxkKSk7XHJcbiAgICAgICAgcmV0dXJuIGd1aWxkO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IHNldERlZmF1bHRDaGFubmVsID0gYXN5bmMgKGd1aWxkSWQ6IHN0cmluZywgY2hhbm5lbDogVGV4dENoYW5uZWwpID0+IHtcclxuICAgIGNvbnN0IGd1aWxkID0gYXdhaXQgR3VpbGRzLmZpbmRPbmUoeyBpZDogZ3VpbGRJZCB9KTtcclxuICAgIGd1aWxkLmRlZmF1bHRDaGFubmVsSWQgPSBjaGFubmVsLmlkO1xyXG4gICAgYXdhaXQgZ3VpbGQuc2F2ZSgpO1xyXG4gICAgZ3VpbGRzQ2FjaGUuZ2V0KGd1aWxkSWQpLnNldERlZmF1bHRDaGFubmVsKGNoYW5uZWwpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgdXBkYXRlR3VpbGRzID0gYXN5bmMgKGd1aWxkczogQ29sbGVjdGlvbjxzdHJpbmcsIERpc2NvcmRHdWlsZD4pID0+IHtcclxuICAgIGNvbnN0IGRiR3VpbGRzID0gYXdhaXQgZ2V0R3VpbGRzKCk7XHJcbiAgICBpZighZGJHdWlsZHMpIHJldHVybjtcclxuXHJcbiAgICBkYkd1aWxkcy5mb3JFYWNoKChfLCBpZCkgPT4ge1xyXG4gICAgICAgIGlmICghZ3VpbGRzLmhhcyhpZCkpIHtcclxuICAgICAgICAgICAgZGJHdWlsZHMuZGVsZXRlKGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgZ3VpbGRzLmZvckVhY2goYXN5bmMgKGd1aWxkLCBpZCkgPT4ge1xyXG4gICAgICAgIHByb21pc2VzLnB1c2godXNlclNlcnZpY2UuYWRkVXNlcnMoZ3VpbGQubWVtYmVycy5hcnJheSgpKSk7XHJcbiAgICAgICAgaWYgKCFkYkd1aWxkcy5oYXMoaWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGd1aWxkTmFtZSA9IGd1aWxkLm5hbWU7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goYWRkR3VpbGQoaWQsIGd1aWxkTmFtZSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGJHdWlsZHMuZ2V0KGlkKS5kZWZhdWx0Q2hhbm5lbElkKSB7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2V0RGVmYXVsdENoYW5uZWwoXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIDxUZXh0Q2hhbm5lbD5ndWlsZC5jaGFubmVscy5nZXQoZGJHdWlsZHMuZ2V0KGlkKS5kZWZhdWx0Q2hhbm5lbElkKSxcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgaGFzRGVmYXVsdENoYW5uZWwgPSAoZ3VpbGRJZDogc3RyaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gZ2V0R3VpbGQoZ3VpbGRJZCkuZGVmYXVsdENoYW5uZWwgIT09IG51bGw7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZW5kVG9EZWZhdWx0Q2hhbm5lbCA9IGFzeW5jIChndWlsZElkOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykgPT4ge1xyXG4gICAgcmV0dXJuIGdldEd1aWxkKGd1aWxkSWQpLmRlZmF1bHRDaGFubmVsLnNlbmQobWVzc2FnZSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRNZWV0aW5nQ2hhbm5lbCA9IChndWlsZElkOiBzdHJpbmcpID0+IHtcclxuICAgIHJldHVybiBnZXRHdWlsZChndWlsZElkKS5tZWV0aW5nQ2hhbm5lbDtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldE1lZXRpbmdDaGFubmVsID0gYXN5bmMgKGNoYW5uZWw6IEd1aWxkQ2hhbm5lbCkgPT4ge1xyXG4gICAgY29uc3QgaWQgPSBjaGFubmVsLmd1aWxkLmlkO1xyXG4gICAgY29uc3QgZ3VpbGQgPSBhd2FpdCBHdWlsZHMuZmluZE9uZSh7IGlkIH0pO1xyXG4gICAgZ3VpbGQubWVldGluZ0NoYW5uZWxJZCA9IGNoYW5uZWwuaWQ7XHJcbiAgICBhd2FpdCBndWlsZC5zYXZlKCk7XHJcbiAgICBndWlsZHNDYWNoZS5nZXQoaWQpLnNldE1lZXRpbmdDaGFubmVsKGNoYW5uZWwpO1xyXG4gICAgYXdhaXQgbG9ja01lZXRpbmdDaGFubmVsKGlkKTtcclxuICAgIHJldHVybiBnZXRNZWV0aW5nQ2hhbm5lbChpZCk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCB1bmxvY2tNZWV0aW5nQ2hhbm5lbCA9IGFzeW5jIChndWlsZElkOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IGNoYW5uZWwgPSBnZXRNZWV0aW5nQ2hhbm5lbChndWlsZElkKTtcclxuICAgIC8vIGd1aWxkSWQgaXMgdGhlIHNub3dmbGFrZSBmb3IgQGV2ZXJ5b25lXHJcbiAgICByZXR1cm4gY2hhbm5lbC5vdmVyd3JpdGVQZXJtaXNzaW9ucyhndWlsZElkLCB7XHJcbiAgICAgICAgU0VORF9NRVNTQUdFUzogZmFsc2VcclxuICAgIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgbG9ja01lZXRpbmdDaGFubmVsID0gYXN5bmMgKGd1aWxkSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3QgY2hhbm5lbCA9IGdldE1lZXRpbmdDaGFubmVsKGd1aWxkSWQpO1xyXG4gICAgLy8gZ3VpbGRJZCBpcyB0aGUgc25vd2ZsYWtlIGZvciBAZXZlcnlvbmVcclxuICAgIHJldHVybiBjaGFubmVsLm92ZXJ3cml0ZVBlcm1pc3Npb25zKGd1aWxkSWQsIHtcclxuICAgICAgICBTRU5EX01FU1NBR0VTOiB0cnVlXHJcbiAgICB9KTtcclxufTsiXX0=