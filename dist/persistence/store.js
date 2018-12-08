"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _logger = _interopRequireDefault(require("logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MONGO_STRING = process.env.MONGO_STRING;

var Store = function Store() {
  _classCallCheck(this, Store);
};

_defineProperty(Store, "connection", null);

_defineProperty(Store, "connect", function () {
  var mongoose = new _mongoose.Mongoose();
  return new Promise(function (resolve) {
    mongoose.set("useCreateIndex", true);
    mongoose.connect(MONGO_STRING);
    mongoose.connection.on("error", function (error) {
      _logger.default.error(error);

      _logger.default.log("Couldn't connect to MongoDB");
    });
    mongoose.connection.on("connected", function (asd) {
      console.log(asd);

      _logger.default.log("Mongo connection was established");

      resolve();
    });
  });
});

_defineProperty(Store, "guilds", new Map());

_defineProperty(Store, "messages", new Map());

var _default = Store;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wZXJzaXN0ZW5jZS9zdG9yZS50cyJdLCJuYW1lcyI6WyJNT05HT19TVFJJTkciLCJwcm9jZXNzIiwiZW52IiwiU3RvcmUiLCJtb25nb29zZSIsIk1vbmdvb3NlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXQiLCJjb25uZWN0IiwiY29ubmVjdGlvbiIsIm9uIiwiZXJyb3IiLCJMb2dnZXIiLCJsb2ciLCJhc2QiLCJjb25zb2xlIiwiTWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0lBSVFBLFksR0FBaUJDLE9BQU8sQ0FBQ0MsRyxDQUF6QkYsWTs7SUFFRkcsSzs7OztnQkFBQUEsSyxnQkFDa0IsSTs7Z0JBRGxCQSxLLGFBR2UsWUFBTTtBQUNuQixNQUFNQyxRQUFRLEdBQUcsSUFBSUMsa0JBQUosRUFBakI7QUFDQSxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQWE7QUFDNUJILElBQUFBLFFBQVEsQ0FBQ0ksR0FBVCxDQUFhLGdCQUFiLEVBQStCLElBQS9CO0FBQ0FKLElBQUFBLFFBQVEsQ0FBQ0ssT0FBVCxDQUFpQlQsWUFBakI7QUFFQUksSUFBQUEsUUFBUSxDQUFDTSxVQUFULENBQW9CQyxFQUFwQixDQUF1QixPQUF2QixFQUFnQyxVQUFDQyxLQUFELEVBQVc7QUFDdkNDLHNCQUFPRCxLQUFQLENBQWFBLEtBQWI7O0FBQ0FDLHNCQUFPQyxHQUFQLENBQVcsNkJBQVg7QUFDSCxLQUhEO0FBS0FWLElBQUFBLFFBQVEsQ0FBQ00sVUFBVCxDQUFvQkMsRUFBcEIsQ0FBdUIsV0FBdkIsRUFBb0MsVUFBQ0ksR0FBRCxFQUFTO0FBQ3pDQyxNQUFBQSxPQUFPLENBQUNGLEdBQVIsQ0FBWUMsR0FBWjs7QUFDQUYsc0JBQU9DLEdBQVAsQ0FBVyxrQ0FBWDs7QUFDQVAsTUFBQUEsT0FBTztBQUNWLEtBSkQ7QUFLSCxHQWRNLENBQVA7QUFlSCxDOztnQkFwQkNKLEssWUFzQmMsSUFBSWMsR0FBSixFOztnQkF0QmRkLEssY0F3QmdCLElBQUljLEdBQUosRTs7ZUFHUGQsSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvb3NlIH0gZnJvbSBcIm1vbmdvb3NlXCI7XHJcbmltcG9ydCBMb2dnZXIgZnJvbSBcImxvZ2dlclwiO1xyXG5pbXBvcnQgeyBHdWlsZCwgTWVzc2FnZSB9IGZyb20gXCJkb21haW4vdHlwZXNcIjtcclxuXHJcblxyXG5jb25zdCB7IE1PTkdPX1NUUklORyB9ID0gcHJvY2Vzcy5lbnZcclxuXHJcbmNsYXNzIFN0b3JlIHtcclxuICAgIHN0YXRpYyBjb25uZWN0aW9uID0gbnVsbDtcclxuICAgIFxyXG4gICAgc3RhdGljIGNvbm5lY3QgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbW9uZ29vc2UgPSBuZXcgTW9uZ29vc2UoKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgbW9uZ29vc2Uuc2V0KFwidXNlQ3JlYXRlSW5kZXhcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIG1vbmdvb3NlLmNvbm5lY3QoTU9OR09fU1RSSU5HKTtcclxuICAgIFxyXG4gICAgICAgICAgICBtb25nb29zZS5jb25uZWN0aW9uLm9uKFwiZXJyb3JcIiwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIkNvdWxkbid0IGNvbm5lY3QgdG8gTW9uZ29EQlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgbW9uZ29vc2UuY29ubmVjdGlvbi5vbihcImNvbm5lY3RlZFwiLCAoYXNkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhc2QpO1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIk1vbmdvIGNvbm5lY3Rpb24gd2FzIGVzdGFibGlzaGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGd1aWxkcyA9IG5ldyBNYXA8c3RyaW5nLCBHdWlsZD4oKTtcclxuICAgIFxyXG4gICAgc3RhdGljIG1lc3NhZ2VzID0gbmV3IE1hcDxzdHJpbmcsIFtNZXNzYWdlXT4oKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RvcmU7Il19