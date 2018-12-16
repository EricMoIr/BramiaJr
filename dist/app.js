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
    var beginning, _now, now, client;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            beginning = Date.now();
            _context2.prev = 1;
            _now = Date.now();
            _context2.next = 5;
            return _store.default.instance.connect();

          case 5:
            _logger.default.log("Connecting to the store took ".concat((Date.now() - _now) / 1000, " seconds"));

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);

            _logger.default.error("Couldn't connect to store", _context2.t0);

          case 11:
            now = Date.now();
            _context2.next = 14;
            return Promise.all([configurationService.updateLastSync(), userService.updatePoints()]);

          case 14:
            setInterval(configurationService.updateLastSync, DAILY);
            setInterval(userService.updatePoints, DAILY);

            _logger.default.log("Updating last sync and points took ".concat((Date.now() - now) / 1000, " seconds"));

            client = new Discord.Client(); //#region Discord config

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
                      _logger.default.log("Starting the bot took ".concat((Date.now() - beginning) / 1000, " seconds"));

                    case 3:
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
            }); //#endregion

            _context2.next = 27;
            return DiscordController.signIn(client, DISCORD_TOKEN);

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 8]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudHMiXSwibmFtZXMiOlsiRElTQ09SRF9UT0tFTiIsInByb2Nlc3MiLCJlbnYiLCJEQUlMWSIsImluaXQiLCJiZWdpbm5pbmciLCJEYXRlIiwibm93IiwiU3RvcmUiLCJpbnN0YW5jZSIsImNvbm5lY3QiLCJMb2dnZXIiLCJsb2ciLCJlcnJvciIsIlByb21pc2UiLCJhbGwiLCJjb25maWd1cmF0aW9uU2VydmljZSIsInVwZGF0ZUxhc3RTeW5jIiwidXNlclNlcnZpY2UiLCJ1cGRhdGVQb2ludHMiLCJzZXRJbnRlcnZhbCIsImNsaWVudCIsIkRpc2NvcmQiLCJDbGllbnQiLCJvbiIsIkRpc2NvcmRDb250cm9sbGVyIiwiZ3VpbGRDcmVhdGUiLCJndWlsZE1lbWJlckFkZCIsImd1aWxkTWVtYmVyUmVtb3ZlIiwibWVzc2FnZSIsInJlYWR5IiwiZXZlbnQiLCJkaXNjb25uZWN0Iiwic2lnbkluIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBRVFBLGEsR0FBa0JDLE9BQU8sQ0FBQ0MsRyxDQUExQkYsYTtBQUNSLElBQU1HLEtBQUssR0FBRyxPQUFPLEVBQVAsR0FBWSxFQUFaLEdBQWlCLEVBQS9COztBQUVBLElBQU1DLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDSEMsWUFBQUEsU0FERyxHQUNTQyxJQUFJLENBQUNDLEdBQUwsRUFEVDtBQUFBO0FBR0RBLFlBQUFBLElBSEMsR0FHS0QsSUFBSSxDQUFDQyxHQUFMLEVBSEw7QUFBQTtBQUFBLG1CQUlDQyxlQUFNQyxRQUFOLENBQWVDLE9BQWYsRUFKRDs7QUFBQTtBQUtMQyw0QkFBT0MsR0FBUCx3Q0FBMkMsQ0FBQ04sSUFBSSxDQUFDQyxHQUFMLEtBQWFBLElBQWQsSUFBcUIsSUFBaEU7O0FBTEs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBT0xJLDRCQUFPRSxLQUFQLENBQWEsMkJBQWI7O0FBUEs7QUFVTE4sWUFBQUEsR0FWSyxHQVVDRCxJQUFJLENBQUNDLEdBQUwsRUFWRDtBQUFBO0FBQUEsbUJBV0hPLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLENBQ2RDLG9CQUFvQixDQUFDQyxjQUFyQixFQURjLEVBRWRDLFdBQVcsQ0FBQ0MsWUFBWixFQUZjLENBQVosQ0FYRzs7QUFBQTtBQWVUQyxZQUFBQSxXQUFXLENBQUNKLG9CQUFvQixDQUFDQyxjQUF0QixFQUFzQ2QsS0FBdEMsQ0FBWDtBQUNBaUIsWUFBQUEsV0FBVyxDQUFDRixXQUFXLENBQUNDLFlBQWIsRUFBMkJoQixLQUEzQixDQUFYOztBQUNBUSw0QkFBT0MsR0FBUCw4Q0FBaUQsQ0FBQ04sSUFBSSxDQUFDQyxHQUFMLEtBQWFBLEdBQWQsSUFBcUIsSUFBdEU7O0FBRU1jLFlBQUFBLE1BbkJHLEdBbUJNLElBQUlDLE9BQU8sQ0FBQ0MsTUFBWixFQW5CTixFQW9CVDs7QUFDQUYsWUFBQUEsTUFBTSxDQUFDRyxFQUFQLENBQVUsYUFBVixFQUF5QkMsaUJBQWlCLENBQUNDLFdBQTNDO0FBQ0FMLFlBQUFBLE1BQU0sQ0FBQ0csRUFBUCxDQUFVLGdCQUFWLEVBQTRCQyxpQkFBaUIsQ0FBQ0UsY0FBOUM7QUFDQU4sWUFBQUEsTUFBTSxDQUFDRyxFQUFQLENBQVUsbUJBQVYsRUFBK0JDLGlCQUFpQixDQUFDRyxpQkFBakQ7QUFDQVAsWUFBQUEsTUFBTSxDQUFDRyxFQUFQLENBQVUsU0FBVixFQUFxQkMsaUJBQWlCLENBQUNJLE9BQXZDO0FBQ0FSLFlBQUFBLE1BQU0sQ0FBQ0csRUFBUCxDQUFVLE9BQVY7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQ0FBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQ1RDLGlCQUFpQixDQUFDSyxLQUFsQixDQUF3QlQsTUFBeEIsQ0FEUzs7QUFBQTtBQUVmVixzQ0FBT0MsR0FBUCxpQ0FBb0MsQ0FBQ04sSUFBSSxDQUFDQyxHQUFMLEtBQWFGLFNBQWQsSUFBMkIsSUFBL0Q7O0FBRmU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBbkI7QUFJQWdCLFlBQUFBLE1BQU0sQ0FBQ0csRUFBUCxDQUFVLFlBQVYsRUFBd0IsVUFBQ08sS0FBRDtBQUFBLHFCQUFXTixpQkFBaUIsQ0FBQ08sVUFBbEIsQ0FBNkJELEtBQTdCLEVBQW9DVixNQUFwQyxFQUE0Q3JCLGFBQTVDLENBQVg7QUFBQSxhQUF4QjtBQUNBcUIsWUFBQUEsTUFBTSxDQUFDRyxFQUFQLENBQVUsT0FBVixFQUFtQixVQUFDWCxLQUFEO0FBQUEscUJBQVdZLGlCQUFpQixDQUFDWixLQUFsQixDQUF3QkEsS0FBeEIsRUFBK0JRLE1BQS9CLEVBQXVDckIsYUFBdkMsQ0FBWDtBQUFBLGFBQW5CLEVBOUJTLENBK0JUOztBQS9CUztBQUFBLG1CQWdDSHlCLGlCQUFpQixDQUFDUSxNQUFsQixDQUF5QlosTUFBekIsRUFBaUNyQixhQUFqQyxDQWhDRzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFKSSxJQUFJO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBbUNBLElBQUk7QUFDQUEsRUFBQUEsSUFBSTtBQUNQLENBRkQsQ0FFRSxPQUFPUyxLQUFQLEVBQWM7QUFDWkYsa0JBQU9FLEtBQVAsQ0FBYSx3QkFBYixFQUF1Q0EsS0FBdkM7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIERpc2NvcmQgZnJvbSBcImRpc2NvcmQuanNcIjtcclxuXHJcbmltcG9ydCBMb2dnZXIgZnJvbSBcImxvZ2dlclwiO1xyXG5pbXBvcnQgU3RvcmUgZnJvbSBcInBlcnNpc3RlbmNlL3N0b3JlXCI7XHJcbmltcG9ydCAqIGFzIERpc2NvcmRDb250cm9sbGVyIGZyb20gXCJjb250cm9sbGVycy9kaXNjb3JkXCI7XHJcbmltcG9ydCAqIGFzIHVzZXJTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy91c2VyXCI7XHJcbmltcG9ydCAqIGFzIGNvbmZpZ3VyYXRpb25TZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy9jb25maWd1cmF0aW9uXCI7XHJcblxyXG5jb25zdCB7IERJU0NPUkRfVE9LRU4gfSA9IHByb2Nlc3MuZW52O1xyXG5jb25zdCBEQUlMWSA9IDEwMDAgKiA2MCAqIDYwICogMjQ7XHJcblxyXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgYmVnaW5uaW5nID0gRGF0ZS5ub3coKTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgYXdhaXQgU3RvcmUuaW5zdGFuY2UuY29ubmVjdCgpO1xyXG4gICAgICAgIExvZ2dlci5sb2coYENvbm5lY3RpbmcgdG8gdGhlIHN0b3JlIHRvb2sgJHsoRGF0ZS5ub3coKSAtIG5vdykgLyAxMDAwfSBzZWNvbmRzYCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIkNvdWxkbid0IGNvbm5lY3QgdG8gc3RvcmVcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICBjb25maWd1cmF0aW9uU2VydmljZS51cGRhdGVMYXN0U3luYygpLFxyXG4gICAgICAgIHVzZXJTZXJ2aWNlLnVwZGF0ZVBvaW50cygpLFxyXG4gICAgXSk7XHJcbiAgICBzZXRJbnRlcnZhbChjb25maWd1cmF0aW9uU2VydmljZS51cGRhdGVMYXN0U3luYywgREFJTFkpO1xyXG4gICAgc2V0SW50ZXJ2YWwodXNlclNlcnZpY2UudXBkYXRlUG9pbnRzLCBEQUlMWSk7XHJcbiAgICBMb2dnZXIubG9nKGBVcGRhdGluZyBsYXN0IHN5bmMgYW5kIHBvaW50cyB0b29rICR7KERhdGUubm93KCkgLSBub3cpIC8gMTAwMH0gc2Vjb25kc2ApO1xyXG5cclxuICAgIGNvbnN0IGNsaWVudCA9IG5ldyBEaXNjb3JkLkNsaWVudCgpO1xyXG4gICAgLy8jcmVnaW9uIERpc2NvcmQgY29uZmlnXHJcbiAgICBjbGllbnQub24oXCJndWlsZENyZWF0ZVwiLCBEaXNjb3JkQ29udHJvbGxlci5ndWlsZENyZWF0ZSk7XHJcbiAgICBjbGllbnQub24oXCJndWlsZE1lbWJlckFkZFwiLCBEaXNjb3JkQ29udHJvbGxlci5ndWlsZE1lbWJlckFkZCk7XHJcbiAgICBjbGllbnQub24oXCJndWlsZE1lbWJlclJlbW92ZVwiLCBEaXNjb3JkQ29udHJvbGxlci5ndWlsZE1lbWJlclJlbW92ZSk7XHJcbiAgICBjbGllbnQub24oXCJtZXNzYWdlXCIsIERpc2NvcmRDb250cm9sbGVyLm1lc3NhZ2UpO1xyXG4gICAgY2xpZW50Lm9uKFwicmVhZHlcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IERpc2NvcmRDb250cm9sbGVyLnJlYWR5KGNsaWVudCk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhgU3RhcnRpbmcgdGhlIGJvdCB0b29rICR7KERhdGUubm93KCkgLSBiZWdpbm5pbmcpIC8gMTAwMH0gc2Vjb25kc2ApO1xyXG4gICAgfSk7XHJcbiAgICBjbGllbnQub24oXCJkaXNjb25uZWN0XCIsIChldmVudCkgPT4gRGlzY29yZENvbnRyb2xsZXIuZGlzY29ubmVjdChldmVudCwgY2xpZW50LCBESVNDT1JEX1RPS0VOKSk7XHJcbiAgICBjbGllbnQub24oXCJlcnJvclwiLCAoZXJyb3IpID0+IERpc2NvcmRDb250cm9sbGVyLmVycm9yKGVycm9yLCBjbGllbnQsIERJU0NPUkRfVE9LRU4pKTtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgYXdhaXQgRGlzY29yZENvbnRyb2xsZXIuc2lnbkluKGNsaWVudCwgRElTQ09SRF9UT0tFTik7XHJcbn07XHJcblxyXG50cnkge1xyXG4gICAgaW5pdCgpO1xyXG59IGNhdGNoIChlcnJvcikge1xyXG4gICAgTG9nZ2VyLmVycm9yKFwiQ291bGRuJ3Qgc3RhcnQgdGhlIGFwcFwiLCBlcnJvcik7XHJcbn1cclxuIl19