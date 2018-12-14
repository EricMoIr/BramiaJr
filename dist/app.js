"use strict";

var Discord = _interopRequireWildcard(require("discord.js"));

var _logger = _interopRequireDefault(require("logger"));

var _store = _interopRequireDefault(require("persistence/store"));

var DiscordController = _interopRequireWildcard(require("controllers/discord"));

var userService = _interopRequireWildcard(require("services/user"));

var configurationService = _interopRequireWildcard(require("services/configuration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DISCORD_TOKEN = process.env.DISCORD_TOKEN;
var DAILY = 1000 * 60 * 60 * 24;

var init =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var client;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _store.default.instance.connect();

          case 3:
            _context2.next = 8;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);

            _logger.default.error("Couldn't connect to store", _context2.t0);

          case 8:
            _context2.next = 10;
            return configurationService.updateLastSync();

          case 10:
            setInterval(configurationService.updateLastSync, DAILY);
            _context2.next = 13;
            return userService.updatePoints();

          case 13:
            setInterval(userService.updatePoints, DAILY);
            client = new Discord.Client();
            client.on("guildCreate", DiscordController.guildCreate);
            client.on("guildMemberAdd", DiscordController.guildMemberAdd);
            client.on("guildMemberRemove", DiscordController.guildMemberRemove);
            client.on("message", DiscordController.message);
            client.on("ready",
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return DiscordController.ready(client);

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            })));
            client.on("disconnect", function (event) {
              return DiscordController.disconnect(event, client, DISCORD_TOKEN);
            });
            client.on("error", function (error) {
              return DiscordController.error(error, client, DISCORD_TOKEN);
            });
            _context2.prev = 22;
            _context2.next = 25;
            return client.login(DISCORD_TOKEN);

          case 25:
            _context2.next = 30;
            break;

          case 27:
            _context2.prev = 27;
            _context2.t1 = _context2["catch"](22);

            _logger.default.error("Couldn't connect to discord", _context2.t1);

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 5], [22, 27]]);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

try {
  init();
} catch (error) {
  _logger.default.error("Couldn't start the app", error);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudHMiXSwibmFtZXMiOlsiRElTQ09SRF9UT0tFTiIsInByb2Nlc3MiLCJlbnYiLCJEQUlMWSIsImluaXQiLCJTdG9yZSIsImluc3RhbmNlIiwiY29ubmVjdCIsIkxvZ2dlciIsImVycm9yIiwiY29uZmlndXJhdGlvblNlcnZpY2UiLCJ1cGRhdGVMYXN0U3luYyIsInNldEludGVydmFsIiwidXNlclNlcnZpY2UiLCJ1cGRhdGVQb2ludHMiLCJjbGllbnQiLCJEaXNjb3JkIiwiQ2xpZW50Iiwib24iLCJEaXNjb3JkQ29udHJvbGxlciIsImd1aWxkQ3JlYXRlIiwiZ3VpbGRNZW1iZXJBZGQiLCJndWlsZE1lbWJlclJlbW92ZSIsIm1lc3NhZ2UiLCJyZWFkeSIsImV2ZW50IiwiZGlzY29ubmVjdCIsImxvZ2luIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBRVFBLGEsR0FBa0JDLE9BQU8sQ0FBQ0MsRyxDQUExQkYsYTtBQUNSLElBQU1HLEtBQUssR0FBRyxPQUFPLEVBQVAsR0FBWSxFQUFaLEdBQWlCLEVBQS9COztBQUVBLElBQU1DLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQ0MsZUFBTUMsUUFBTixDQUFlQyxPQUFmLEVBRkQ7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFJTEMsNEJBQU9DLEtBQVAsQ0FBYSwyQkFBYjs7QUFKSztBQUFBO0FBQUEsbUJBT0hDLG9CQUFvQixDQUFDQyxjQUFyQixFQVBHOztBQUFBO0FBUVRDLFlBQUFBLFdBQVcsQ0FBQ0Ysb0JBQW9CLENBQUNDLGNBQXRCLEVBQXNDUixLQUF0QyxDQUFYO0FBUlM7QUFBQSxtQkFVSFUsV0FBVyxDQUFDQyxZQUFaLEVBVkc7O0FBQUE7QUFXVEYsWUFBQUEsV0FBVyxDQUFDQyxXQUFXLENBQUNDLFlBQWIsRUFBMkJYLEtBQTNCLENBQVg7QUFFTVksWUFBQUEsTUFiRyxHQWFNLElBQUlDLE9BQU8sQ0FBQ0MsTUFBWixFQWJOO0FBY1RGLFlBQUFBLE1BQU0sQ0FBQ0csRUFBUCxDQUFVLGFBQVYsRUFBeUJDLGlCQUFpQixDQUFDQyxXQUEzQztBQUNBTCxZQUFBQSxNQUFNLENBQUNHLEVBQVAsQ0FBVSxnQkFBVixFQUE0QkMsaUJBQWlCLENBQUNFLGNBQTlDO0FBQ0FOLFlBQUFBLE1BQU0sQ0FBQ0csRUFBUCxDQUFVLG1CQUFWLEVBQStCQyxpQkFBaUIsQ0FBQ0csaUJBQWpEO0FBQ0FQLFlBQUFBLE1BQU0sQ0FBQ0csRUFBUCxDQUFVLFNBQVYsRUFBcUJDLGlCQUFpQixDQUFDSSxPQUF2QztBQUNBUixZQUFBQSxNQUFNLENBQUNHLEVBQVAsQ0FBVSxPQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0NBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUNUQyxpQkFBaUIsQ0FBQ0ssS0FBbEIsQ0FBd0JULE1BQXhCLENBRFM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBbkI7QUFHQUEsWUFBQUEsTUFBTSxDQUFDRyxFQUFQLENBQVUsWUFBVixFQUF3QixVQUFDTyxLQUFEO0FBQUEscUJBQVdOLGlCQUFpQixDQUFDTyxVQUFsQixDQUE2QkQsS0FBN0IsRUFBb0NWLE1BQXBDLEVBQTRDZixhQUE1QyxDQUFYO0FBQUEsYUFBeEI7QUFDQWUsWUFBQUEsTUFBTSxDQUFDRyxFQUFQLENBQVUsT0FBVixFQUFtQixVQUFDVCxLQUFEO0FBQUEscUJBQVdVLGlCQUFpQixDQUFDVixLQUFsQixDQUF3QkEsS0FBeEIsRUFBK0JNLE1BQS9CLEVBQXVDZixhQUF2QyxDQUFYO0FBQUEsYUFBbkI7QUF0QlM7QUFBQTtBQUFBLG1CQXlCQ2UsTUFBTSxDQUFDWSxLQUFQLENBQWEzQixhQUFiLENBekJEOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBMkJMUSw0QkFBT0MsS0FBUCxDQUFhLDZCQUFiOztBQTNCSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFKTCxJQUFJO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBK0JBLElBQUk7QUFDQUEsRUFBQUEsSUFBSTtBQUNQLENBRkQsQ0FFRSxPQUFPSyxLQUFQLEVBQWM7QUFDWkQsa0JBQU9DLEtBQVAsQ0FBYSx3QkFBYixFQUF1Q0EsS0FBdkM7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIERpc2NvcmQgZnJvbSBcImRpc2NvcmQuanNcIjtcclxuXHJcbmltcG9ydCBMb2dnZXIgZnJvbSBcImxvZ2dlclwiO1xyXG5pbXBvcnQgU3RvcmUgZnJvbSBcInBlcnNpc3RlbmNlL3N0b3JlXCI7XHJcbmltcG9ydCAqIGFzIERpc2NvcmRDb250cm9sbGVyIGZyb20gXCJjb250cm9sbGVycy9kaXNjb3JkXCI7XHJcbmltcG9ydCAqIGFzIHVzZXJTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy91c2VyXCI7XHJcbmltcG9ydCAqIGFzIGNvbmZpZ3VyYXRpb25TZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy9jb25maWd1cmF0aW9uXCI7XHJcblxyXG5jb25zdCB7IERJU0NPUkRfVE9LRU4gfSA9IHByb2Nlc3MuZW52O1xyXG5jb25zdCBEQUlMWSA9IDEwMDAgKiA2MCAqIDYwICogMjQ7XHJcblxyXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBTdG9yZS5pbnN0YW5jZS5jb25uZWN0KCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIkNvdWxkbid0IGNvbm5lY3QgdG8gc3RvcmVcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhd2FpdCBjb25maWd1cmF0aW9uU2VydmljZS51cGRhdGVMYXN0U3luYygpO1xyXG4gICAgc2V0SW50ZXJ2YWwoY29uZmlndXJhdGlvblNlcnZpY2UudXBkYXRlTGFzdFN5bmMsIERBSUxZKTtcclxuICAgIFxyXG4gICAgYXdhaXQgdXNlclNlcnZpY2UudXBkYXRlUG9pbnRzKCk7XHJcbiAgICBzZXRJbnRlcnZhbCh1c2VyU2VydmljZS51cGRhdGVQb2ludHMsIERBSUxZKTtcclxuXHJcbiAgICBjb25zdCBjbGllbnQgPSBuZXcgRGlzY29yZC5DbGllbnQoKTtcclxuICAgIGNsaWVudC5vbihcImd1aWxkQ3JlYXRlXCIsIERpc2NvcmRDb250cm9sbGVyLmd1aWxkQ3JlYXRlKTtcclxuICAgIGNsaWVudC5vbihcImd1aWxkTWVtYmVyQWRkXCIsIERpc2NvcmRDb250cm9sbGVyLmd1aWxkTWVtYmVyQWRkKTtcclxuICAgIGNsaWVudC5vbihcImd1aWxkTWVtYmVyUmVtb3ZlXCIsIERpc2NvcmRDb250cm9sbGVyLmd1aWxkTWVtYmVyUmVtb3ZlKTtcclxuICAgIGNsaWVudC5vbihcIm1lc3NhZ2VcIiwgRGlzY29yZENvbnRyb2xsZXIubWVzc2FnZSk7XHJcbiAgICBjbGllbnQub24oXCJyZWFkeVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgRGlzY29yZENvbnRyb2xsZXIucmVhZHkoY2xpZW50KTtcclxuICAgIH0pO1xyXG4gICAgY2xpZW50Lm9uKFwiZGlzY29ubmVjdFwiLCAoZXZlbnQpID0+IERpc2NvcmRDb250cm9sbGVyLmRpc2Nvbm5lY3QoZXZlbnQsIGNsaWVudCwgRElTQ09SRF9UT0tFTikpO1xyXG4gICAgY2xpZW50Lm9uKFwiZXJyb3JcIiwgKGVycm9yKSA9PiBEaXNjb3JkQ29udHJvbGxlci5lcnJvcihlcnJvciwgY2xpZW50LCBESVNDT1JEX1RPS0VOKSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBjbGllbnQubG9naW4oRElTQ09SRF9UT0tFTik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIkNvdWxkbid0IGNvbm5lY3QgdG8gZGlzY29yZFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbn07XHJcblxyXG50cnkge1xyXG4gICAgaW5pdCgpO1xyXG59IGNhdGNoIChlcnJvcikge1xyXG4gICAgTG9nZ2VyLmVycm9yKFwiQ291bGRuJ3Qgc3RhcnQgdGhlIGFwcFwiLCBlcnJvcik7XHJcbn1cclxuIl19