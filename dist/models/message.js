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

var _default = mongoose.model("Message", messageSchema);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvbWVzc2FnZS50cyJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlN0b3JlIiwiaW5zdGFuY2UiLCJTY2hlbWEiLCJPYmplY3RJZCIsIlR5cGVzIiwibWVzc2FnZVNjaGVtYSIsImNvbnRlbnQiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJhdXRob3IiLCJyZWYiLCJ0aW1lIiwiRGF0ZSIsImRlZmF1bHQiLCJ0aW1lc3RhbXBzIiwibW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQTs7OztJQUVRQSxRLEdBQWFDLGVBQU1DLFEsQ0FBbkJGLFE7SUFDQUcsTSxHQUFnQ0gsUSxDQUFoQ0csTTtJQUFpQkMsUSxHQUFlSixRLENBQXhCSyxLLENBQVNELFE7QUFVekIsSUFBTUUsYUFBYSxHQUFHLElBQUlILE1BQUosQ0FBVztBQUM3QkksRUFBQUEsT0FBTyxFQUFFO0FBQUVDLElBQUFBLElBQUksRUFBRUMsTUFBUjtBQUFnQkMsSUFBQUEsUUFBUSxFQUFFO0FBQTFCLEdBRG9CO0FBRTdCQyxFQUFBQSxNQUFNLEVBQUU7QUFBRUgsSUFBQUEsSUFBSSxFQUFFSixRQUFSO0FBQWtCUSxJQUFBQSxHQUFHLEVBQUUsTUFBdkI7QUFBK0JGLElBQUFBLFFBQVEsRUFBRTtBQUF6QyxHQUZxQjtBQUc3QkcsRUFBQUEsSUFBSSxFQUFFO0FBQUVMLElBQUFBLElBQUksRUFBRU0sSUFBUjtBQUFjQyxJQUFBQSxPQUFPLEVBQUU7QUFBdkI7QUFIdUIsQ0FBWCxFQUluQjtBQUFFQyxFQUFBQSxVQUFVLEVBQUU7QUFBZCxDQUptQixDQUF0Qjs7ZUFNZWhCLFFBQVEsQ0FBQ2lCLEtBQVQsQ0FBeUIsU0FBekIsRUFBb0NYLGFBQXBDLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEb2N1bWVudCB9IGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuaW1wb3J0IHsgSVVzZXIgfSBmcm9tIFwibW9kZWxzL3VzZXJcIjtcclxuaW1wb3J0IFN0b3JlIGZyb20gXCJwZXJzaXN0ZW5jZS9zdG9yZVwiO1xyXG5cclxuY29uc3QgeyBtb25nb29zZSB9ID0gU3RvcmUuaW5zdGFuY2U7XHJcbmNvbnN0IHsgU2NoZW1hLCBUeXBlczogeyBPYmplY3RJZCB9IH0gPSBtb25nb29zZTtcclxuXHJcbmludGVyZmFjZSBJTWVzc2FnZSBleHRlbmRzIERvY3VtZW50IHtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIGF1dGhvcjogSVVzZXI7XHJcbiAgICB0aW1lOiBEYXRlO1xyXG4gICAgY3JlYXRlZEF0OiBEYXRlO1xyXG4gICAgbW9kaWZpZWRBdDogRGF0ZTtcclxufVxyXG5cclxuY29uc3QgbWVzc2FnZVNjaGVtYSA9IG5ldyBTY2hlbWEoe1xyXG4gICAgY29udGVudDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICBhdXRob3I6IHsgdHlwZTogT2JqZWN0SWQsIHJlZjogXCJVc2VyXCIsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICB0aW1lOiB7IHR5cGU6IERhdGUsIGRlZmF1bHQ6IDAgfSxcclxufSwgeyB0aW1lc3RhbXBzOiB0cnVlIH0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWw8SU1lc3NhZ2U+KFwiTWVzc2FnZVwiLCBtZXNzYWdlU2NoZW1hKTsiXX0=