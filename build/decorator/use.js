"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function use(middleware) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
}
exports.use = use;
