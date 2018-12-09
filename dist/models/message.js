"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(require("persistence/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = _store.default.instance.mongoose;
var Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId;
var messageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  time: {
    type: Date,
    default: 0
  }
}, {
  timestamps: true
});

var _default = mongoose.model("Message", messageSchema); // <IMessageModel>


exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvbWVzc2FnZS50cyJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlN0b3JlIiwiaW5zdGFuY2UiLCJTY2hlbWEiLCJPYmplY3RJZCIsIlR5cGVzIiwibWVzc2FnZVNjaGVtYSIsImNvbnRlbnQiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJhdXRob3IiLCJyZWYiLCJ0aW1lIiwiRGF0ZSIsImRlZmF1bHQiLCJ0aW1lc3RhbXBzIiwibW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7OztJQUdRQSxRLEdBQWFDLGVBQU1DLFEsQ0FBbkJGLFE7SUFDQUcsTSxHQUFnQ0gsUSxDQUFoQ0csTTtJQUFpQkMsUSxHQUFlSixRLENBQXhCSyxLLENBQVNELFE7QUFTekIsSUFBTUUsYUFBYSxHQUFHLElBQUlILE1BQUosQ0FBVztBQUM3QkksRUFBQUEsT0FBTyxFQUFFO0FBQUVDLElBQUFBLElBQUksRUFBRUMsTUFBUjtBQUFnQkMsSUFBQUEsUUFBUSxFQUFFO0FBQTFCLEdBRG9CO0FBRTdCQyxFQUFBQSxNQUFNLEVBQUU7QUFBRUgsSUFBQUEsSUFBSSxFQUFFSixRQUFSO0FBQWtCUSxJQUFBQSxHQUFHLEVBQUUsTUFBdkI7QUFBK0JGLElBQUFBLFFBQVEsRUFBRTtBQUF6QyxHQUZxQjtBQUc3QkcsRUFBQUEsSUFBSSxFQUFFO0FBQUVMLElBQUFBLElBQUksRUFBRU0sSUFBUjtBQUFjQyxJQUFBQSxPQUFPLEVBQUU7QUFBdkI7QUFIdUIsQ0FBWCxFQUluQjtBQUFFQyxFQUFBQSxVQUFVLEVBQUU7QUFBZCxDQUptQixDQUF0Qjs7ZUFNZWhCLFFBQVEsQ0FBQ2lCLEtBQVQsQ0FBZSxTQUFmLEVBQTBCWCxhQUExQixDLEVBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRG9jdW1lbnQgfSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbmltcG9ydCBTdG9yZSBmcm9tIFwicGVyc2lzdGVuY2Uvc3RvcmVcIjtcclxuaW1wb3J0IHsgSVVzZXJNb2RlbCB9IGZyb20gXCJtb2RlbHMvdXNlclwiO1xyXG5cclxuY29uc3QgeyBtb25nb29zZSB9ID0gU3RvcmUuaW5zdGFuY2U7XHJcbmNvbnN0IHsgU2NoZW1hLCBUeXBlczogeyBPYmplY3RJZCB9IH0gPSBtb25nb29zZTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1lc3NhZ2VNb2RlbCBleHRlbmRzIERvY3VtZW50IHtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIGF1dGhvcjogSVVzZXJNb2RlbCB8IHN0cmluZztcclxuICAgIGNyZWF0ZWRBdDogRGF0ZTtcclxuICAgIG1vZGlmaWVkQXQ6IERhdGU7XHJcbn1cclxuXHJcbmNvbnN0IG1lc3NhZ2VTY2hlbWEgPSBuZXcgU2NoZW1hKHtcclxuICAgIGNvbnRlbnQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgYXV0aG9yOiB7IHR5cGU6IE9iamVjdElkLCByZWY6IFwiVXNlclwiLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgdGltZTogeyB0eXBlOiBEYXRlLCBkZWZhdWx0OiAwIH0sXHJcbn0sIHsgdGltZXN0YW1wczogdHJ1ZSB9KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVsKFwiTWVzc2FnZVwiLCBtZXNzYWdlU2NoZW1hKTsgLy8gPElNZXNzYWdlTW9kZWw+Il19