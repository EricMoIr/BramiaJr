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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "meetingChannel", void 0);

    return _this;
  }

  _createClass(Guild, [{
    key: "setDefaultChannel",
    value: function setDefaultChannel(channel) {
      this.defaultChannel = channel;
    }
  }, {
    key: "setMeetingChannel",
    value: function setMeetingChannel(channel) {
      this.meetingChannel = channel;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kb21haW4vdHlwZXMudHMiXSwibmFtZXMiOlsiR3VpbGQiLCJjaGFubmVsIiwiZGVmYXVsdENoYW5uZWwiLCJtZWV0aW5nQ2hhbm5lbCIsIkd1aWxkTW9kZWwiLCJNZXNzYWdlIiwiTWVzc2FnZU1vZGVsIiwiVXNlciIsIlVzZXJNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRYUEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NDQUlTQyxPLEVBQXNCO0FBQ3BDLFdBQUtDLGNBQUwsR0FBc0JELE9BQXRCO0FBQ0g7OztzQ0FDaUJBLE8sRUFBdUI7QUFDckMsV0FBS0UsY0FBTCxHQUFzQkYsT0FBdEI7QUFDSDs7OztFQVRzQkcsYzs7OztJQVlkQyxPOzs7Ozs7Ozs7Ozs7RUFBZ0JDLGdCOzs7O0lBSWhCQyxJOzs7Ozs7Ozs7Ozs7RUFBYUMsYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRDaGFubmVsLCBHdWlsZENoYW5uZWwsIE1lc3NhZ2UgYXMgRGlzY29yZE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgR3VpbGRNb2RlbCBmcm9tIFwibW9kZWxzL2d1aWxkXCI7XHJcbmltcG9ydCBNZXNzYWdlTW9kZWwgZnJvbSBcIm1vZGVscy9tZXNzYWdlXCI7XHJcbmltcG9ydCBVc2VyTW9kZWwgZnJvbSBcIm1vZGVscy91c2VyXCI7XHJcblxyXG5leHBvcnQgdHlwZSBDb21tYW5kID0ge1xyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIGV4ZWN1dGU6IChtZXNzYWdlOiBEaXNjb3JkTWVzc2FnZSwgcGFyYW1zPzogc3RyaW5nW10pID0+IFByb21pc2U8YW55PixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEd1aWxkIGV4dGVuZHMgR3VpbGRNb2RlbCB7XHJcbiAgICBkZWZhdWx0Q2hhbm5lbDogVGV4dENoYW5uZWw7XHJcbiAgICBtZWV0aW5nQ2hhbm5lbDogR3VpbGRDaGFubmVsO1xyXG5cclxuICAgIHNldERlZmF1bHRDaGFubmVsKGNoYW5uZWw6IFRleHRDaGFubmVsKSB7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0Q2hhbm5lbCA9IGNoYW5uZWw7XHJcbiAgICB9XHJcbiAgICBzZXRNZWV0aW5nQ2hhbm5lbChjaGFubmVsOiBHdWlsZENoYW5uZWwpIHtcclxuICAgICAgICB0aGlzLm1lZXRpbmdDaGFubmVsID0gY2hhbm5lbDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2UgZXh0ZW5kcyBNZXNzYWdlTW9kZWwge1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXIgZXh0ZW5kcyBVc2VyTW9kZWwge1xyXG4gICAgXHJcbn0iXX0=