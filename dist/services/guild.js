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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9ndWlsZC50cyJdLCJuYW1lcyI6WyJndWlsZHNDYWNoZSIsIlN0b3JlIiwiaW5zdGFuY2UiLCJndWlsZHMiLCJnZXRHdWlsZHMiLCJzaXplIiwiR3VpbGRzIiwiZmluZCIsImRiR3VpbGRzIiwiY2xlYXIiLCJmb3JFYWNoIiwiZ3VpbGQiLCJzZXQiLCJpZCIsIkd1aWxkIiwiTG9nZ2VyIiwiZXJyb3IiLCJnZXRHdWlsZCIsImdldCIsImFkZEd1aWxkIiwibmFtZSIsImZpbmRPbmUiLCJsb2ciLCJjcmVhdGUiLCJkZWZhdWx0Q2hhbm5lbElkIiwibGVmdFNlcnZlciIsInNldERlZmF1bHRDaGFubmVsIiwiZ3VpbGRJZCIsImNoYW5uZWwiLCJzYXZlIiwiZGVmYXVsdENoYW5uZWwiLCJ1cGRhdGVHdWlsZHMiLCJPYmplY3QiLCJrZXlzIiwiaGFzIiwicHJvbWlzZXMiLCJwdXNoIiwidXNlclNlcnZpY2UiLCJhZGRVc2VycyIsIm1lbWJlcnMiLCJhcnJheSIsImd1aWxkTmFtZSIsImNoYW5uZWxzIiwiUHJvbWlzZSIsImFsbCIsImhhc0RlZmF1bHRDaGFubmVsIiwic2VuZFRvRGVmYXVsdENoYW5uZWwiLCJtZXNzYWdlIiwic2VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBVyxHQUFHQyxlQUFNQyxRQUFOLENBQWVDLE1BQW5DOztBQUVPLElBQU1DLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLGlCQUViSixXQUFXLENBQUNLLElBRkM7QUFBQTtBQUFBO0FBQUE7O0FBQUEsNkNBR05MLFdBSE07O0FBQUE7QUFBQTtBQUFBLG1CQUtNTSxlQUFPQyxJQUFQLEVBTE47O0FBQUE7QUFLWEMsWUFBQUEsUUFMVztBQU1qQlIsWUFBQUEsV0FBVyxDQUFDUyxLQUFaO0FBQ0FELFlBQUFBLFFBQVEsQ0FBQ0UsT0FBVCxDQUFpQixVQUFDQyxLQUFELEVBQVc7QUFDeEJYLGNBQUFBLFdBQVcsQ0FBQ1ksR0FBWixDQUFnQkQsS0FBSyxDQUFDRSxFQUF0QixFQUEwQixJQUFJQyxZQUFKLENBQVVILEtBQVYsQ0FBMUI7QUFDSCxhQUZEO0FBUGlCLDZDQVVWWCxXQVZVOztBQUFBO0FBQUE7QUFBQTs7QUFZakJlLDRCQUFPQyxLQUFQOztBQVppQiw2Q0FhVjtBQUFFQSxjQUFBQSxLQUFLO0FBQVAsYUFiVTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFUWixTQUFTO0FBQUE7QUFBQTtBQUFBLEdBQWY7Ozs7QUFnQkEsSUFBTWEsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0osRUFBRCxFQUFRO0FBQzVCLE1BQUliLFdBQVcsQ0FBQ2tCLEdBQVosQ0FBZ0JMLEVBQWhCLENBQUosRUFBeUI7QUFDckIsV0FBT2IsV0FBVyxDQUFDa0IsR0FBWixDQUFnQkwsRUFBaEIsQ0FBUDtBQUNIOztBQUNERSxrQkFBT0MsS0FBUCxtQ0FBd0NILEVBQXhDOztBQUNBLFNBQU8sSUFBUDtBQUNILENBTk07Ozs7QUFPQSxJQUFNTSxRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRyxrQkFBT04sRUFBUCxFQUFXTyxJQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFRWQsZUFBT2UsT0FBUCxDQUFlO0FBQUVSLGNBQUFBLEVBQUUsRUFBRkE7QUFBRixhQUFmLENBRkY7O0FBQUE7QUFFWkYsWUFBQUEsS0FGWTs7QUFBQSxpQkFHWkEsS0FIWTtBQUFBO0FBQUE7QUFBQTs7QUFJWkksNEJBQU9PLEdBQVAscUJBQXdCVCxFQUF4QixlQUErQk8sSUFBL0I7O0FBSlksOENBS0w7QUFBRUosY0FBQUEsS0FBSyxFQUFFO0FBQVQsYUFMSzs7QUFBQTtBQUFBO0FBQUEsbUJBT0ZWLGVBQU9pQixNQUFQLENBQWM7QUFDeEJWLGNBQUFBLEVBQUUsRUFBRkEsRUFEd0I7QUFFeEJPLGNBQUFBLElBQUksRUFBSkEsSUFGd0I7QUFHeEJJLGNBQUFBLGdCQUFnQixFQUFFLElBSE07QUFJeEJDLGNBQUFBLFVBQVUsRUFBRTtBQUpZLGFBQWQsQ0FQRTs7QUFBQTtBQU9oQmQsWUFBQUEsS0FQZ0I7QUFhaEJYLFlBQUFBLFdBQVcsQ0FBQ1ksR0FBWixDQUFnQkMsRUFBaEIsRUFBb0IsSUFBSUMsWUFBSixDQUFVSCxLQUFWLENBQXBCO0FBYmdCLDhDQWNUQSxLQWRTOztBQUFBO0FBQUE7QUFBQTs7QUFnQmhCSSw0QkFBT0MsS0FBUDs7QUFoQmdCLDhDQWlCVDtBQUFFQSxjQUFBQSxLQUFLO0FBQVAsYUFqQlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBUkcsUUFBUTtBQUFBO0FBQUE7QUFBQSxHQUFkOzs7O0FBb0JBLElBQU1PLGlCQUFpQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUcsa0JBQU9DLE9BQVAsRUFBZ0JDLE9BQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ1R0QixlQUFPZSxPQUFQLENBQWU7QUFBRVIsY0FBQUEsRUFBRSxFQUFFYztBQUFOLGFBQWYsQ0FEUzs7QUFBQTtBQUN2QmhCLFlBQUFBLEtBRHVCO0FBRTdCQSxZQUFBQSxLQUFLLENBQUNhLGdCQUFOLEdBQXlCSSxPQUFPLENBQUNmLEVBQWpDO0FBRjZCO0FBQUEsbUJBR3ZCRixLQUFLLENBQUNrQixJQUFOLEVBSHVCOztBQUFBO0FBSTdCN0IsWUFBQUEsV0FBVyxDQUFDa0IsR0FBWixDQUFnQlMsT0FBaEIsRUFBeUJHLGNBQXpCLEdBQTBDRixPQUExQzs7QUFKNkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBakJGLGlCQUFpQjtBQUFBO0FBQUE7QUFBQSxHQUF2Qjs7OztBQU1BLElBQU1LLFlBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHLGtCQUFPNUIsTUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNEQyxTQUFTLEVBRFI7O0FBQUE7QUFDbEJJLFlBQUFBLFFBRGtCO0FBRXhCd0IsWUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVl6QixRQUFaLEVBQXNCRSxPQUF0QixDQUE4QixVQUFDRyxFQUFELEVBQVE7QUFDbEMsa0JBQUksQ0FBQ1YsTUFBTSxDQUFDK0IsR0FBUCxDQUFXckIsRUFBWCxDQUFMLEVBQXFCO0FBQ2pCLHVCQUFPTCxRQUFRLENBQUNLLEVBQUQsQ0FBZjtBQUNIO0FBQ0osYUFKRDtBQU1Nc0IsWUFBQUEsUUFSa0IsR0FRUCxFQVJPO0FBU3hCaEMsWUFBQUEsTUFBTSxDQUFDTyxPQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQ0FBZSxrQkFBT0MsS0FBUCxFQUFjRSxFQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNYc0Isd0JBQUFBLFFBQVEsQ0FBQ0MsSUFBVCxDQUFjQyxXQUFXLENBQUNDLFFBQVosQ0FBcUIzQixLQUFLLENBQUM0QixPQUFOLENBQWNDLEtBQWQsRUFBckIsQ0FBZDs7QUFDQSw0QkFBSSxFQUFFM0IsRUFBRSxJQUFJTCxRQUFSLENBQUosRUFBdUI7QUFDYmlDLDBCQUFBQSxTQURhLEdBQ0Q5QixLQUFLLENBQUNTLElBREw7QUFFbkJlLDBCQUFBQSxRQUFRLENBQUNDLElBQVQsQ0FBY2pCLFFBQVEsQ0FBQ04sRUFBRCxFQUFLNEIsU0FBTCxDQUF0QjtBQUNILHlCQUhELE1BR08sSUFBSWpDLFFBQVEsQ0FBQ0ssRUFBRCxDQUFSLENBQWFXLGdCQUFqQixFQUFtQztBQUN0Q1csMEJBQUFBLFFBQVEsQ0FBQ0MsSUFBVCxDQUFjVixpQkFBaUIsQ0FDM0JiLEVBRDJCLEVBRTNCRixLQUFLLENBQUMrQixRQUFOLENBQWV4QixHQUFmLENBQW1CVixRQUFRLENBQUNLLEVBQUQsQ0FBUixDQUFhVyxnQkFBaEMsQ0FGMkIsQ0FBL0I7QUFJSDs7QUFWVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFmOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVHdCO0FBQUEsbUJBcUJsQm1CLE9BQU8sQ0FBQ0MsR0FBUixDQUFZVCxRQUFaLENBckJrQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFaSixZQUFZO0FBQUE7QUFBQTtBQUFBLEdBQWxCOzs7O0FBdUJBLElBQU1jLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ2xCLE9BQUQsRUFBYTtBQUMxQyxTQUFPVixRQUFRLENBQUNVLE9BQUQsQ0FBUixDQUFrQkcsY0FBbEIsS0FBcUMsSUFBNUM7QUFDSCxDQUZNOzs7O0FBR0EsSUFBTWdCLG9CQUFvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUcsa0JBQU9uQixPQUFQLEVBQWdCb0IsT0FBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQUN6QjlCLFFBQVEsQ0FBQ1UsT0FBRCxDQUFSLENBQWtCRyxjQUFsQixDQUFpQ2tCLElBQWpDLENBQXNDRCxPQUF0QyxDQUR5Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFwQkQsb0JBQW9CO0FBQUE7QUFBQTtBQUFBLEdBQTFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvZ2dlciBmcm9tIFwibG9nZ2VyXCI7XHJcbmltcG9ydCBHdWlsZHMgZnJvbSBcIm1vZGVscy9ndWlsZFwiO1xyXG5pbXBvcnQgU3RvcmUgZnJvbSBcInBlcnNpc3RlbmNlL3N0b3JlXCI7XHJcbmltcG9ydCAqIGFzIHVzZXJTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy91c2VyXCI7XHJcbmltcG9ydCB7IEd1aWxkIH0gZnJvbSBcImRvbWFpbi90eXBlc1wiO1xyXG5cclxuY29uc3QgZ3VpbGRzQ2FjaGUgPSBTdG9yZS5pbnN0YW5jZS5ndWlsZHM7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0R3VpbGRzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoZ3VpbGRzQ2FjaGUuc2l6ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ3VpbGRzQ2FjaGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRiR3VpbGRzID0gYXdhaXQgR3VpbGRzLmZpbmQoKTtcclxuICAgICAgICBndWlsZHNDYWNoZS5jbGVhcigpO1xyXG4gICAgICAgIGRiR3VpbGRzLmZvckVhY2goKGd1aWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGd1aWxkc0NhY2hlLnNldChndWlsZC5pZCwgbmV3IEd1aWxkKGd1aWxkKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGd1aWxkc0NhY2hlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiB7IGVycm9yIH07XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRHdWlsZCA9IChpZCkgPT4ge1xyXG4gICAgaWYgKGd1aWxkc0NhY2hlLmdldChpZCkpIHtcclxuICAgICAgICByZXR1cm4gZ3VpbGRzQ2FjaGUuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIExvZ2dlci5lcnJvcihgQ291bGRuJ3QgZmluZCB0aGUgZ3VpbGQgJHtpZH1gKTtcclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5leHBvcnQgY29uc3QgYWRkR3VpbGQgPSBhc3luYyAoaWQsIG5hbWUpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGd1aWxkID0gYXdhaXQgR3VpbGRzLmZpbmRPbmUoeyBpZCB9KTtcclxuICAgICAgICBpZiAoZ3VpbGQpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhgVGhlIGd1aWxkICR7aWR9OiAke25hbWV9IGFscmVhZHkgZXhpc3RzYCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIkd1aWxkIGFscmVhZHkgZXhpc3RzXCIgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3VpbGQgPSBhd2FpdCBHdWlsZHMuY3JlYXRlKHtcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGRlZmF1bHRDaGFubmVsSWQ6IG51bGwsXHJcbiAgICAgICAgICAgIGxlZnRTZXJ2ZXI6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGd1aWxkc0NhY2hlLnNldChpZCwgbmV3IEd1aWxkKGd1aWxkKSk7XHJcbiAgICAgICAgcmV0dXJuIGd1aWxkO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiB7IGVycm9yIH07XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXREZWZhdWx0Q2hhbm5lbCA9IGFzeW5jIChndWlsZElkLCBjaGFubmVsKSA9PiB7XHJcbiAgICBjb25zdCBndWlsZCA9IGF3YWl0IEd1aWxkcy5maW5kT25lKHsgaWQ6IGd1aWxkSWQgfSk7XHJcbiAgICBndWlsZC5kZWZhdWx0Q2hhbm5lbElkID0gY2hhbm5lbC5pZDtcclxuICAgIGF3YWl0IGd1aWxkLnNhdmUoKTtcclxuICAgIGd1aWxkc0NhY2hlLmdldChndWlsZElkKS5kZWZhdWx0Q2hhbm5lbCA9IGNoYW5uZWw7XHJcbn07XHJcbmV4cG9ydCBjb25zdCB1cGRhdGVHdWlsZHMgPSBhc3luYyAoZ3VpbGRzKSA9PiB7XHJcbiAgICBjb25zdCBkYkd1aWxkcyA9IGF3YWl0IGdldEd1aWxkcygpO1xyXG4gICAgT2JqZWN0LmtleXMoZGJHdWlsZHMpLmZvckVhY2goKGlkKSA9PiB7XHJcbiAgICAgICAgaWYgKCFndWlsZHMuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICBkZWxldGUgZGJHdWlsZHNbaWRdO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICBndWlsZHMuZm9yRWFjaChhc3luYyAoZ3VpbGQsIGlkKSA9PiB7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaCh1c2VyU2VydmljZS5hZGRVc2VycyhndWlsZC5tZW1iZXJzLmFycmF5KCkpKTtcclxuICAgICAgICBpZiAoIShpZCBpbiBkYkd1aWxkcykpIHtcclxuICAgICAgICAgICAgY29uc3QgZ3VpbGROYW1lID0gZ3VpbGQubmFtZTtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChhZGRHdWlsZChpZCwgZ3VpbGROYW1lKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYkd1aWxkc1tpZF0uZGVmYXVsdENoYW5uZWxJZCkge1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHNldERlZmF1bHRDaGFubmVsKFxyXG4gICAgICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgICAgICBndWlsZC5jaGFubmVscy5nZXQoZGJHdWlsZHNbaWRdLmRlZmF1bHRDaGFubmVsSWQpLFxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGhhc0RlZmF1bHRDaGFubmVsID0gKGd1aWxkSWQpID0+IHtcclxuICAgIHJldHVybiBnZXRHdWlsZChndWlsZElkKS5kZWZhdWx0Q2hhbm5lbCAhPT0gbnVsbDtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNlbmRUb0RlZmF1bHRDaGFubmVsID0gYXN5bmMgKGd1aWxkSWQsIG1lc3NhZ2UpID0+IHtcclxuICAgIHJldHVybiBnZXRHdWlsZChndWlsZElkKS5kZWZhdWx0Q2hhbm5lbC5zZW5kKG1lc3NhZ2UpO1xyXG59OyJdfQ==