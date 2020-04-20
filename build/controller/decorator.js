"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
exports.router = express_1.default();
function controller(target) {
    for (var key in target.prototype) {
        // 获取路径名
        var path = Reflect.getMetadata('path', target.prototype, key);
        // 获取类中的属性方法
        var handler = target.prototype[key];
        if (path) {
            // 执行路由
            exports.router.get(path, handler);
        }
    }
}
exports.controller = controller;
function get(path) {
    return function (target, key) {
        Reflect.defineMetadata('path', path, target, key);
    };
}
exports.get = get;
