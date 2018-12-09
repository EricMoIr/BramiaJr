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
  return !lastMessage || lastMessage && Date.now() - lastMessage.time.getTime() > COOLDOWN;
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
            dbMessage = new _message.default({
              content: message.cleanContent,
              author: author,
              time: new Date()
            });
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
            if (!(!user.isBot && isCooldownOver(author.id))) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9tZXNzYWdlLnRzIl0sIm5hbWVzIjpbIm1lc3NhZ2VzQ2FjaGUiLCJTdG9yZSIsImluc3RhbmNlIiwibWVzc2FnZXMiLCJDT09MRE9XTiIsImdldFBvaW50cyIsIm1lc3NhZ2UiLCJjbGVhbkNvbnRlbnQiLCJsZW5ndGgiLCJpc0Nvb2xkb3duT3ZlciIsImF1dGhvcklkIiwiZ2V0Iiwic2V0IiwibGFzdE1lc3NhZ2UiLCJEYXRlIiwibm93IiwidGltZSIsImdldFRpbWUiLCJzYXZlTWVzc2FnZXMiLCJ1c2VySWRzIiwiT2JqZWN0Iiwia2V5cyIsInByb21pc2VzIiwiZm9yRWFjaCIsInVzZXJJZCIsInVzZXJTZXJ2aWNlIiwiYXV0aG9yIiwic2VydmVyIiwicHVzaCIsIm1hcCIsIk1lc3NhZ2UiLCJjcmVhdGUiLCJQcm9taXNlIiwiYWxsIiwiY2xlYXIiLCJoYW5kbGVNZXNzYWdlIiwiYm90IiwiaWQiLCJ1c2VybmFtZSIsImd1aWxkIiwiZGJNZXNzYWdlIiwiY29udGVudCIsInVzZXIiLCJpc0JvdCIsImFkZFBvaW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLEdBQUdDLGVBQU1DLFFBQU4sQ0FBZUMsUUFBckM7QUFFQSxJQUFNQyxRQUFRLEdBQUcsSUFBakI7O0FBRUEsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ0MsT0FBRCxFQUFhO0FBQzNCLFNBQU9BLE9BQU8sQ0FBQ0MsWUFBUixDQUFxQkMsTUFBNUI7QUFDSCxDQUZEOztBQUlBLElBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0MsUUFBRCxFQUFjO0FBQ2pDLE1BQUksQ0FBQ1YsYUFBYSxDQUFDVyxHQUFkLENBQWtCRCxRQUFsQixDQUFMLEVBQWtDO0FBQzlCVixJQUFBQSxhQUFhLENBQUNZLEdBQWQsQ0FBa0JGLFFBQWxCLEVBQTRCLEVBQTVCO0FBQ0g7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QWRxQjs7QUFBQSxnQkFlcEJBLElBZm9CO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBZ0JSakIsV0FBVyxDQUFDTSxNQUFaLENBQW1CTCxNQUFuQixDQWhCUTs7QUFBQTtBQWdCckJnQixZQUFBQSxJQWhCcUI7O0FBQUE7QUFBQSxrQkFrQnJCLENBQUNBLElBQUksQ0FBQ0MsS0FBTixJQUFlbEMsY0FBYyxDQUFDaUIsTUFBTSxDQUFDVyxFQUFSLENBbEJSO0FBQUE7QUFBQTtBQUFBOztBQW1CckJyQyxZQUFBQSxhQUFhLENBQUNXLEdBQWQsQ0FBa0JlLE1BQU0sQ0FBQ1csRUFBekIsRUFBNkJULElBQTdCLENBQWtDWSxTQUFsQztBQW5CcUI7QUFBQSxtQkFvQmZmLFdBQVcsQ0FBQ21CLFNBQVosQ0FBc0JGLElBQXRCLEVBQTRCckMsU0FBUyxDQUFDQyxPQUFELENBQXJDLENBcEJlOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQWI2QixhQUFhO0FBQUE7QUFBQTtBQUFBLEdBQW5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1lc3NhZ2UgZnJvbSBcIm1vZGVscy9tZXNzYWdlXCI7XHJcbmltcG9ydCBTdG9yZSBmcm9tIFwicGVyc2lzdGVuY2Uvc3RvcmVcIjtcclxuaW1wb3J0ICogYXMgdXNlclNlcnZpY2UgZnJvbSBcInNlcnZpY2VzL3VzZXJcIjtcclxuXHJcbmNvbnN0IG1lc3NhZ2VzQ2FjaGUgPSBTdG9yZS5pbnN0YW5jZS5tZXNzYWdlcztcclxuXHJcbmNvbnN0IENPT0xET1dOID0gMjAwMDtcclxuXHJcbmNvbnN0IGdldFBvaW50cyA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICByZXR1cm4gbWVzc2FnZS5jbGVhbkNvbnRlbnQubGVuZ3RoO1xyXG59O1xyXG5cclxuY29uc3QgaXNDb29sZG93bk92ZXIgPSAoYXV0aG9ySWQpID0+IHtcclxuICAgIGlmICghbWVzc2FnZXNDYWNoZS5nZXQoYXV0aG9ySWQpKSB7XHJcbiAgICAgICAgbWVzc2FnZXNDYWNoZS5zZXQoYXV0aG9ySWQsIFtdKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG1lc3NhZ2VzID0gbWVzc2FnZXNDYWNoZS5nZXQoYXV0aG9ySWQpO1xyXG4gICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBtZXNzYWdlcy5sZW5ndGggPT09IDAgPyBudWxsIDogbWVzc2FnZXNbbWVzc2FnZXMubGVuZ3RoIC0gMV07XHJcbiAgICByZXR1cm4gIWxhc3RNZXNzYWdlIHx8XHJcbiAgICBsYXN0TWVzc2FnZSAmJiBEYXRlLm5vdygpIC0gbGFzdE1lc3NhZ2UudGltZS5nZXRUaW1lKCkgPiBDT09MRE9XTjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzYXZlTWVzc2FnZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCB1c2VySWRzID0gT2JqZWN0LmtleXMobWVzc2FnZXNDYWNoZSk7XHJcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgdXNlcklkcy5mb3JFYWNoKGFzeW5jICh1c2VySWQpID0+IHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlcyA9IG1lc3NhZ2VzQ2FjaGUuZ2V0KHVzZXJJZCk7XHJcbiAgICAgICAgY29uc3QgYXV0aG9yID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0KHVzZXJJZCwgbWVzc2FnZXNbMF0uYXV0aG9yLnNlcnZlcik7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaCguLi5tZXNzYWdlcy5tYXAoKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgbWVzc2FnZS5hdXRob3IgPSBhdXRob3I7XHJcbiAgICAgICAgICAgIHJldHVybiBNZXNzYWdlLmNyZWF0ZShtZXNzYWdlKTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcclxuICAgIG1lc3NhZ2VzQ2FjaGUuY2xlYXIoKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVNZXNzYWdlID0gYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgIGlmIChtZXNzYWdlLmF1dGhvci5ib3QpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBhdXRob3IgPSB7XHJcbiAgICAgICAgaWQ6IG1lc3NhZ2UuYXV0aG9yLmlkLFxyXG4gICAgICAgIHVzZXJuYW1lOiBtZXNzYWdlLmF1dGhvci51c2VybmFtZSxcclxuICAgICAgICBzZXJ2ZXI6IG1lc3NhZ2UuZ3VpbGQuaWQsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZGJNZXNzYWdlID0gbmV3IE1lc3NhZ2UgKHtcclxuICAgICAgICBjb250ZW50OiBtZXNzYWdlLmNsZWFuQ29udGVudCxcclxuICAgICAgICBhdXRob3IsXHJcbiAgICAgICAgdGltZTogbmV3IERhdGUoKSxcclxuICAgIH0pO1xyXG4gICAgbGV0IHVzZXIgPSBhd2FpdCB1c2VyU2VydmljZS5nZXQobWVzc2FnZS5hdXRob3IuaWQsIG1lc3NhZ2UuZ3VpbGQuaWQpO1xyXG4gICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IHVzZXJTZXJ2aWNlLmNyZWF0ZShhdXRob3IpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF1c2VyLmlzQm90ICYmIGlzQ29vbGRvd25PdmVyKGF1dGhvci5pZCkpIHtcclxuICAgICAgICBtZXNzYWdlc0NhY2hlLmdldChhdXRob3IuaWQpLnB1c2goZGJNZXNzYWdlKTtcclxuICAgICAgICBhd2FpdCB1c2VyU2VydmljZS5hZGRQb2ludHModXNlciwgZ2V0UG9pbnRzKG1lc3NhZ2UpKTtcclxuICAgIH1cclxufTsiXX0=