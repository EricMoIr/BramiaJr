"use strict";

var Discord = _interopRequireWildcard(require("discord.js"));

var _logger = _interopRequireDefault(require("logger"));

var _store = _interopRequireDefault(require("persistence/store"));

var DiscordController = _interopRequireWildcard(require("controllers/discord"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DISCORD_TOKEN = process.env.DISCORD_TOKEN;
var client = new Discord.Client();

var init =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _store.default.instance.connect();

          case 2:
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
            _context2.prev = 8;
            _context2.next = 11;
            return client.login(DISCORD_TOKEN);

          case 11:
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](8);

            _logger.default.error("Couldn't connect to discord", _context2.t0);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[8, 13]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudHMiXSwibmFtZXMiOlsiRElTQ09SRF9UT0tFTiIsInByb2Nlc3MiLCJlbnYiLCJjbGllbnQiLCJEaXNjb3JkIiwiQ2xpZW50IiwiaW5pdCIsIlN0b3JlIiwiaW5zdGFuY2UiLCJjb25uZWN0Iiwib24iLCJEaXNjb3JkQ29udHJvbGxlciIsImd1aWxkQ3JlYXRlIiwiZ3VpbGRNZW1iZXJBZGQiLCJndWlsZE1lbWJlclJlbW92ZSIsIm1lc3NhZ2UiLCJyZWFkeSIsImV2ZW50IiwiZGlzY29ubmVjdCIsImxvZ2luIiwiTG9nZ2VyIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFUUEsYSxHQUFrQkMsT0FBTyxDQUFDQyxHLENBQTFCRixhO0FBRVIsSUFBTUcsTUFBTSxHQUFHLElBQUlDLE9BQU8sQ0FBQ0MsTUFBWixFQUFmOztBQUVBLElBQU1DLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNIQyxlQUFNQyxRQUFOLENBQWVDLE9BQWYsRUFERzs7QUFBQTtBQUVUTixZQUFBQSxNQUFNLENBQUNPLEVBQVAsQ0FBVSxhQUFWLEVBQXlCQyxpQkFBaUIsQ0FBQ0MsV0FBM0M7QUFDQVQsWUFBQUEsTUFBTSxDQUFDTyxFQUFQLENBQVUsZ0JBQVYsRUFBNEJDLGlCQUFpQixDQUFDRSxjQUE5QztBQUNBVixZQUFBQSxNQUFNLENBQUNPLEVBQVAsQ0FBVSxtQkFBVixFQUErQkMsaUJBQWlCLENBQUNHLGlCQUFqRDtBQUNBWCxZQUFBQSxNQUFNLENBQUNPLEVBQVAsQ0FBVSxTQUFWLEVBQXFCQyxpQkFBaUIsQ0FBQ0ksT0FBdkM7QUFDQVosWUFBQUEsTUFBTSxDQUFDTyxFQUFQLENBQVUsT0FBVjtBQUFBO0FBQUE7QUFBQTtBQUFBLG9DQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFDVEMsaUJBQWlCLENBQUNLLEtBQWxCLENBQXdCYixNQUF4QixDQURTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQW5CO0FBR0FBLFlBQUFBLE1BQU0sQ0FBQ08sRUFBUCxDQUFVLFlBQVYsRUFBd0IsVUFBQ08sS0FBRDtBQUFBLHFCQUFXTixpQkFBaUIsQ0FBQ08sVUFBbEIsQ0FBNkJELEtBQTdCLEVBQW9DZCxNQUFwQyxFQUE0Q0gsYUFBNUMsQ0FBWDtBQUFBLGFBQXhCO0FBVFM7QUFBQTtBQUFBLG1CQVlDRyxNQUFNLENBQUNnQixLQUFQLENBQWFuQixhQUFiLENBWkQ7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFjTG9CLDRCQUFPQyxLQUFQLENBQWEsNkJBQWI7O0FBZEs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBSmYsSUFBSTtBQUFBO0FBQUE7QUFBQSxHQUFWOztBQWtCQSxJQUFJO0FBQ0FBLEVBQUFBLElBQUk7QUFDUCxDQUZELENBRUUsT0FBT2UsS0FBUCxFQUFjO0FBQ1pELGtCQUFPQyxLQUFQLENBQWEsd0JBQWIsRUFBdUNBLEtBQXZDO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBEaXNjb3JkIGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcblxyXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCJsb2dnZXJcIjtcclxuaW1wb3J0IFN0b3JlIGZyb20gXCJwZXJzaXN0ZW5jZS9zdG9yZVwiO1xyXG5pbXBvcnQgKiBhcyBEaXNjb3JkQ29udHJvbGxlciBmcm9tIFwiY29udHJvbGxlcnMvZGlzY29yZFwiO1xyXG5cclxuY29uc3QgeyBESVNDT1JEX1RPS0VOIH0gPSBwcm9jZXNzLmVudjtcclxuXHJcbmNvbnN0IGNsaWVudCA9IG5ldyBEaXNjb3JkLkNsaWVudCgpO1xyXG5cclxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IFN0b3JlLmluc3RhbmNlLmNvbm5lY3QoKTtcclxuICAgIGNsaWVudC5vbihcImd1aWxkQ3JlYXRlXCIsIERpc2NvcmRDb250cm9sbGVyLmd1aWxkQ3JlYXRlKTtcclxuICAgIGNsaWVudC5vbihcImd1aWxkTWVtYmVyQWRkXCIsIERpc2NvcmRDb250cm9sbGVyLmd1aWxkTWVtYmVyQWRkKTtcclxuICAgIGNsaWVudC5vbihcImd1aWxkTWVtYmVyUmVtb3ZlXCIsIERpc2NvcmRDb250cm9sbGVyLmd1aWxkTWVtYmVyUmVtb3ZlKTtcclxuICAgIGNsaWVudC5vbihcIm1lc3NhZ2VcIiwgRGlzY29yZENvbnRyb2xsZXIubWVzc2FnZSk7XHJcbiAgICBjbGllbnQub24oXCJyZWFkeVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgRGlzY29yZENvbnRyb2xsZXIucmVhZHkoY2xpZW50KTtcclxuICAgIH0pO1xyXG4gICAgY2xpZW50Lm9uKFwiZGlzY29ubmVjdFwiLCAoZXZlbnQpID0+IERpc2NvcmRDb250cm9sbGVyLmRpc2Nvbm5lY3QoZXZlbnQsIGNsaWVudCwgRElTQ09SRF9UT0tFTikpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgY2xpZW50LmxvZ2luKERJU0NPUkRfVE9LRU4pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJDb3VsZG4ndCBjb25uZWN0IHRvIGRpc2NvcmRcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG59O1xyXG5cclxudHJ5IHtcclxuICAgIGluaXQoKTtcclxufSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIExvZ2dlci5lcnJvcihcIkNvdWxkbid0IHN0YXJ0IHRoZSBhcHBcIiwgZXJyb3IpO1xyXG59XHJcbiJdfQ==