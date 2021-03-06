"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(require("persistence/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = _store.default.instance.mongoose;
var Schema = mongoose.Schema;
var guildSchema = new Schema({
  id: {
    type: String,
    required: true,
    index: {
      unique: true,
      dropDups: true
    }
  },
  name: {
    type: String,
    required: true
  },
  defaultChannelId: String,
  meetingChannelId: String,
  leftServer: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

var _default = mongoose.model("Guild", guildSchema); // <IGuildModel>


exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvZ3VpbGQudHMiXSwibmFtZXMiOlsibW9uZ29vc2UiLCJTdG9yZSIsImluc3RhbmNlIiwiU2NoZW1hIiwiZ3VpbGRTY2hlbWEiLCJpZCIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsImluZGV4IiwidW5pcXVlIiwiZHJvcER1cHMiLCJuYW1lIiwiZGVmYXVsdENoYW5uZWxJZCIsIm1lZXRpbmdDaGFubmVsSWQiLCJsZWZ0U2VydmVyIiwiQm9vbGVhbiIsImRlZmF1bHQiLCJ0aW1lc3RhbXBzIiwibW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7OztJQUVRQSxRLEdBQWFDLGVBQU1DLFEsQ0FBbkJGLFE7SUFDQUcsTSxHQUFXSCxRLENBQVhHLE07QUFXUixJQUFNQyxXQUFXLEdBQUcsSUFBSUQsTUFBSixDQUNsQjtBQUNFRSxFQUFBQSxFQUFFLEVBQUU7QUFDRkMsSUFBQUEsSUFBSSxFQUFFQyxNQURKO0FBRUZDLElBQUFBLFFBQVEsRUFBRSxJQUZSO0FBR0ZDLElBQUFBLEtBQUssRUFBRTtBQUFFQyxNQUFBQSxNQUFNLEVBQUUsSUFBVjtBQUFnQkMsTUFBQUEsUUFBUSxFQUFFO0FBQTFCO0FBSEwsR0FETjtBQU1FQyxFQUFBQSxJQUFJLEVBQUU7QUFBRU4sSUFBQUEsSUFBSSxFQUFFQyxNQUFSO0FBQWdCQyxJQUFBQSxRQUFRLEVBQUU7QUFBMUIsR0FOUjtBQU9FSyxFQUFBQSxnQkFBZ0IsRUFBRU4sTUFQcEI7QUFRRU8sRUFBQUEsZ0JBQWdCLEVBQUVQLE1BUnBCO0FBU0VRLEVBQUFBLFVBQVUsRUFBRTtBQUFFVCxJQUFBQSxJQUFJLEVBQUVVLE9BQVI7QUFBaUJDLElBQUFBLE9BQU8sRUFBRTtBQUExQjtBQVRkLENBRGtCLEVBWWxCO0FBQUVDLEVBQUFBLFVBQVUsRUFBRTtBQUFkLENBWmtCLENBQXBCOztlQWVlbEIsUUFBUSxDQUFDbUIsS0FBVCxDQUF1QixPQUF2QixFQUFnQ2YsV0FBaEMsQyxFQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvY3VtZW50IH0gZnJvbSBcIm1vbmdvb3NlXCI7XHJcblxyXG5pbXBvcnQgU3RvcmUgZnJvbSBcInBlcnNpc3RlbmNlL3N0b3JlXCI7XHJcblxyXG5jb25zdCB7IG1vbmdvb3NlIH0gPSBTdG9yZS5pbnN0YW5jZTtcclxuY29uc3QgeyBTY2hlbWEgfSA9IG1vbmdvb3NlO1xyXG5cclxuaW50ZXJmYWNlIElHdWlsZCBleHRlbmRzIERvY3VtZW50IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGRlZmF1bHRDaGFubmVsSWQ6IHN0cmluZztcclxuICAgIG1lZXRpbmdDaGFubmVsSWQ6IHN0cmluZztcclxuICAgIGxlZnRTZXJ2ZXI6IGJvb2xlYW47XHJcbiAgICBjcmVhdGVkQXQ6IERhdGU7XHJcbiAgICBtb2RpZmllZEF0OiBEYXRlO1xyXG59XHJcblxyXG5jb25zdCBndWlsZFNjaGVtYSA9IG5ldyBTY2hlbWEoXHJcbiAge1xyXG4gICAgaWQ6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgaW5kZXg6IHsgdW5pcXVlOiB0cnVlLCBkcm9wRHVwczogdHJ1ZSB9XHJcbiAgICB9LFxyXG4gICAgbmFtZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICBkZWZhdWx0Q2hhbm5lbElkOiBTdHJpbmcsXHJcbiAgICBtZWV0aW5nQ2hhbm5lbElkOiBTdHJpbmcsXHJcbiAgICBsZWZ0U2VydmVyOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH1cclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbDxJR3VpbGQ+KFwiR3VpbGRcIiwgZ3VpbGRTY2hlbWEpOyAvLyA8SUd1aWxkTW9kZWw+XHJcbiJdfQ==