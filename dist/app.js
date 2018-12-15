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
            _context2.next = 24;
            return DiscordController.signIn(client, DISCORD_TOKEN);

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 5]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudHMiXSwibmFtZXMiOlsiRElTQ09SRF9UT0tFTiIsInByb2Nlc3MiLCJlbnYiLCJEQUlMWSIsImluaXQiLCJTdG9yZSIsImluc3RhbmNlIiwiY29ubmVjdCIsIkxvZ2dlciIsImVycm9yIiwiY29uZmlndXJhdGlvblNlcnZpY2UiLCJ1cGRhdGVMYXN0U3luYyIsInNldEludGVydmFsIiwidXNlclNlcnZpY2UiLCJ1cGRhdGVQb2ludHMiLCJjbGllbnQiLCJEaXNjb3JkIiwiQ2xpZW50Iiwib24iLCJEaXNjb3JkQ29udHJvbGxlciIsImd1aWxkQ3JlYXRlIiwiZ3VpbGRNZW1iZXJBZGQiLCJndWlsZE1lbWJlclJlbW92ZSIsIm1lc3NhZ2UiLCJyZWFkeSIsImV2ZW50IiwiZGlzY29ubmVjdCIsInNpZ25JbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVRQSxhLEdBQWtCQyxPQUFPLENBQUNDLEcsQ0FBMUJGLGE7QUFDUixJQUFNRyxLQUFLLEdBQUcsT0FBTyxFQUFQLEdBQVksRUFBWixHQUFpQixFQUEvQjs7QUFFQSxJQUFNQyxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUNDLGVBQU1DLFFBQU4sQ0FBZUMsT0FBZixFQUZEOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBSUxDLDRCQUFPQyxLQUFQLENBQWEsMkJBQWI7O0FBSks7QUFBQTtBQUFBLG1CQU9IQyxvQkFBb0IsQ0FBQ0MsY0FBckIsRUFQRzs7QUFBQTtBQVFUQyxZQUFBQSxXQUFXLENBQUNGLG9CQUFvQixDQUFDQyxjQUF0QixFQUFzQ1IsS0FBdEMsQ0FBWDtBQVJTO0FBQUEsbUJBVUhVLFdBQVcsQ0FBQ0MsWUFBWixFQVZHOztBQUFBO0FBV1RGLFlBQUFBLFdBQVcsQ0FBQ0MsV0FBVyxDQUFDQyxZQUFiLEVBQTJCWCxLQUEzQixDQUFYO0FBRU1ZLFlBQUFBLE1BYkcsR0FhTSxJQUFJQyxPQUFPLENBQUNDLE1BQVosRUFiTjtBQWNURixZQUFBQSxNQUFNLENBQUNHLEVBQVAsQ0FBVSxhQUFWLEVBQXlCQyxpQkFBaUIsQ0FBQ0MsV0FBM0M7QUFDQUwsWUFBQUEsTUFBTSxDQUFDRyxFQUFQLENBQVUsZ0JBQVYsRUFBNEJDLGlCQUFpQixDQUFDRSxjQUE5QztBQUNBTixZQUFBQSxNQUFNLENBQUNHLEVBQVAsQ0FBVSxtQkFBVixFQUErQkMsaUJBQWlCLENBQUNHLGlCQUFqRDtBQUNBUCxZQUFBQSxNQUFNLENBQUNHLEVBQVAsQ0FBVSxTQUFWLEVBQXFCQyxpQkFBaUIsQ0FBQ0ksT0FBdkM7QUFDQVIsWUFBQUEsTUFBTSxDQUFDRyxFQUFQLENBQVUsT0FBVjtBQUFBO0FBQUE7QUFBQTtBQUFBLG9DQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFDVEMsaUJBQWlCLENBQUNLLEtBQWxCLENBQXdCVCxNQUF4QixDQURTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQW5CO0FBR0FBLFlBQUFBLE1BQU0sQ0FBQ0csRUFBUCxDQUFVLFlBQVYsRUFBd0IsVUFBQ08sS0FBRDtBQUFBLHFCQUFXTixpQkFBaUIsQ0FBQ08sVUFBbEIsQ0FBNkJELEtBQTdCLEVBQW9DVixNQUFwQyxFQUE0Q2YsYUFBNUMsQ0FBWDtBQUFBLGFBQXhCO0FBQ0FlLFlBQUFBLE1BQU0sQ0FBQ0csRUFBUCxDQUFVLE9BQVYsRUFBbUIsVUFBQ1QsS0FBRDtBQUFBLHFCQUFXVSxpQkFBaUIsQ0FBQ1YsS0FBbEIsQ0FBd0JBLEtBQXhCLEVBQStCTSxNQUEvQixFQUF1Q2YsYUFBdkMsQ0FBWDtBQUFBLGFBQW5CO0FBdEJTO0FBQUEsbUJBdUJIbUIsaUJBQWlCLENBQUNRLE1BQWxCLENBQXlCWixNQUF6QixFQUFpQ2YsYUFBakMsQ0F2Qkc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBSkksSUFBSTtBQUFBO0FBQUE7QUFBQSxHQUFWOztBQTBCQSxJQUFJO0FBQ0FBLEVBQUFBLElBQUk7QUFDUCxDQUZELENBRUUsT0FBT0ssS0FBUCxFQUFjO0FBQ1pELGtCQUFPQyxLQUFQLENBQWEsd0JBQWIsRUFBdUNBLEtBQXZDO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBEaXNjb3JkIGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcblxyXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCJsb2dnZXJcIjtcclxuaW1wb3J0IFN0b3JlIGZyb20gXCJwZXJzaXN0ZW5jZS9zdG9yZVwiO1xyXG5pbXBvcnQgKiBhcyBEaXNjb3JkQ29udHJvbGxlciBmcm9tIFwiY29udHJvbGxlcnMvZGlzY29yZFwiO1xyXG5pbXBvcnQgKiBhcyB1c2VyU2VydmljZSBmcm9tIFwic2VydmljZXMvdXNlclwiO1xyXG5pbXBvcnQgKiBhcyBjb25maWd1cmF0aW9uU2VydmljZSBmcm9tIFwic2VydmljZXMvY29uZmlndXJhdGlvblwiO1xyXG5cclxuY29uc3QgeyBESVNDT1JEX1RPS0VOIH0gPSBwcm9jZXNzLmVudjtcclxuY29uc3QgREFJTFkgPSAxMDAwICogNjAgKiA2MCAqIDI0O1xyXG5cclxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgU3RvcmUuaW5zdGFuY2UuY29ubmVjdCgpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJDb3VsZG4ndCBjb25uZWN0IHRvIHN0b3JlXCIsIGVycm9yKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYXdhaXQgY29uZmlndXJhdGlvblNlcnZpY2UudXBkYXRlTGFzdFN5bmMoKTtcclxuICAgIHNldEludGVydmFsKGNvbmZpZ3VyYXRpb25TZXJ2aWNlLnVwZGF0ZUxhc3RTeW5jLCBEQUlMWSk7XHJcbiAgICBcclxuICAgIGF3YWl0IHVzZXJTZXJ2aWNlLnVwZGF0ZVBvaW50cygpO1xyXG4gICAgc2V0SW50ZXJ2YWwodXNlclNlcnZpY2UudXBkYXRlUG9pbnRzLCBEQUlMWSk7XHJcblxyXG4gICAgY29uc3QgY2xpZW50ID0gbmV3IERpc2NvcmQuQ2xpZW50KCk7XHJcbiAgICBjbGllbnQub24oXCJndWlsZENyZWF0ZVwiLCBEaXNjb3JkQ29udHJvbGxlci5ndWlsZENyZWF0ZSk7XHJcbiAgICBjbGllbnQub24oXCJndWlsZE1lbWJlckFkZFwiLCBEaXNjb3JkQ29udHJvbGxlci5ndWlsZE1lbWJlckFkZCk7XHJcbiAgICBjbGllbnQub24oXCJndWlsZE1lbWJlclJlbW92ZVwiLCBEaXNjb3JkQ29udHJvbGxlci5ndWlsZE1lbWJlclJlbW92ZSk7XHJcbiAgICBjbGllbnQub24oXCJtZXNzYWdlXCIsIERpc2NvcmRDb250cm9sbGVyLm1lc3NhZ2UpO1xyXG4gICAgY2xpZW50Lm9uKFwicmVhZHlcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IERpc2NvcmRDb250cm9sbGVyLnJlYWR5KGNsaWVudCk7XHJcbiAgICB9KTtcclxuICAgIGNsaWVudC5vbihcImRpc2Nvbm5lY3RcIiwgKGV2ZW50KSA9PiBEaXNjb3JkQ29udHJvbGxlci5kaXNjb25uZWN0KGV2ZW50LCBjbGllbnQsIERJU0NPUkRfVE9LRU4pKTtcclxuICAgIGNsaWVudC5vbihcImVycm9yXCIsIChlcnJvcikgPT4gRGlzY29yZENvbnRyb2xsZXIuZXJyb3IoZXJyb3IsIGNsaWVudCwgRElTQ09SRF9UT0tFTikpO1xyXG4gICAgYXdhaXQgRGlzY29yZENvbnRyb2xsZXIuc2lnbkluKGNsaWVudCwgRElTQ09SRF9UT0tFTik7XHJcbn07XHJcblxyXG50cnkge1xyXG4gICAgaW5pdCgpO1xyXG59IGNhdGNoIChlcnJvcikge1xyXG4gICAgTG9nZ2VyLmVycm9yKFwiQ291bGRuJ3Qgc3RhcnQgdGhlIGFwcFwiLCBlcnJvcik7XHJcbn1cclxuIl19