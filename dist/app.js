"use strict";

var _logger = _interopRequireDefault(require("logger"));

var _store = _interopRequireDefault(require("persistence/store"));

var DiscordController = _interopRequireWildcard(require("controllers/discord"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Discord = require("discord.js");

var DISCORD_TOKEN = process.env.DISCORD_TOKEN;
var client = new Discord.Client();

var init =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _store.default.connect();

          case 2:
            client.on("guildCreate", DiscordController.guildCreate);
            client.on("guildMemberAdd", DiscordController.guildMemberAdd);
            client.on("guildMemberRemove", DiscordController.guildMemberRemove);
            client.on("message", DiscordController.message);
            client.on("ready", function () {
              return DiscordController.ready(client);
            });
            client.on("disconnect", function (event) {
              return DiscordController.disconnect(event, client, DISCORD_TOKEN);
            });
            _context.prev = 8;
            _context.next = 11;
            return client.login(DISCORD_TOKEN);

          case 11:
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](8);

            _logger.default.error("Couldn't connect to discord");

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[8, 13]]);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

init();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudHMiXSwibmFtZXMiOlsiRGlzY29yZCIsInJlcXVpcmUiLCJESVNDT1JEX1RPS0VOIiwicHJvY2VzcyIsImVudiIsImNsaWVudCIsIkNsaWVudCIsImluaXQiLCJTdG9yZSIsImNvbm5lY3QiLCJvbiIsIkRpc2NvcmRDb250cm9sbGVyIiwiZ3VpbGRDcmVhdGUiLCJndWlsZE1lbWJlckFkZCIsImd1aWxkTWVtYmVyUmVtb3ZlIiwibWVzc2FnZSIsInJlYWR5IiwiZXZlbnQiLCJkaXNjb25uZWN0IiwibG9naW4iLCJMb2dnZXIiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUpBLElBQU1BLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBdkI7O0lBTVFDLGEsR0FBa0JDLE9BQU8sQ0FBQ0MsRyxDQUExQkYsYTtBQUVSLElBQU1HLE1BQU0sR0FBRyxJQUFJTCxPQUFPLENBQUNNLE1BQVosRUFBZjs7QUFFQSxJQUFNQyxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDSEMsZUFBTUMsT0FBTixFQURHOztBQUFBO0FBRVRKLFlBQUFBLE1BQU0sQ0FBQ0ssRUFBUCxDQUFVLGFBQVYsRUFBeUJDLGlCQUFpQixDQUFDQyxXQUEzQztBQUNBUCxZQUFBQSxNQUFNLENBQUNLLEVBQVAsQ0FBVSxnQkFBVixFQUE0QkMsaUJBQWlCLENBQUNFLGNBQTlDO0FBQ0FSLFlBQUFBLE1BQU0sQ0FBQ0ssRUFBUCxDQUFVLG1CQUFWLEVBQStCQyxpQkFBaUIsQ0FBQ0csaUJBQWpEO0FBQ0FULFlBQUFBLE1BQU0sQ0FBQ0ssRUFBUCxDQUFVLFNBQVYsRUFBcUJDLGlCQUFpQixDQUFDSSxPQUF2QztBQUNBVixZQUFBQSxNQUFNLENBQUNLLEVBQVAsQ0FBVSxPQUFWLEVBQW1CO0FBQUEscUJBQU1DLGlCQUFpQixDQUFDSyxLQUFsQixDQUF3QlgsTUFBeEIsQ0FBTjtBQUFBLGFBQW5CO0FBQ0FBLFlBQUFBLE1BQU0sQ0FBQ0ssRUFBUCxDQUFVLFlBQVYsRUFBd0IsVUFBQ08sS0FBRDtBQUFBLHFCQUFXTixpQkFBaUIsQ0FBQ08sVUFBbEIsQ0FBNkJELEtBQTdCLEVBQW9DWixNQUFwQyxFQUE0Q0gsYUFBNUMsQ0FBWDtBQUFBLGFBQXhCO0FBUFM7QUFBQTtBQUFBLG1CQVVDRyxNQUFNLENBQUNjLEtBQVAsQ0FBYWpCLGFBQWIsQ0FWRDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQVlMa0IsNEJBQU9DLEtBQVAsQ0FBYSw2QkFBYjs7QUFaSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFKZCxJQUFJO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBZ0JBQSxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRGlzY29yZCA9IHJlcXVpcmUoXCJkaXNjb3JkLmpzXCIpO1xyXG5cclxuaW1wb3J0IExvZ2dlciBmcm9tIFwibG9nZ2VyXCI7XHJcbmltcG9ydCBTdG9yZSBmcm9tIFwicGVyc2lzdGVuY2Uvc3RvcmVcIjtcclxuaW1wb3J0ICogYXMgRGlzY29yZENvbnRyb2xsZXIgZnJvbSBcImNvbnRyb2xsZXJzL2Rpc2NvcmRcIjtcclxuXHJcbmNvbnN0IHsgRElTQ09SRF9UT0tFTiB9ID0gcHJvY2Vzcy5lbnY7XHJcblxyXG5jb25zdCBjbGllbnQgPSBuZXcgRGlzY29yZC5DbGllbnQoKTtcclxuXHJcbmNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBTdG9yZS5jb25uZWN0KCk7XHJcbiAgICBjbGllbnQub24oXCJndWlsZENyZWF0ZVwiLCBEaXNjb3JkQ29udHJvbGxlci5ndWlsZENyZWF0ZSk7XHJcbiAgICBjbGllbnQub24oXCJndWlsZE1lbWJlckFkZFwiLCBEaXNjb3JkQ29udHJvbGxlci5ndWlsZE1lbWJlckFkZCk7XHJcbiAgICBjbGllbnQub24oXCJndWlsZE1lbWJlclJlbW92ZVwiLCBEaXNjb3JkQ29udHJvbGxlci5ndWlsZE1lbWJlclJlbW92ZSk7XHJcbiAgICBjbGllbnQub24oXCJtZXNzYWdlXCIsIERpc2NvcmRDb250cm9sbGVyLm1lc3NhZ2UpO1xyXG4gICAgY2xpZW50Lm9uKFwicmVhZHlcIiwgKCkgPT4gRGlzY29yZENvbnRyb2xsZXIucmVhZHkoY2xpZW50KSk7XHJcbiAgICBjbGllbnQub24oXCJkaXNjb25uZWN0XCIsIChldmVudCkgPT4gRGlzY29yZENvbnRyb2xsZXIuZGlzY29ubmVjdChldmVudCwgY2xpZW50LCBESVNDT1JEX1RPS0VOKSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBjbGllbnQubG9naW4oRElTQ09SRF9UT0tFTik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIkNvdWxkbid0IGNvbm5lY3QgdG8gZGlzY29yZFwiKTtcclxuICAgIH1cclxufTtcclxuXHJcbmluaXQoKTsiXX0=