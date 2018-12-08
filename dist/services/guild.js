"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendToDefaultChannel = exports.hasDefaultChannel = exports.updateGuilds = exports.setDefaultChannel = exports.addGuild = exports.getGuild = exports.getGuilds = void 0;

var _logger = _interopRequireDefault(require("logger"));

var _guild = _interopRequireDefault(require("models/guild"));

var _store = _interopRequireDefault(require("persistence/store"));

var userService = _interopRequireWildcard(require("services/user"));

var _types = require("domain/types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var guildsCache = _store.default.guilds;

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

            return _context.abrupt("return", {
              error: _context.t0
            });

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

            return _context2.abrupt("return", {
              error: _context2.t0
            });

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
            guildsCache.get(guildId).defaultChannel = channel;

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
            Object.keys(dbGuilds).forEach(function (id) {
              if (!guilds.has(id)) {
                delete dbGuilds[id];
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

                        if (!(id in dbGuilds)) {
                          guildName = guild.name;
                          promises.push(addGuild(id, guildName));
                        } else if (dbGuilds[id].defaultChannelId) {
                          promises.push(setDefaultChannel(id, guild.channels.get(dbGuilds[id].defaultChannelId)));
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
            _context5.next = 8;
            return Promise.all(promises);

          case 8:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9ndWlsZC50cyJdLCJuYW1lcyI6WyJndWlsZHNDYWNoZSIsIlN0b3JlIiwiZ3VpbGRzIiwiZ2V0R3VpbGRzIiwic2l6ZSIsIkd1aWxkcyIsImZpbmQiLCJkYkd1aWxkcyIsImNsZWFyIiwiZm9yRWFjaCIsImd1aWxkIiwic2V0IiwiaWQiLCJHdWlsZCIsIkxvZ2dlciIsImVycm9yIiwiZ2V0R3VpbGQiLCJnZXQiLCJhZGRHdWlsZCIsIm5hbWUiLCJmaW5kT25lIiwibG9nIiwiY3JlYXRlIiwiZGVmYXVsdENoYW5uZWxJZCIsImxlZnRTZXJ2ZXIiLCJzZXREZWZhdWx0Q2hhbm5lbCIsImd1aWxkSWQiLCJjaGFubmVsIiwic2F2ZSIsImRlZmF1bHRDaGFubmVsIiwidXBkYXRlR3VpbGRzIiwiT2JqZWN0Iiwia2V5cyIsImhhcyIsInByb21pc2VzIiwicHVzaCIsInVzZXJTZXJ2aWNlIiwiYWRkVXNlcnMiLCJtZW1iZXJzIiwiYXJyYXkiLCJndWlsZE5hbWUiLCJjaGFubmVscyIsIlByb21pc2UiLCJhbGwiLCJoYXNEZWZhdWx0Q2hhbm5lbCIsInNlbmRUb0RlZmF1bHRDaGFubmVsIiwibWVzc2FnZSIsInNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVcsR0FBR0MsZUFBTUMsTUFBMUI7O0FBRU8sSUFBTUMsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsaUJBRWJILFdBQVcsQ0FBQ0ksSUFGQztBQUFBO0FBQUE7QUFBQTs7QUFBQSw2Q0FHTkosV0FITTs7QUFBQTtBQUFBO0FBQUEsbUJBTU1LLGVBQU9DLElBQVAsRUFOTjs7QUFBQTtBQU1YQyxZQUFBQSxRQU5XO0FBT2pCUCxZQUFBQSxXQUFXLENBQUNRLEtBQVo7QUFDQUQsWUFBQUEsUUFBUSxDQUFD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QTtBQUFBLGVBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFUd0I7QUFBQSxtQkFxQmxCbUIsT0FBTyxDQUFDQyxHQUFSLENBQVlULFFBQVosQ0FyQmtCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQVpKLFlBQVk7QUFBQTtBQUFBO0FBQUEsR0FBbEI7Ozs7QUF1QkEsSUFBTWMsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFDbEIsT0FBRCxFQUFhO0FBQzFDLFNBQU9WLFFBQVEsQ0FBQ1UsT0FBRCxDQUFSLENBQWtCRyxjQUFsQixLQUFxQyxJQUE1QztBQUNILENBRk07Ozs7QUFHQSxJQUFNZ0Isb0JBQW9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRyxrQkFBT25CLE9BQVAsRUFBZ0JvQixPQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBQ3pCOUIsUUFBUSxDQUFDVSxPQUFELENBQVIsQ0FBa0JHLGNBQWxCLENBQWlDa0IsSUFBakMsQ0FBc0NELE9BQXRDLENBRHlCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQXBCRCxvQkFBb0I7QUFBQTtBQUFBO0FBQUEsR0FBMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9nZ2VyIGZyb20gXCJsb2dnZXJcIjtcclxuaW1wb3J0IEd1aWxkcyBmcm9tIFwibW9kZWxzL2d1aWxkXCI7XHJcbmltcG9ydCBTdG9yZSBmcm9tIFwicGVyc2lzdGVuY2Uvc3RvcmVcIjtcclxuaW1wb3J0ICogYXMgdXNlclNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL3VzZXJcIjtcclxuaW1wb3J0IHsgR3VpbGQgfSBmcm9tIFwiZG9tYWluL3R5cGVzXCI7XHJcblxyXG5jb25zdCBndWlsZHNDYWNoZSA9IFN0b3JlLmd1aWxkcztcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRHdWlsZHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChndWlsZHNDYWNoZS5zaXplKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBndWlsZHNDYWNoZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRiR3VpbGRzID0gYXdhaXQgR3VpbGRzLmZpbmQoKTtcclxuICAgICAgICBndWlsZHNDYWNoZS5jbGVhcigpO1xyXG4gICAgICAgIGRiR3VpbGRzLmZvckVhY2goKGd1aWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGd1aWxkc0NhY2hlLnNldChndWlsZC5pZCwgbmV3IEd1aWxkKGd1aWxkKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGd1aWxkc0NhY2hlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiB7IGVycm9yIH07XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRHdWlsZCA9IChpZCkgPT4ge1xyXG4gICAgaWYgKGd1aWxkc0NhY2hlLmdldChpZCkpIHtcclxuICAgICAgICByZXR1cm4gZ3VpbGRzQ2FjaGUuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIExvZ2dlci5lcnJvcihgQ291bGRuJ3QgZmluZCB0aGUgZ3VpbGQgJHtpZH1gKTtcclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5leHBvcnQgY29uc3QgYWRkR3VpbGQgPSBhc3luYyAoaWQsIG5hbWUpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGd1aWxkID0gYXdhaXQgR3VpbGRzLmZpbmRPbmUoeyBpZCB9KTtcclxuICAgICAgICBpZiAoZ3VpbGQpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhgVGhlIGd1aWxkICR7aWR9OiAke25hbWV9IGFscmVhZHkgZXhpc3RzYCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIkd1aWxkIGFscmVhZHkgZXhpc3RzXCIgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3VpbGQgPSBhd2FpdCBHdWlsZHMuY3JlYXRlKHtcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGRlZmF1bHRDaGFubmVsSWQ6IG51bGwsXHJcbiAgICAgICAgICAgIGxlZnRTZXJ2ZXI6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGd1aWxkc0NhY2hlLnNldChpZCwgbmV3IEd1aWxkKGd1aWxkKSk7XHJcbiAgICAgICAgcmV0dXJuIGd1aWxkO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiB7IGVycm9yIH07XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXREZWZhdWx0Q2hhbm5lbCA9IGFzeW5jIChndWlsZElkLCBjaGFubmVsKSA9PiB7XHJcbiAgICBjb25zdCBndWlsZCA9IGF3YWl0IEd1aWxkcy5maW5kT25lKHsgaWQ6IGd1aWxkSWQgfSk7XHJcbiAgICBndWlsZC5kZWZhdWx0Q2hhbm5lbElkID0gY2hhbm5lbC5pZDtcclxuICAgIGF3YWl0IGd1aWxkLnNhdmUoKTtcclxuICAgIGd1aWxkc0NhY2hlLmdldChndWlsZElkKS5kZWZhdWx0Q2hhbm5lbCA9IGNoYW5uZWw7XHJcbn07XHJcbmV4cG9ydCBjb25zdCB1cGRhdGVHdWlsZHMgPSBhc3luYyAoZ3VpbGRzKSA9PiB7XHJcbiAgICBjb25zdCBkYkd1aWxkcyA9IGF3YWl0IGdldEd1aWxkcygpO1xyXG4gICAgT2JqZWN0LmtleXMoZGJHdWlsZHMpLmZvckVhY2goKGlkKSA9PiB7XHJcbiAgICAgICAgaWYgKCFndWlsZHMuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICBkZWxldGUgZGJHdWlsZHNbaWRdO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICBndWlsZHMuZm9yRWFjaChhc3luYyAoZ3VpbGQsIGlkKSA9PiB7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaCh1c2VyU2VydmljZS5hZGRVc2VycyhndWlsZC5tZW1iZXJzLmFycmF5KCkpKTtcclxuICAgICAgICBpZiAoIShpZCBpbiBkYkd1aWxkcykpIHtcclxuICAgICAgICAgICAgY29uc3QgZ3VpbGROYW1lID0gZ3VpbGQubmFtZTtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChhZGRHdWlsZChpZCwgZ3VpbGROYW1lKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYkd1aWxkc1tpZF0uZGVmYXVsdENoYW5uZWxJZCkge1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHNldERlZmF1bHRDaGFubmVsKFxyXG4gICAgICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgICAgICBndWlsZC5jaGFubmVscy5nZXQoZGJHdWlsZHNbaWRdLmRlZmF1bHRDaGFubmVsSWQpLFxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGhhc0RlZmF1bHRDaGFubmVsID0gKGd1aWxkSWQpID0+IHtcclxuICAgIHJldHVybiBnZXRHdWlsZChndWlsZElkKS5kZWZhdWx0Q2hhbm5lbCAhPT0gbnVsbDtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNlbmRUb0RlZmF1bHRDaGFubmVsID0gYXN5bmMgKGd1aWxkSWQsIG1lc3NhZ2UpID0+IHtcclxuICAgIHJldHVybiBnZXRHdWlsZChndWlsZElkKS5kZWZhdWx0Q2hhbm5lbC5zZW5kKG1lc3NhZ2UpO1xyXG59OyJdfQ==