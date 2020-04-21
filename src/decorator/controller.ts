import router from '../router';
import { Methods } from './request';
import { LoginController, CrowllerController } from '../controller';
import { RequestHandler } from 'express';

export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      // 获取路径名
      const path: string = Reflect.getMetadata('path', target.prototype, key);

      // 获取请求方法
      const method: Methods = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      );
      // 获取类中的属性方法
      const handler = target.prototype[key];
      // 获取中间件
      const middlewares: RequestHandler[] = Reflect.getMetadata(
        'middlewares',
        target.prototype,
        key
      );
      if (path && method) {
        const fullPATH = root !== '/' ? `${root}${path}` : path;
        // 执行路由
        if (middlewares && middlewares.length) {
          router[method](fullPATH, ...middlewares, handler);
        } else {
          router[method](fullPATH, handler);
        }
      }
    }
  };
}
