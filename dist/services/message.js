"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMessage = exports.saveMessages = void 0;

var _message = _interopRequireDefault(require("models/message"));

var _store = _interopRequireDefault(require("persistence/store"));

var userService = _interopRequireWildcard(require("services/user"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var messagesCache = _store.default.guilds;
var COOLDOWN = 2000;

var getPoints = function getPoints(message) {
  return message.cleanContent.length;
};

var isCooldownOver = function isCooldownOver(authorId) {
  if (!messagesCache[authorId]) {
    messagesCache[authorId] = [];
  }

  var messages = messagesCache[authorId];
  var lastMessage = messages.length === 0 ? null : messages[messages.length - 1];
  return !lastMessage || lastMessage && Date.now() - lastMessage.time > COOLDOWN;
};

var saveMessages =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var userIds, promises;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userIds = Object.keys(messagesCache);
            promises = [];
            userIds.forEach(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(userId) {
                var author;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return userService.get(userId, messagesCache[userId][0].author.server);

                      case 2:
                        author = _context.sent;
                        promises.push.apply(promises, _toConsumableArray(messagesCache[userId].map(function (message) {
                          message.author = author;
                          return _message.default.create(message);
                        })));

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());
            messagesCache.clear();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function saveMessages() {
    return _ref.apply(this, arguments);
  };
}();

exports.saveMessages = saveMessages;

var handleMessage =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(message) {
    var author, dbMessage, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!message.author.bot) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return");

          case 2:
            author = {
              id: message.author.id,
              username: message.author.username,
              server: message.guild.id
            };
            dbMessage = {
              content: message.cleanContent,
              author: author,
              time: new Date()
            };
            _context3.next = 6;
            return userService.get(message.author.id, message.guild.id);

          case 6:
            user = _context3.sent;

            if (user) {
              _context3.next = 11;
              break;
            }

            _context3.next = 10;
            return userService.create(author);

          case 10:
            user = _context3.sent;

          case 11:
            if (!isCooldownOver(author.id)) {
              _context3.next = 15;
              break;
            }

            messagesCache[author.id].push(dbMessage);
            _context3.next = 15;
            return userService.addPoints(user, getPoints(message));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function handleMessage(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.handleMessage = handleMessage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9tZXNzYWdlLnRzIl0sIm5hbWVzIjpbIm1lc3NhZ2VzQ2FjaGUiLCJTdG9yZSIsImd1aWxkcyIsIkNPT0xET1dOIiwiZ2V0UG9pbnRzIiwibWVzc2FnZSIsImNsZWFuQ29udGVudCIsImxlbmd0aCIsImlzQ29vbGRvd25PdmVyIiwiYXV0aG9ySWQiLCJtZXNzYWdlcyIsImxhc3RNZXNzYWdlIiwiRGF0ZSIsIm5vdyIsInRpbWUiLCJzYXZlTWVzc2FnZXMiLCJ1c2VySWRzIiwiT2JqZWN0Iiwia2V5cyIsInByb21pc2VzIiwiZm9yRWFjaCIsInVzZXJJZCIsInVzZXJTZXJ2aWNlIiwiZ2V0IiwiYXV0aG9yIiwic2VydmVyIiwicHVzaCIsIm1hcCIsIk1lc3NhZ2UiLCJjcmVhdGUiLCJjbGVhciIsImhhbmRsZU1lc3NhZ2UiLCJib3QiLCJpZCIsInVzZXJuYW1lIiwiZ3VpbGQiLCJkYk1lc3NhZ2UiLCJjb250ZW50IiwidXNlciIsImFkZFBvaW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLEdBQUdDLGVBQU1DLE1BQTVCO0FBRUEsSUFBTUMsUUFBUSxHQUFHLElBQWpCOztBQUVBLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNDLE9BQUQsRUFBYTtBQUMzQixTQUFPQSxPQUFPLENBQUNDLFlBQVIsQ0FBcUJDLE1BQTVCO0FBQ0gsQ0FGRDs7QUFJQSxJQUFNQyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUNDLFFBQUQsRUFBYztBQUNqQyxNQUFJLENBQUNULGFBQWEsQ0FBQ1MsUUFBRCxDQUFsQixFQUE4QjtBQUMxQlQsSUFBQUEsYUFBYSxDQUFDUyxRQUFELENBQWIsR0FBMEIsRUFBMUI7QUFDSDs7QUFDRCxNQUFNQyxRQUFRLEdBQUdWLGFBQWEsQ0FBQ1MsUUFBRCxDQUE5QjtBQUNBLE1BQU1FLFdBQVcsR0FBR0QsUUFBUSxD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Q3dCLE1BQU0sQ0FBQ1MsRUFBUixDQUFiLENBQXlCUCxJQUF6QixDQUE4QlUsU0FBOUI7QUFuQnFCO0FBQUEsbUJBb0JmZCxXQUFXLENBQUNpQixTQUFaLENBQXNCRCxJQUF0QixFQUE0QmxDLFNBQVMsQ0FBQ0MsT0FBRCxDQUFyQyxDQXBCZTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFiMEIsYUFBYTtBQUFBO0FBQUE7QUFBQSxHQUFuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNZXNzYWdlIGZyb20gXCJtb2RlbHMvbWVzc2FnZVwiO1xyXG5pbXBvcnQgU3RvcmUgZnJvbSBcInBlcnNpc3RlbmNlL3N0b3JlXCI7XHJcbmltcG9ydCAqIGFzIHVzZXJTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy91c2VyXCI7XHJcblxyXG5jb25zdCBtZXNzYWdlc0NhY2hlID0gU3RvcmUuZ3VpbGRzO1xyXG5cclxuY29uc3QgQ09PTERPV04gPSAyMDAwO1xyXG5cclxuY29uc3QgZ2V0UG9pbnRzID0gKG1lc3NhZ2UpID0+IHtcclxuICAgIHJldHVybiBtZXNzYWdlLmNsZWFuQ29udGVudC5sZW5ndGg7XHJcbn07XHJcblxyXG5jb25zdCBpc0Nvb2xkb3duT3ZlciA9IChhdXRob3JJZCkgPT4ge1xyXG4gICAgaWYgKCFtZXNzYWdlc0NhY2hlW2F1dGhvcklkXSkge1xyXG4gICAgICAgIG1lc3NhZ2VzQ2FjaGVbYXV0aG9ySWRdID0gW107XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXNzYWdlcyA9IG1lc3NhZ2VzQ2FjaGVbYXV0aG9ySWRdO1xyXG4gICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBtZXNzYWdlcy5sZW5ndGggPT09IDAgPyBudWxsIDogbWVzc2FnZXNbbWVzc2FnZXMubGVuZ3RoIC0gMV07XHJcbiAgICByZXR1cm4gIWxhc3RNZXNzYWdlIHx8XHJcbiAgICBsYXN0TWVzc2FnZSAmJiBEYXRlLm5vdygpIC0gbGFzdE1lc3NhZ2UudGltZSA+IENPT0xET1dOO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNhdmVNZXNzYWdlcyA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHVzZXJJZHMgPSBPYmplY3Qua2V5cyhtZXNzYWdlc0NhY2hlKTtcclxuICAgIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICB1c2VySWRzLmZvckVhY2goYXN5bmMgKHVzZXJJZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGF1dGhvciA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldCh1c2VySWQsIG1lc3NhZ2VzQ2FjaGVbdXNlcklkXVswXS5hdXRob3Iuc2VydmVyKTtcclxuICAgICAgICBwcm9taXNlcy5wdXNoKC4uLm1lc3NhZ2VzQ2FjaGVbdXNlcklkXS5tYXAoKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgbWVzc2FnZS5hdXRob3IgPSBhdXRob3I7XHJcbiAgICAgICAgICAgIHJldHVybiBNZXNzYWdlLmNyZWF0ZShtZXNzYWdlKTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9KTtcclxuICAgIG1lc3NhZ2VzQ2FjaGUuY2xlYXIoKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVNZXNzYWdlID0gYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgIGlmIChtZXNzYWdlLmF1dGhvci5ib3QpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBhdXRob3IgPSB7XHJcbiAgICAgICAgaWQ6IG1lc3NhZ2UuYXV0aG9yLmlkLFxyXG4gICAgICAgIHVzZXJuYW1lOiBtZXNzYWdlLmF1dGhvci51c2VybmFtZSxcclxuICAgICAgICBzZXJ2ZXI6IG1lc3NhZ2UuZ3VpbGQuaWQsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZGJNZXNzYWdlID0ge1xyXG4gICAgICAgIGNvbnRlbnQ6IG1lc3NhZ2UuY2xlYW5Db250ZW50LFxyXG4gICAgICAgIGF1dGhvcixcclxuICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgfTtcclxuICAgIGxldCB1c2VyID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0KG1lc3NhZ2UuYXV0aG9yLmlkLCBtZXNzYWdlLmd1aWxkLmlkKTtcclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICAgIHVzZXIgPSBhd2FpdCB1c2VyU2VydmljZS5jcmVhdGUoYXV0aG9yKTtcclxuICAgIH1cclxuICAgIGlmIChpc0Nvb2xkb3duT3ZlcihhdXRob3IuaWQpKSB7XHJcbiAgICAgICAgbWVzc2FnZXNDYWNoZVthdXRob3IuaWRdLnB1c2goZGJNZXNzYWdlKTtcclxuICAgICAgICBhd2FpdCB1c2VyU2VydmljZS5hZGRQb2ludHModXNlciwgZ2V0UG9pbnRzKG1lc3NhZ2UpKTtcclxuICAgIH1cclxufTsiXX0=