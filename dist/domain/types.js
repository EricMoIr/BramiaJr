"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.Message = exports.Guild = void 0;

var _guild = _interopRequireDefault(require("models/guild"));

var _message = _interopRequireDefault(require("models/message"));

var _user = _interopRequireDefault(require("models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Guild =
/*#__PURE__*/
function (_GuildModel) {
  _inherits(Guild, _GuildModel);

  function Guild() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Guild);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Guild)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "defaultChannel", void 0);

    return _this;
  }

  _createClass(Guild, [{
    key: "setDefaultChannel",
    value: function setDefaultChannel(channel) {
      this.defaultChannel = channel;
    }
  }]);

  return Guild;
}(_guild.default);

exports.Guild = Guild;

var Message =
/*#__PURE__*/
function (_MessageModel) {
  _inherits(Message, _MessageModel);

  function Message() {
    _classCallCheck(this, Message);

    return _possibleConstructorReturn(this, _getPrototypeOf(Message).apply(this, arguments));
  }

  return Message;
}(_message.default);

exports.Message = Message;

var User =
/*#__PURE__*/
function (_UserModel) {
  _inherits(User, _UserModel);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, _getPrototypeOf(User).apply(this, arguments));
  }

  return User;
}(_user.default);

exports.User = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kb21haW4vdHlwZXMudHMiXSwibmFtZXMiOlsiR3VpbGQiLCJjaGFubmVsIiwiZGVmYXVsdENoYW5uZWwiLCJHdWlsZE1vZGVsIiwiTWVzc2FnZSIsIk1lc3NhZ2VNb2RlbCIsIlVzZXIiLCJVc2VyTW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBR1NDLE8sRUFBUztBQUN2QixXQUFLQyxjQUFMLEdBQXNCRCxPQUF0QjtBQUNIOzs7O0VBTHNCRSxjOzs7O0lBUWRDLE87Ozs7Ozs7Ozs7OztFQUFnQkMsZ0I7Ozs7SUFJaEJDLEk7Ozs7Ozs7Ozs7OztFQUFhQyxhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dENoYW5uZWwgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgR3VpbGRNb2RlbCBmcm9tIFwibW9kZWxzL2d1aWxkXCI7XHJcbmltcG9ydCBNZXNzYWdlTW9kZWwgZnJvbSBcIm1vZGVscy9tZXNzYWdlXCI7XHJcbmltcG9ydCBVc2VyTW9kZWwgZnJvbSBcIm1vZGVscy91c2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR3VpbGQgZXh0ZW5kcyBHdWlsZE1vZGVsIHtcclxuICAgIGRlZmF1bHRDaGFubmVsOiBUZXh0Q2hhbm5lbDtcclxuXHJcbiAgICBzZXREZWZhdWx0Q2hhbm5lbChjaGFubmVsKSB7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0Q2hhbm5lbCA9IGNoYW5uZWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlIGV4dGVuZHMgTWVzc2FnZU1vZGVsIHtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyIGV4dGVuZHMgVXNlck1vZGVsIHtcclxuICAgIFxyXG59Il19