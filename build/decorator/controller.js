"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("../router"));
function controller(root) {
    return function (target) {
        for (var key in target.prototype) {
            // 获取路径名
            var path = Reflect.getMetadata('path', target.prototype, key);
            // 获取请求方法
            var method = Reflect.getMetadata('method', target.prototype, key);
            // 获取类中的属性方法
            var handler = target.prototype[key];
            // 获取中间件
            var middleware = Reflect.getMetadata('middleware', target.prototype, key);
            if (path && method) {
                var fullPATH = root !== '/' ? "" + root + path : path;
                // 执行路由
                if (middleware) {
                    router_1.default[method](fullPATH, middleware, handler);
                }
                else {
                    router_1.default[method](fullPATH, handler);
                }
            }
        }
    };
}
exports.controller = controller;
