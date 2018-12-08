"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.Message = exports.Guild = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Guild =
/*#__PURE__*/
function () {
  function Guild(guild) {
    _classCallCheck(this, Guild);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "defaultChannel", void 0);

    _defineProperty(this, "defaultChannelId", void 0);

    _defineProperty(this, "leftServer", void 0);

    _defineProperty(this, "createdAt", void 0);

    _defineProperty(this, "modifiedAt", void 0);

    this.name = guild.name;
    this.defaultChannelId = guild.defaultChannelId;
    this.leftServer = guild.leftServer;
    this.createdAt = guild.createdAt;
    this.modifiedAt = guild.modifiedAt;
  }

  _createClass(Guild, [{
    key: "setDefaultChannel",
    value: function setDefaultChannel(channel) {
      this.defaultChannel = channel;
    }
  }]);

  return Guild;
}();

exports.Guild = Guild;

var Message = function Message(message) {
  _classCallCheck(this, Message);

  _defineProperty(this, "content", void 0);

  _defineProperty(this, "author", void 0);

  _defineProperty(this, "createdAt", void 0);

  _defineProperty(this, "modifiedAt", void 0);

  this.content = message.content;
  this.author = message.author;
  this.createdAt = message.createdAt;
  this.modifiedAt = message.modifiedAt;
};

exports.Message = Message;

var User = function User(user) {
  _classCallCheck(this, User);

  _defineProperty(this, "username", void 0);

  _defineProperty(this, "server", void 0);

  _defineProperty(this, "points", void 0);

  _defineProperty(this, "createdAt", void 0);

  _defineProperty(this, "modifiedAt", void 0);

  this.username = user.username;
  this.server = user.server;
  this.points = user.points;
  this.createdAt = user.createdAt;
  this.modifiedAt = user.modifiedAt;
};

exports.User = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kb21haW4vdHlwZXMudHMiXSwibmFtZXMiOlsiR3VpbGQiLCJndWlsZCIsIm5hbWUiLCJkZWZhdWx0Q2hhbm5lbElkIiwibGVmdFNlcnZlciIsImNyZWF0ZWRBdCIsIm1vZGlmaWVkQXQiLCJjaGFubmVsIiwiZGVmYXVsdENoYW5uZWwiLCJNZXNzYWdlIiwibWVzc2FnZSIsImNvbnRlbnQiLCJhdXRob3IiLCJVc2VyIiwidXNlciIsInVzZXJuYW1lIiwic2VydmVyIiwicG9pbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFLYUEsSzs7O0FBT1QsaUJBQVlDLEtBQVosRUFBZ0M7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFDNUIsU0FBS0MsSUFBTCxHQUFZRCxLQUFLLENBQUNDLElBQWxCO0FBQ0EsU0FBS0MsZ0JBQUwsR0FBd0JGLEtBQUssQ0FBQ0UsZ0JBQTlCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkgsS0FBSyxDQUFDRyxVQUF4QjtBQUNBLFNBQUtDLFNBQUwsR0FBaUJKLEtBQUssQ0FBQ0ksU0FBdkI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCTCxLQUFLLENBQUNLLFVBQXhCO0FBQ0g7Ozs7c0NBQ2lCQyxPLEVBQXNCO0FBQ3BDLFdBQUtDLGNBQUwsR0FBc0JELE9BQXRCO0FBQ0g7Ozs7Ozs7O0lBR1FFLE8sR0FLVCxpQkFBWUMsT0FBWixFQUFvQztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUNoQyxPQUFLQyxPQUFMLEdBQWVELE9BQU8sQ0FBQ0MsT0FBdkI7QUFDQSxPQUFLQyxNQUFMLEdBQWNGLE9BQU8sQ0FBQ0UsTUFBdEI7QUFDQSxPQUFLUCxTQUFMLEdBQWlCSyxPQUFPLENBQUNMLFNBQXpCO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQkksT0FBTyxDQUFDSixVQUExQjtBQUNILEM7Ozs7SUFHUU8sSSxHQU1ULGNBQVlDLElBQVosRUFBOEI7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFDMUIsT0FBS0MsUUFBTCxHQUFnQkQsSUFBSSxDQUFDQyxRQUFyQjtBQUNBLE9BQUtDLE1BQUwsR0FBY0YsSUFBSSxDQUFDRSxNQUFuQjtBQUNBLE9BQUtDLE1BQUwsR0FBY0gsSUFBSSxDQUFDRyxNQUFuQjtBQUNBLE9BQUtaLFNBQUwsR0FBaUJTLElBQUksQ0FBQ1QsU0FBdEI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCUSxJQUFJLENBQUNSLFVBQXZCO0FBQ0gsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRDaGFubmVsIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuaW1wb3J0IHsgSUd1aWxkTW9kZWwgfSBmcm9tIFwibW9kZWxzL2d1aWxkXCI7XHJcbmltcG9ydCB7IElNZXNzYWdlTW9kZWwgfSBmcm9tIFwibW9kZWxzL21lc3NhZ2VcIjtcclxuaW1wb3J0IHsgSVVzZXJNb2RlbCB9IGZyb20gXCJtb2RlbHMvdXNlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEd1aWxkIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGRlZmF1bHRDaGFubmVsPzogVGV4dENoYW5uZWw7XHJcbiAgICBkZWZhdWx0Q2hhbm5lbElkOiBzdHJpbmc7XHJcbiAgICBsZWZ0U2VydmVyOiBib29sZWFuO1xyXG4gICAgY3JlYXRlZEF0OiBEYXRlO1xyXG4gICAgbW9kaWZpZWRBdDogRGF0ZTtcclxuICAgIGNvbnN0cnVjdG9yKGd1aWxkOiBJR3VpbGRNb2RlbCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IGd1aWxkLm5hbWU7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0Q2hhbm5lbElkID0gZ3VpbGQuZGVmYXVsdENoYW5uZWxJZDtcclxuICAgICAgICB0aGlzLmxlZnRTZXJ2ZXIgPSBndWlsZC5sZWZ0U2VydmVyO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlZEF0ID0gZ3VpbGQuY3JlYXRlZEF0O1xyXG4gICAgICAgIHRoaXMubW9kaWZpZWRBdCA9IGd1aWxkLm1vZGlmaWVkQXQ7XHJcbiAgICB9XHJcbiAgICBzZXREZWZhdWx0Q2hhbm5lbChjaGFubmVsOiBUZXh0Q2hhbm5lbCkge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdENoYW5uZWwgPSBjaGFubmVsO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZSB7XHJcbiAgICBjb250ZW50OiBzdHJpbmc7XHJcbiAgICBhdXRob3I6IFVzZXIgfCBzdHJpbmc7XHJcbiAgICBjcmVhdGVkQXQ6IERhdGU7XHJcbiAgICBtb2RpZmllZEF0OiBEYXRlO1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZTogSU1lc3NhZ2VNb2RlbCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IG1lc3NhZ2UuY29udGVudDtcclxuICAgICAgICB0aGlzLmF1dGhvciA9IG1lc3NhZ2UuYXV0aG9yO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlZEF0ID0gbWVzc2FnZS5jcmVhdGVkQXQ7XHJcbiAgICAgICAgdGhpcy5tb2RpZmllZEF0ID0gbWVzc2FnZS5tb2RpZmllZEF0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVXNlciB7XHJcbiAgICB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgc2VydmVyOiBzdHJpbmc7XHJcbiAgICBwb2ludHM6IGJvb2xlYW47XHJcbiAgICBjcmVhdGVkQXQ6IERhdGU7XHJcbiAgICBtb2RpZmllZEF0OiBEYXRlO1xyXG4gICAgY29uc3RydWN0b3IodXNlcjogSVVzZXJNb2RlbCkge1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VyLnVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMuc2VydmVyID0gdXNlci5zZXJ2ZXI7XHJcbiAgICAgICAgdGhpcy5wb2ludHMgPSB1c2VyLnBvaW50cztcclxuICAgICAgICB0aGlzLmNyZWF0ZWRBdCA9IHVzZXIuY3JlYXRlZEF0O1xyXG4gICAgICAgIHRoaXMubW9kaWZpZWRBdCA9IHVzZXIubW9kaWZpZWRBdDtcclxuICAgIH1cclxufSJdfQ==