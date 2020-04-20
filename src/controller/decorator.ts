import Router from 'express';
import { RequestHandler } from 'express';

export const router = Router();

enum Method {
  get = 'get',
  post = 'post',
}
export function controller(target: any) {
  for (let key in target.prototype) {
    // 获取路径名
    const path = Reflect.getMetadata('path', target.prototype, key);
    // 获取请求方法
    const method: Method = Reflect.getMetadata('method', target.prototype, key);
    // 获取类中的属性方法
    const handler = target.prototype[key];
    // 获取中间件
    const middleware = Reflect.getMetadata('middleware', target.prototype, key);
    if (path && method && handler) {
      // 执行路由
      if (middleware) {
        router[method](path, middleware, handler);
      } else {
        router[method](path, handler);
      }
    }
  }
}

function exceedHttpDecorator(type: string) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    };
  };
}

export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    Reflect.defineMetadata('middleware', middleware, target, key);
  };
}

export const get = exceedHttpDecorator('get');
export const post = exceedHttpDecorator('post');
