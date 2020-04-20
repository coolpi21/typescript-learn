import Router from 'express';

export const router = Router();
export function controller(target: any) {
  for (let key in target.prototype) {
    // 获取路径名
    const path = Reflect.getMetadata('path', target.prototype, key);
    // 获取类中的属性方法
    const handler = target.prototype[key];
    if (path) {
      // 执行路由
      router.get(path, handler);
    }
  }
}

export function get(path: string) {
  return function (target: any, key: string) {
    Reflect.defineMetadata('path', path, target, key);
  };
}
