"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(require("persistence/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = _store.default.instance.mongoose;
var Schema = mongoose.Schema;
var userSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  server: {
    type: String,
    required: true
  },
  isBot: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 0
  },
  pointsWeekly: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});
userSchema.index({
  id: 1,
  server: 1
}, {
  unique: true
});

var _default = mongoose.model("User", userSchema);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdXNlci50cyJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlN0b3JlIiwiaW5zdGFuY2UiLCJTY2hlbWEiLCJ1c2VyU2NoZW1hIiwiaWQiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ1c2VybmFtZSIsInNlcnZlciIsImlzQm90IiwiQm9vbGVhbiIsImRlZmF1bHQiLCJwb2ludHMiLCJOdW1iZXIiLCJwb2ludHNXZWVrbHkiLCJ0aW1lc3RhbXBzIiwiaW5kZXgiLCJ1bmlxdWUiLCJtb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7O0lBRVFBLFEsR0FBYUMsZUFBTUMsUSxDQUFuQkYsUTtJQUNBRyxNLEdBQVdILFEsQ0FBWEcsTTtBQVlSLElBQU1DLFVBQVUsR0FBRyxJQUFJRCxNQUFKLENBQVc7QUFDMUJFLEVBQUFBLEVBQUUsRUFBRTtBQUFDQyxJQUFBQSxJQUFJLEVBQUVDLE1BQVA7QUFBZUMsSUFBQUEsUUFBUSxFQUFFO0FBQXpCLEdBRHNCO0FBRTFCQyxFQUFBQSxRQUFRLEVBQUU7QUFBQ0gsSUFBQUEsSUFBSSxFQUFFQyxNQUFQO0FBQWVDLElBQUFBLFFBQVEsRUFBRTtBQUF6QixHQUZnQjtBQUcxQkUsRUFBQUEsTUFBTSxFQUFFO0FBQUNKLElBQUFBLElBQUksRUFBRUMsTUFBUDtBQUFlQyxJQUFBQSxRQUFRLEVBQUU7QUFBekIsR0FIa0I7QUFJMUJHLEVBQUFBLEtBQUssRUFBRTtBQUFDTCxJQUFBQSxJQUFJLEVBQUVNLE9BQVA7QUFBZ0JDLElBQUFBLE9BQU8sRUFBRTtBQUF6QixHQUptQjtBQUsxQkMsRUFBQUEsTUFBTSxFQUFFO0FBQUNSLElBQUFBLElBQUksRUFBRVMsTUFBUDtBQUFlRixJQUFBQSxPQUFPLEVBQUU7QUFBeEIsR0FMa0I7QUFNMUJHLEVBQUFBLFlBQVksRUFBRTtBQUFDVixJQUFBQSxJQUFJLEVBQUVTLE1BQVA7QUFBZUYsSUFBQUEsT0FBTyxFQUFFO0FBQXhCO0FBTlksQ0FBWCxFQU9oQjtBQUFDSSxFQUFBQSxVQUFVLEVBQUU7QUFBYixDQVBnQixDQUFuQjtBQVNBYixVQUFVLENBQUNjLEtBQVgsQ0FBaUI7QUFBQ2IsRUFBQUEsRUFBRSxFQUFFLENBQUw7QUFBUUssRUFBQUEsTUFBTSxFQUFFO0FBQWhCLENBQWpCLEVBQXFDO0FBQUNTLEVBQUFBLE1BQU0sRUFBRTtBQUFULENBQXJDOztlQUVlbkIsUUFBUSxDQUFDb0IsS0FBVCxDQUFzQixNQUF0QixFQUE4QmhCLFVBQTlCLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEb2N1bWVudCwgTW9kZWwgfSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbmltcG9ydCBTdG9yZSBmcm9tIFwicGVyc2lzdGVuY2Uvc3RvcmVcIjtcclxuXHJcbmNvbnN0IHsgbW9uZ29vc2UgfSA9IFN0b3JlLmluc3RhbmNlO1xyXG5jb25zdCB7IFNjaGVtYSB9ID0gbW9uZ29vc2U7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElVc2VyIGV4dGVuZHMgRG9jdW1lbnQge1xyXG4gICAgdXNlcm5hbWU6IHN0cmluZztcclxuICAgIHNlcnZlcjogc3RyaW5nO1xyXG4gICAgcG9pbnRzOiBudW1iZXI7XHJcbiAgICBwb2ludHNXZWVrbHk6IG51bWJlcjtcclxuICAgIGNyZWF0ZWRBdDogRGF0ZTtcclxuICAgIG1vZGlmaWVkQXQ6IERhdGU7XHJcbiAgICBpc0JvdDogYm9vbGVhbjtcclxufVxyXG5cclxuY29uc3QgdXNlclNjaGVtYSA9IG5ldyBTY2hlbWEoe1xyXG4gICAgaWQ6IHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcclxuICAgIHVzZXJuYW1lOiB7dHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZX0sXHJcbiAgICBzZXJ2ZXI6IHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcclxuICAgIGlzQm90OiB7dHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2V9LFxyXG4gICAgcG9pbnRzOiB7dHlwZTogTnVtYmVyLCBkZWZhdWx0OiAwfSxcclxuICAgIHBvaW50c1dlZWtseToge3R5cGU6IE51bWJlciwgZGVmYXVsdDogMH0sXHJcbn0sIHt0aW1lc3RhbXBzOiB0cnVlfSk7XHJcblxyXG51c2VyU2NoZW1hLmluZGV4KHtpZDogMSwgc2VydmVyOiAxfSwge3VuaXF1ZTogdHJ1ZX0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWw8SVVzZXI+KFwiVXNlclwiLCB1c2VyU2NoZW1hKTsiXX0=