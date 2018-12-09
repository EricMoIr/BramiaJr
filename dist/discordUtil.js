"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParams = void 0;

var getParams = function getParams(message) {
  return message.content.split(" ").filter(function (param, i) {
    return i > 0 && param !== "";
  });
};

exports.getParams = getParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaXNjb3JkVXRpbC50cyJdLCJuYW1lcyI6WyJnZXRQYXJhbXMiLCJtZXNzYWdlIiwiY29udGVudCIsInNwbGl0IiwiZmlsdGVyIiwicGFyYW0iLCJpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQU8sSUFBTUEsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ0MsT0FBRCxFQUFhO0FBQ2xDLFNBQU9BLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQkMsS0FBaEIsQ0FBc0IsR0FBdEIsRUFBMkJDLE1BQTNCLENBQWtDLFVBQUNDLEtBQUQsRUFBUUMsQ0FBUixFQUFjO0FBQ25ELFdBQU9BLENBQUMsR0FBRyxDQUFKLElBQVNELEtBQUssS0FBSyxFQUExQjtBQUNILEdBRk0sQ0FBUDtBQUdILENBSk0iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0UGFyYW1zID0gKG1lc3NhZ2UpID0+IHtcclxuICAgIHJldHVybiBtZXNzYWdlLmNvbnRlbnQuc3BsaXQoXCIgXCIpLmZpbHRlcigocGFyYW0sIGkpID0+IHtcclxuICAgICAgICByZXR1cm4gaSA+IDAgJiYgcGFyYW0gIT09IFwiXCI7XHJcbiAgICB9KTtcclxufTtcclxuIl19