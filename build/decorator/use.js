"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function use(middleware) {
    return function (target, key) {
        // 添加多个中间件
        var originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddlewares.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
    };
}
exports.use = use;
