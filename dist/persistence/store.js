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
  var _this = this;

  _classCallCheck(this, Store);

  _defineProperty(this, "mongoose", new _mongoose.Mongoose());

  _defineProperty(this, "guilds", new Map());

  _defineProperty(this, "messages", new Map());

  _defineProperty(this, "connect", function () {
    return new Promise(function (resolve) {
      _this.mongoose.set("useCreateIndex", true);

      _this.mongoose.connect(MONGO_STRING);

      _this.mongoose.connection.on("error", function (error) {
        _logger.default.error(error);

        _logger.default.log("Couldn't connect to MongoDB");
      });

      _this.mongoose.connection.on("connected", function () {
        _logger.default.log("Mongo connection was established");

        resolve();
      });
    });
  });
};

_defineProperty(Store, "instance", new Store());

var _default = Store;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wZXJzaXN0ZW5jZS9zdG9yZS50cyJdLCJuYW1lcyI6WyJNT05HT19TVFJJTkciLCJwcm9jZXNzIiwiZW52IiwiU3RvcmUiLCJNb25nb29zZSIsIk1hcCIsIlByb21pc2UiLCJyZXNvbHZlIiwibW9uZ29vc2UiLCJzZXQiLCJjb25uZWN0IiwiY29ubmVjdGlvbiIsIm9uIiwiZXJyb3IiLCJMb2dnZXIiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7SUFHUUEsWSxHQUFpQkMsT0FBTyxDQUFDQyxHLENBQXpCRixZOztJQUVGRyxLOzs7OztvQ0FFUyxJQUFJQyxrQkFBSixFOztrQ0FDRixJQUFJQyxHQUFKLEU7O29DQUNFLElBQUlBLEdBQUosRTs7bUNBUUQsWUFBTTtBQUNaLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBYTtBQUM1QixNQUFBLEtBQUksQ0FBQ0MsUUFBTCxDQUFjQyxHQUFkLENBQWtCLGdCQUFsQixFQUFvQyxJQUFwQzs7QUFDQSxNQUFBLEtBQUksQ0FBQ0QsUUFBTCxDQUFjRSxPQUFkLENBQXNCVixZQUF0Qjs7QUFFQSxNQUFBLEtBQUksQ0FBQ1EsUUFBTCxDQUFjRyxVQUFkLENBQXlCQyxFQUF6QixDQUE0QixPQUE1QixFQUFxQyxVQUFDQyxLQUFELEVBQVc7QUFDNUNDLHdCQUFPRCxLQUFQLENBQWFBLEtBQWI7O0FBQ0FDLHdCQUFPQyxHQUFQLENBQVcsNkJBQVg7QUFDSCxPQUhEOztBQUtBLE1BQUEsS0FBSSxDQUFDUCxRQUFMLENBQWNHLFVBQWQsQ0FBeUJDLEVBQXpCLENBQTRCLFdBQTVCLEVBQXlDLFlBQU07QUFDM0NFLHdCQUFPQyxHQUFQLENBQVcsa0NBQVg7O0FBQ0FSLFFBQUFBLE9BQU87QUFDVixPQUhEO0FBSUgsS0FiTSxDQUFQO0FBY0gsRzs7O2dCQTNCQ0osSyxjQUNnQixJQUFJQSxLQUFKLEU7O2VBNkJQQSxLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29vc2UgfSBmcm9tIFwibW9uZ29vc2VcIjtcclxuaW1wb3J0IExvZ2dlciBmcm9tIFwibG9nZ2VyXCI7XHJcbmltcG9ydCB7IEd1aWxkLCBNZXNzYWdlIH0gZnJvbSBcImRvbWFpbi90eXBlc1wiO1xyXG5cclxuY29uc3QgeyBNT05HT19TVFJJTkcgfSA9IHByb2Nlc3MuZW52O1xyXG5cclxuY2xhc3MgU3RvcmUge1xyXG4gICAgc3RhdGljIGluc3RhbmNlID0gbmV3IFN0b3JlKCk7XHJcbiAgICBtb25nb29zZSA9IG5ldyBNb25nb29zZSgpO1xyXG4gICAgZ3VpbGRzID0gbmV3IE1hcDxzdHJpbmcsIEd1aWxkPigpOyBcclxuICAgIG1lc3NhZ2VzID0gbmV3IE1hcDxzdHJpbmcsIFtNZXNzYWdlXT4oKVxyXG5cclxuICAgIC8vIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gICAgIHRoaXMubW9uZ29vc2UgPSBuZXcgTW9uZ29vc2UoKTtcclxuICAgIC8vICAgICB0aGlzLmd1aWxkcyA9IG5ldyBNYXAoKTsgLy8gPHN0cmluZywgR3VpbGQ+XHJcbiAgICAvLyAgICAgdGhpcy5tZXNzYWdlcyA9IG5ldyBNYXAoKTsgLy8gPHN0cmluZywgW01lc3NhZ2VdPlxyXG4gICAgLy8gfVxyXG5cclxuICAgIGNvbm5lY3QgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW9uZ29vc2Uuc2V0KFwidXNlQ3JlYXRlSW5kZXhcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMubW9uZ29vc2UuY29ubmVjdChNT05HT19TVFJJTkcpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb25nb29zZS5jb25uZWN0aW9uLm9uKFwiZXJyb3JcIiwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIkNvdWxkbid0IGNvbm5lY3QgdG8gTW9uZ29EQlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vbmdvb3NlLmNvbm5lY3Rpb24ub24oXCJjb25uZWN0ZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIk1vbmdvIGNvbm5lY3Rpb24gd2FzIGVzdGFibGlzaGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0b3JlO1xyXG4iXX0=