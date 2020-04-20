"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
exports.router = express_1.default();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
function controller(target) {
    for (var key in target.prototype) {
        // 获取路径名
        var path = Reflect.getMetadata('path', target.prototype, key);
        // 获取请求方法
        var method = Reflect.getMetadata('method', target.prototype, key);
        // 获取类中的属性方法
        var handler = target.prototype[key];
        if (path && method && handler) {
            // 执行路由
            exports.router[method](path, handler);
        }
    }
}
exports.controller = controller;
function exceedHttpDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
exports.get = exceedHttpDecorator('get');
exports.post = exceedHttpDecorator('post');
