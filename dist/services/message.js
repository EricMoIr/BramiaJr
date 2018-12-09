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

var messagesCache = _store.default.instance.messages;
var COOLDOWN = 2000;

var getPoints = function getPoints(message) {
  return message.cleanContent.length;
};

var isCooldownOver = function isCooldownOver(authorId) {
  if (!messagesCache.get(authorId)) {
    messagesCache.set(authorId, []);
  }

  var messages = messagesCache.get(authorId);
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
                var messages, author;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        messages = messagesCache.get(userId);
                        _context.next = 3;
                        return userService.get(userId, messages[0].author.server);

                      case 3:
                        author = _context.sent;
                        promises.push.apply(promises, _toConsumableArray(messages.map(function (message) {
                          message.author = author;
                          return _message.default.create(message);
                        })));

                      case 5:
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
            _context2.next = 5;
            return Promise.all(promises);

          case 5:
            messagesCache.clear();

          case 6:
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

            messagesCache.get(author.id).push(dbMessage);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9tZXNzYWdlLnRzIl0sIm5hbWVzIjpbIm1lc3NhZ2VzQ2FjaGUiLCJTdG9yZSIsImluc3RhbmNlIiwibWVzc2FnZXMiLCJDT09MRE9XTiIsImdldFBvaW50cyIsIm1lc3NhZ2UiLCJjbGVhbkNvbnRlbnQiLCJsZW5ndGgiLCJpc0Nvb2xkb3duT3ZlciIsImF1dGhvcklkIiwiZ2V0Iiwic2V0IiwibGFzdE1lc3NhZ2UiLCJEYXRlIiwibm93IiwidGltZSIsInNhdmVNZXNzYWdlcyIsInVzZXJJZHMiLCJPYmplY3QiLCJrZXlzIiwicHJvbWlzZXMiLCJmb3JFYWNoIiwidXNlcklkIiwidXNlclNlcnZpY2UiLCJhdXRob3IiLCJzZXJ2ZXIiLCJwdXNoIiwibWFwIiwiTWVzc2FnZSIsImNyZWF0ZSIsIlByb21pc2UiLCJhbGwiLCJjbGVhciIsImhhbmRsZU1lc3NhZ2UiLCJib3QiLCJpZCIsInVzZXJuYW1lIiwiZ3VpbGQiLCJkYk1lc3NhZ2UiLCJjb250ZW50IiwidXNlciIsImFkZFBvaW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLEdBQUdDLGVBQU1DLFFBQU4sQ0FBZUMsUUFBckM7QUFFQSxJQUFNQyxRQUFRLEdBQUcsSUFBakI7O0FBRUEsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ0MsT0FBRCxFQUFhO0FBQzNCLFNBQU9BLE9BQU8sQ0FBQ0MsWUFBUixDQUFxQkMsTUFBNUI7QUFDSCxDQUZEOztBQUlBLElBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0MsUUFBRCxFQUFjO0FBQ2pDLE1BQUksQ0FBQ1YsYUFBYSxDQUFDVyxHQUFkLENBQWtCRCxRQUFsQixDQUFMLEVBQWtDO0FBQzlCVixJQUFBQSxhQUFhLENBQUNZLEdBQWQsQ0FBa0JGLFFBQWxCLEVBQTRCLEVBQTVCO0FBQ0g7O0FBQ0QsTUFBTVAsUUFBUSxH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QVcsQ0FBQ00sTUFBWixDQUFtQkwsTUFBbkIsQ0FoQlE7O0FBQUE7QUFnQnJCZ0IsWUFBQUEsSUFoQnFCOztBQUFBO0FBQUEsaUJBa0JyQmhDLGNBQWMsQ0FBQ2dCLE1BQU0sQ0FBQ1csRUFBUixDQWxCTztBQUFBO0FBQUE7QUFBQTs7QUFtQnJCcEMsWUFBQUEsYUFBYSxDQUFDVyxHQUFkLENBQWtCYyxNQUFNLENBQUNXLEVBQXpCLEVBQTZCVCxJQUE3QixDQUFrQ1ksU0FBbEM7QUFuQnFCO0FBQUEsbUJBb0JmZixXQUFXLENBQUNrQixTQUFaLENBQXNCRCxJQUF0QixFQUE0QnBDLFNBQVMsQ0FBQ0MsT0FBRCxDQUFyQyxDQXBCZTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFiNEIsYUFBYTtBQUFBO0FBQUE7QUFBQSxHQUFuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNZXNzYWdlIGZyb20gXCJtb2RlbHMvbWVzc2FnZVwiO1xyXG5pbXBvcnQgU3RvcmUgZnJvbSBcInBlcnNpc3RlbmNlL3N0b3JlXCI7XHJcbmltcG9ydCAqIGFzIHVzZXJTZXJ2aWNlIGZyb20gXCJzZXJ2aWNlcy91c2VyXCI7XHJcblxyXG5jb25zdCBtZXNzYWdlc0NhY2hlID0gU3RvcmUuaW5zdGFuY2UubWVzc2FnZXM7XHJcblxyXG5jb25zdCBDT09MRE9XTiA9IDIwMDA7XHJcblxyXG5jb25zdCBnZXRQb2ludHMgPSAobWVzc2FnZSkgPT4ge1xyXG4gICAgcmV0dXJuIG1lc3NhZ2UuY2xlYW5Db250ZW50Lmxlbmd0aDtcclxufTtcclxuXHJcbmNvbnN0IGlzQ29vbGRvd25PdmVyID0gKGF1dGhvcklkKSA9PiB7XHJcbiAgICBpZiAoIW1lc3NhZ2VzQ2FjaGUuZ2V0KGF1dGhvcklkKSkge1xyXG4gICAgICAgIG1lc3NhZ2VzQ2FjaGUuc2V0KGF1dGhvcklkLCBbXSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXNzYWdlcyA9IG1lc3NhZ2VzQ2FjaGUuZ2V0KGF1dGhvcklkKTtcclxuICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gbWVzc2FnZXMubGVuZ3RoID09PSAwID8gbnVsbCA6IG1lc3NhZ2VzW21lc3NhZ2VzLmxlbmd0aCAtIDFdO1xyXG4gICAgcmV0dXJuICFsYXN0TWVzc2FnZSB8fFxyXG4gICAgbGFzdE1lc3NhZ2UgJiYgRGF0ZS5ub3coKSAtIGxhc3RNZXNzYWdlLnRpbWUgPiBDT09MRE9XTjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzYXZlTWVzc2FnZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCB1c2VySWRzID0gT2JqZWN0LmtleXMobWVzc2FnZXNDYWNoZSk7XHJcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgdXNlcklkcy5mb3JFYWNoKGFzeW5jICh1c2VySWQpID0+IHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlcyA9IG1lc3NhZ2VzQ2FjaGUuZ2V0KHVzZXJJZCk7XHJcbiAgICAgICAgY29uc3QgYXV0aG9yID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0KHVzZXJJZCwgbWVzc2FnZXNbMF0uYXV0aG9yLnNlcnZlcik7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaCguLi5tZXNzYWdlcy5tYXAoKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgbWVzc2FnZS5hdXRob3IgPSBhdXRob3I7XHJcbiAgICAgICAgICAgIHJldHVybiBNZXNzYWdlLmNyZWF0ZShtZXNzYWdlKTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcclxuICAgIG1lc3NhZ2VzQ2FjaGUuY2xlYXIoKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVNZXNzYWdlID0gYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgIGlmIChtZXNzYWdlLmF1dGhvci5ib3QpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBhdXRob3IgPSB7XHJcbiAgICAgICAgaWQ6IG1lc3NhZ2UuYXV0aG9yLmlkLFxyXG4gICAgICAgIHVzZXJuYW1lOiBtZXNzYWdlLmF1dGhvci51c2VybmFtZSxcclxuICAgICAgICBzZXJ2ZXI6IG1lc3NhZ2UuZ3VpbGQuaWQsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZGJNZXNzYWdlID0ge1xyXG4gICAgICAgIGNvbnRlbnQ6IG1lc3NhZ2UuY2xlYW5Db250ZW50LFxyXG4gICAgICAgIGF1dGhvcixcclxuICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgfTtcclxuICAgIGxldCB1c2VyID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0KG1lc3NhZ2UuYXV0aG9yLmlkLCBtZXNzYWdlLmd1aWxkLmlkKTtcclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICAgIHVzZXIgPSBhd2FpdCB1c2VyU2VydmljZS5jcmVhdGUoYXV0aG9yKTtcclxuICAgIH1cclxuICAgIGlmIChpc0Nvb2xkb3duT3ZlcihhdXRob3IuaWQpKSB7XHJcbiAgICAgICAgbWVzc2FnZXNDYWNoZS5nZXQoYXV0aG9yLmlkKS5wdXNoKGRiTWVzc2FnZSk7XHJcbiAgICAgICAgYXdhaXQgdXNlclNlcnZpY2UuYWRkUG9pbnRzKHVzZXIsIGdldFBvaW50cyhtZXNzYWdlKSk7XHJcbiAgICB9XHJcbn07Il19