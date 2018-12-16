"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _independentCommands = _interopRequireDefault(require("./independentCommands"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PREFIX = process.env.PREFIX;
var help = {
  name: "help",
  description: "Shows information about other commands",
  execute: function () {
    var _execute = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(message, params) {
      var commandsDescriptions, command;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (params.length) {
                _context.next = 3;
                break;
              }

              commandsDescriptions = _independentCommands.default.map(function (c) {
                return "".concat(PREFIX).concat(c.name, " ").concat(c.description);
              }).join("\n- ");
              return _context.abrupt("return", message.reply("This is a list of the available commands. Type ".concat(PREFIX, "help <command> for more details.\n- ").concat(commandsDescriptions)));

            case 3:
              command = _independentCommands.default.find(function (c) {
                return params[0].toLowerCase() === c.name.toLowerCase();
              });

              if (!command) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", message.reply(command.description));

            case 6:
              return _context.abrupt("return", message.reply("help should be followed by a command. Usage: help setchannel"));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function execute(_x, _x2) {
      return _execute.apply(this, arguments);
    }

    return execute;
  }()
};
var _default = help;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbIlBSRUZJWCIsInByb2Nlc3MiLCJlbnYiLCJoZWxwIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiZXhlY3V0ZSIsIm1lc3NhZ2UiLCJwYXJhbXMiLCJsZW5ndGgiLCJjb21tYW5kc0Rlc2NyaXB0aW9ucyIsImluZGVwZW5kZW50Q29tbWFuZHMiLCJtYXAiLCJjIiwiam9pbiIsInJlcGx5IiwiY29tbWFuZCIsImZpbmQiLCJ0b0xvd2VyQ2FzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7OztJQUVRQSxNLEdBQVdDLE9BQU8sQ0FBQ0MsRyxDQUFuQkYsTTtBQUVSLElBQU1HLElBQWMsR0FBRztBQUNuQkMsRUFBQUEsSUFBSSxFQUFFLE1BRGE7QUFFbkJDLEVBQUFBLFdBQVcsRUFBRSx3Q0FGTTtBQUduQkMsRUFBQUEsT0FBTztBQUFBO0FBQUE7QUFBQSw0QkFBRSxpQkFBT0MsT0FBUCxFQUFnQkMsTUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBRUFBLE1BQU0sQ0FBQ0MsTUFGUDtBQUFBO0FBQUE7QUFBQTs7QUFHS0MsY0FBQUEsb0JBSEwsR0FHNEJDLDZCQUN4QkMsR0FEd0IsQ0FDcEIsVUFBQ0MsQ0FBRDtBQUFBLGlDQUFVYixNQUFWLFNBQW1CYSxDQUFDLENBQUNULElBQXJCLGNBQTZCUyxDQUFDLENBQUNSLFdBQS9CO0FBQUEsZUFEb0IsRUFFeEJTLElBRndCLENBRW5CLE1BRm1CLENBSDVCO0FBQUEsK0NBTU1QLE9BQU8sQ0FBQ1EsS0FBUiwwREFBZ0VmLE1BQWhFLGlEQUE2R1Usb0JBQTdHLEVBTk47O0FBQUE7QUFRQ00sY0FBQUEsT0FSRCxHQVFXTCw2QkFBb0JNLElBQXBCLENBQ1osVUFBQ0osQ0FBRDtBQUFBLHVCQUFPTCxNQUFNLENBQUMsQ0FBRCxDQUFOLENBQVVVLFdBQVYsT0FBNEJMLENBQUMsQ0FBQ1QsSUFBRixDQUFPYyxXQUFQLEVBQW5DO0FBQUEsZUFEWSxDQVJYOztBQUFBLG1CQVdERixPQVhDO0FBQUE7QUFBQTtBQUFBOztBQUFBLCtDQVlNVCxPQUFPLENBQUNRLEtBQVIsQ0FBY0MsT0FBTyxDQUFDWCxXQUF0QixDQVpOOztBQUFBO0FBQUEsK0NBY0VFLE9BQU8sQ0FBQ1EsS0FBUixDQUFjLDhEQUFkLENBZEY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUhZLENBQXZCO2VBcUJlWixJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCJkb21haW4vdHlwZXNcIjtcclxuaW1wb3J0IGluZGVwZW5kZW50Q29tbWFuZHMgZnJvbSBcIi4vaW5kZXBlbmRlbnRDb21tYW5kc1wiO1xyXG5cclxuY29uc3QgeyBQUkVGSVggfSA9IHByb2Nlc3MuZW52O1xyXG5cclxuY29uc3QgaGVscCA6IENvbW1hbmQgPSB7XHJcbiAgICBuYW1lOiBcImhlbHBcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3dzIGluZm9ybWF0aW9uIGFib3V0IG90aGVyIGNvbW1hbmRzXCIsXHJcbiAgICBleGVjdXRlOiBhc3luYyAobWVzc2FnZSwgcGFyYW1zKSA9PiB7XHJcblxyXG4gICAgICAgIGlmICghcGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb21tYW5kc0Rlc2NyaXB0aW9ucyA9IGluZGVwZW5kZW50Q29tbWFuZHNcclxuICAgICAgICAgICAgICAgIC5tYXAoKGMpID0+IGAke1BSRUZJWH0ke2MubmFtZX0gJHtjLmRlc2NyaXB0aW9ufWApXHJcbiAgICAgICAgICAgICAgICAuam9pbihcIlxcbi0gXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGBUaGlzIGlzIGEgbGlzdCBvZiB0aGUgYXZhaWxhYmxlIGNvbW1hbmRzLiBUeXBlICR7UFJFRklYfWhlbHAgPGNvbW1hbmQ+IGZvciBtb3JlIGRldGFpbHMuXFxuLSAke2NvbW1hbmRzRGVzY3JpcHRpb25zfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjb21tYW5kID0gaW5kZXBlbmRlbnRDb21tYW5kcy5maW5kKFxyXG4gICAgICAgICAgICAoYykgPT4gcGFyYW1zWzBdLnRvTG93ZXJDYXNlKCkgPT09IGMubmFtZS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGNvbW1hbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoY29tbWFuZC5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiaGVscCBzaG91bGQgYmUgZm9sbG93ZWQgYnkgYSBjb21tYW5kLiBVc2FnZTogaGVscCBzZXRjaGFubmVsXCIpO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhlbHA7Il19