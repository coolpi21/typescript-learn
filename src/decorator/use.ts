import { RequestHandler } from 'express';
import { CrowllerController, LoginController } from '../controller';

export function use(middleware: RequestHandler) {
  return function (target: CrowllerController | LoginController, key: string) {
    // 添加多个中间件
    const originMiddlewares =
      Reflect.getMetadata('middlewares', target, key) || [];
    originMiddlewares.push(middleware);
    Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
  };
}
