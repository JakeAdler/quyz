"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var LogCache = /** @class */ (function () {
    function LogCache() {
        this.padding = "";
        this.logQueue = [];
    }
    return LogCache;
}());
var cache = new LogCache();
var Logger = /** @class */ (function () {
    function Logger(configuration) {
        var _this = this;
        this.addPadding = function () {
            _this.padding += "  ";
            cache.padding = _this.padding;
        };
        this.subtractPadding = function () {
            if (_this.padding.length === 2) {
                _this.padding = "";
            }
            else {
                _this.padding = _this.padding.slice(0, _this.padding.length - 2);
            }
            cache.padding = _this.padding;
        };
        this.flushPadding = function () {
            _this.padding = "";
            cache.padding = _this.padding;
        };
        this.logQueue = [];
        this.dumpLogs = function () {
            for (var _i = 0, _a = _this.logQueue; _i < _a.length; _i++) {
                var logs = _a[_i];
                _this.logFn.apply(_this, logs);
            }
        };
        this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.volume === 3) {
                var paddedArg = args[0], rest = args.slice(1);
                _this.logQueue.push(__spreadArrays(["" + _this.padding + paddedArg], rest));
            }
            if (_this.volume <= 2) {
                _this.logQueue.push(args);
            }
            cache.logQueue = _this.logQueue;
        };
        this.pass = function (title, runtime, force) {
            if (_this.volume >= 3 || force) {
                _this.log(_this.colors.green("PASSED: "), title, _this.colors.green("(" + runtime + "ms)"));
            }
        };
        this.fail = function (title, runtime, force) {
            if (_this.volume >= 3 || force) {
                _this.log(_this.colors.red("FAILED: "), title, _this.colors.red("(" + runtime + "ms)"));
            }
        };
        this.logGroupTitle = function (title) {
            if (_this.volume >= 3) {
                _this.log(_this.colors.bold(_this.colors.underline(title)));
            }
        };
        this.logTestFileName = function (fileName) {
            if (_this.volume >= 3) {
                var shortPath = fileName.replace(process.cwd(), "");
                _this.logFn(_this.colors.bold(_this.colors.underline(shortPath)));
            }
        };
        var colors = configuration.colors, volume = configuration.volume;
        this.padding = cache.padding;
        this.logQueue = cache.logQueue;
        this.logFn = console.log;
        this.volume = volume;
        this.colors = utils_1.createColors(colors);
    }
    return Logger;
}());
exports.default = Logger;
//# sourceMappingURL=logger.js.map