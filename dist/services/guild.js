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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9ndWlsZC50cyJdLCJuYW1lcyI6WyJndWlsZHNDYWNoZSIsIlN0b3JlIiwiaW5zdGFuY2UiLCJndWlsZHMiLCJnZXRHdWlsZHMiLCJzaXplIiwiR3VpbGRzIiwiZmluZCIsImRiR3VpbGRzIiwiY2xlYXIiLCJmb3JFYWNoIiwiZ3VpbGQiLCJzZXQiLCJpZCIsIkd1aWxkIiwiTG9nZ2VyIiwiZXJyb3IiLCJnZXRHdWlsZCIsImdldCIsImFkZEd1aWxkIiwibmFtZSIsImZpbmRPbmUiLCJsb2ciLCJjcmVhdGUiLCJkZWZhdWx0Q2hhbm5lbElkIiwibGVmdFNlcnZlciIsInNldERlZmF1bHRDaGFubmVsIiwiZ3VpbGRJZCIsImNoYW5uZWwiLCJzYXZlIiwidXBkYXRlR3VpbGRzIiwiXyIsImhhcyIsImRlbGV0ZSIsInByb21pc2VzIiwicHVzaCIsInVzZXJTZXJ2aWNlIiwiYWRkVXNlcnMiLCJtZW1iZXJzIiwiYXJyYXkiLCJndWlsZE5hbWUiLCJjaGFubmVscyIsIlByb21pc2UiLCJhbGwiLCJoYXNEZWZhdWx0Q2hhbm5lbCIsImRlZmF1bHRDaGFubmVsIiwic2VuZFRvRGVmYXVsdENoYW5uZWwiLCJtZXNzYWdlIiwic2VuZCIsImdldE1lZXRpbmdDaGFubmVsIiwibWVldGluZ0NoYW5uZWwiLCJzZXRNZWV0aW5nQ2hhbm5lbCIsIm1lZXRpbmdDaGFubmVsSWQiLCJsb2NrTWVldGluZ0NoYW5uZWwiLCJ1bmxvY2tNZWV0aW5nQ2hhbm5lbCIsIm92ZXJ3cml0ZVBlcm1pc3Npb25zIiwiU0VORF9NRVNTQUdFUyIsIndhcm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUdBLElBQU1BLFdBQVcsR0FBR0MsZUFBTUMsUUFBTixDQUFlQyxNQUFuQzs7QUFFTyxJQUFNQyxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFB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QTtBQUFBLDhDQVNyQixLQVRxQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFwQkYsb0JBQW9CO0FBQUE7QUFBQTtBQUFBLEdBQTFCOzs7O0FBWUEsSUFBTUQsa0JBQWtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRyxrQkFBTzFCLE9BQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3hCQyxZQUFBQSxPQUR3QixHQUNkcUIsaUJBQWlCLENBQUN0QixPQUFELENBREg7O0FBQUEsZ0JBRXpCQyxPQUZ5QjtBQUFBO0FBQUE7QUFBQTs7QUFHMUJiLDRCQUFPMEMsSUFBUCxzQkFBMEI5QixPQUExQjs7QUFIMEIsOENBSW5CLEtBSm1COztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQVFwQkMsT0FBTyxDQUFDMkIsb0JBQVIsQ0FBNkI1QixPQUE3QixFQUFzQztBQUN4QzZCLGNBQUFBLGFBQWEsRUFBRTtBQUR5QixhQUF0QyxDQVJvQjs7QUFBQTtBQUFBLDhDQVduQixJQVhtQjs7QUFBQTtBQUFBO0FBQUE7O0FBYTFCekMsNEJBQU8wQyxJQUFQLCtDQUFtRDlCLE9BQW5EOztBQWIwQiw4Q0FjbkIsS0FkbUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBbEIwQixrQkFBa0I7QUFBQTtBQUFBO0FBQUEsR0FBeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9nZ2VyIGZyb20gXCJsb2dnZXJcIjtcclxuaW1wb3J0IEd1aWxkcyBmcm9tIFwibW9kZWxzL2d1aWxkXCI7XHJcbmltcG9ydCBTdG9yZSBmcm9tIFwicGVyc2lzdGVuY2Uvc3RvcmVcIjtcclxuaW1wb3J0ICogYXMgdXNlclNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL3VzZXJcIjtcclxuaW1wb3J0IHsgR3VpbGQgfSBmcm9tIFwiZG9tYWluL3R5cGVzXCI7XHJcbmltcG9ydCB7IEd1aWxkQ2hhbm5lbCwgVGV4dENoYW5uZWwsIEd1aWxkIGFzIERpc2NvcmRHdWlsZCwgQ29sbGVjdGlvbiB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcblxyXG5jb25zdCBndWlsZHNDYWNoZSA9IFN0b3JlLmluc3RhbmNlLmd1aWxkcztcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRHdWlsZHMgPSBhc3luYyAoKTogUHJvbWlzZTxNYXA8c3RyaW5nLCBHdWlsZD4gfCBmYWxzZT4gPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoZ3VpbGRzQ2FjaGUuc2l6ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ3VpbGRzQ2FjaGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRiR3VpbGRzID0gYXdhaXQgR3VpbGRzLmZpbmQoKTtcclxuICAgICAgICBndWlsZHNDYWNoZS5jbGVhcigpO1xyXG4gICAgICAgIGRiR3VpbGRzLmZvckVhY2goKGd1aWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGd1aWxkc0NhY2hlLnNldChndWlsZC5pZCwgbmV3IEd1aWxkKGd1aWxkKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGd1aWxkc0NhY2hlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEd1aWxkID0gKGlkOiBzdHJpbmcpOiBHdWlsZCA9PiB7XHJcbiAgICBpZiAoZ3VpbGRzQ2FjaGUuZ2V0KGlkKSkge1xyXG4gICAgICAgIHJldHVybiBndWlsZHNDYWNoZS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgTG9nZ2VyLmVycm9yKGBDb3VsZG4ndCBmaW5kIHRoZSBndWlsZCAke2lkfWApO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhZGRHdWlsZCA9IGFzeW5jIChpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGd1aWxkID0gYXdhaXQgR3VpbGRzLmZpbmRPbmUoeyBpZCB9KTtcclxuICAgICAgICBpZiAoZ3VpbGQpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhgVGhlIGd1aWxkICR7aWR9OiAke25hbWV9IGFscmVhZHkgZXhpc3RzYCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIkd1aWxkIGFscmVhZHkgZXhpc3RzXCIgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3VpbGQgPSBhd2FpdCBHdWlsZHMuY3JlYXRlKHtcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGRlZmF1bHRDaGFubmVsSWQ6IG51bGwsXHJcbiAgICAgICAgICAgIGxlZnRTZXJ2ZXI6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGd1aWxkc0NhY2hlLnNldChpZCwgbmV3IEd1aWxkKGd1aWxkKSk7XHJcbiAgICAgICAgcmV0dXJuIGd1aWxkO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IHNldERlZmF1bHRDaGFubmVsID0gYXN5bmMgKGd1aWxkSWQ6IHN0cmluZywgY2hhbm5lbDogVGV4dENoYW5uZWwpID0+IHtcclxuICAgIGNvbnN0IGd1aWxkID0gYXdhaXQgR3VpbGRzLmZpbmRPbmUoeyBpZDogZ3VpbGRJZCB9KTtcclxuICAgIGd1aWxkLmRlZmF1bHRDaGFubmVsSWQgPSBjaGFubmVsLmlkO1xyXG4gICAgYXdhaXQgZ3VpbGQuc2F2ZSgpO1xyXG4gICAgZ3VpbGRzQ2FjaGUuZ2V0KGd1aWxkSWQpLnNldERlZmF1bHRDaGFubmVsKGNoYW5uZWwpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgdXBkYXRlR3VpbGRzID0gYXN5bmMgKGd1aWxkczogQ29sbGVjdGlvbjxzdHJpbmcsIERpc2NvcmRHdWlsZD4pID0+IHtcclxuICAgIGNvbnN0IGRiR3VpbGRzID0gYXdhaXQgZ2V0R3VpbGRzKCk7XHJcbiAgICBpZighZGJHdWlsZHMpIHJldHVybjtcclxuXHJcbiAgICBkYkd1aWxkcy5mb3JFYWNoKChfLCBpZCkgPT4ge1xyXG4gICAgICAgIGlmICghZ3VpbGRzLmhhcyhpZCkpIHtcclxuICAgICAgICAgICAgZGJHdWlsZHMuZGVsZXRlKGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgZ3VpbGRzLmZvckVhY2goYXN5bmMgKGd1aWxkLCBpZCkgPT4ge1xyXG4gICAgICAgIHByb21pc2VzLnB1c2godXNlclNlcnZpY2UuYWRkVXNlcnMoZ3VpbGQubWVtYmVycy5hcnJheSgpKSk7XHJcbiAgICAgICAgaWYgKCFkYkd1aWxkcy5oYXMoaWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGd1aWxkTmFtZSA9IGd1aWxkLm5hbWU7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goYWRkR3VpbGQoaWQsIGd1aWxkTmFtZSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGJHdWlsZHMuZ2V0KGlkKS5kZWZhdWx0Q2hhbm5lbElkKSB7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2V0RGVmYXVsdENoYW5uZWwoXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIDxUZXh0Q2hhbm5lbD5ndWlsZC5jaGFubmVscy5nZXQoZGJHdWlsZHMuZ2V0KGlkKS5kZWZhdWx0Q2hhbm5lbElkKSxcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgaGFzRGVmYXVsdENoYW5uZWwgPSAoZ3VpbGRJZDogc3RyaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gZ2V0R3VpbGQoZ3VpbGRJZCkuZGVmYXVsdENoYW5uZWwgIT09IG51bGw7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZW5kVG9EZWZhdWx0Q2hhbm5lbCA9IGFzeW5jIChndWlsZElkOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykgPT4ge1xyXG4gICAgcmV0dXJuIGdldEd1aWxkKGd1aWxkSWQpLmRlZmF1bHRDaGFubmVsLnNlbmQobWVzc2FnZSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRNZWV0aW5nQ2hhbm5lbCA9IChndWlsZElkOiBzdHJpbmcpID0+IHtcclxuICAgIHJldHVybiBnZXRHdWlsZChndWlsZElkKS5tZWV0aW5nQ2hhbm5lbDtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldE1lZXRpbmdDaGFubmVsID0gYXN5bmMgKGNoYW5uZWw6IEd1aWxkQ2hhbm5lbCkgPT4ge1xyXG4gICAgY29uc3QgaWQgPSBjaGFubmVsLmd1aWxkLmlkO1xyXG4gICAgY29uc3QgZ3VpbGQgPSBhd2FpdCBHdWlsZHMuZmluZE9uZSh7IGlkIH0pO1xyXG4gICAgZ3VpbGQubWVldGluZ0NoYW5uZWxJZCA9IGNoYW5uZWwuaWQ7XHJcbiAgICBhd2FpdCBndWlsZC5zYXZlKCk7XHJcbiAgICBndWlsZHNDYWNoZS5nZXQoaWQpLnNldE1lZXRpbmdDaGFubmVsKGNoYW5uZWwpO1xyXG4gICAgaWYgKCFhd2FpdCBsb2NrTWVldGluZ0NoYW5uZWwoaWQpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdldE1lZXRpbmdDaGFubmVsKGlkKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHVubG9ja01lZXRpbmdDaGFubmVsID0gYXN5bmMgKGd1aWxkSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3QgY2hhbm5lbCA9IGdldE1lZXRpbmdDaGFubmVsKGd1aWxkSWQpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBndWlsZElkIGlzIHRoZSBzbm93Zmxha2UgZm9yIEBldmVyeW9uZVxyXG4gICAgICAgIGF3YWl0IGNoYW5uZWwub3ZlcndyaXRlUGVybWlzc2lvbnMoZ3VpbGRJZCwge1xyXG4gICAgICAgICAgICBTRU5EX01FU1NBR0VTOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoKF8pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBsb2NrTWVldGluZ0NoYW5uZWwgPSBhc3luYyAoZ3VpbGRJZDogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCBjaGFubmVsID0gZ2V0TWVldGluZ0NoYW5uZWwoZ3VpbGRJZCk7XHJcbiAgICBpZiAoIWNoYW5uZWwpIHtcclxuICAgICAgICBMb2dnZXIud2FybihgVGhlIHNlcnZlciAke2d1aWxkSWR9IGRvZXNuJ3QgaGF2ZSBhIG1lZXRpbmcgY2hhbm5lbGApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gZ3VpbGRJZCBpcyB0aGUgc25vd2ZsYWtlIGZvciBAZXZlcnlvbmVcclxuICAgICAgICBhd2FpdCBjaGFubmVsLm92ZXJ3cml0ZVBlcm1pc3Npb25zKGd1aWxkSWQsIHtcclxuICAgICAgICAgICAgU0VORF9NRVNTQUdFUzogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2goXykge1xyXG4gICAgICAgIExvZ2dlci53YXJuKGBOb3QgZW5vdWdoIHBlcm1pc3Npb25zIHRvIG92ZXJ3cml0ZSAke2d1aWxkSWR9J3MgbWVldGluZyBjaGFubmVsIHBlcm1pc3Npb25zYCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59OyJdfQ==