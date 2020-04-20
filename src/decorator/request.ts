import { CrowllerController, LoginController } from '../controller';

export enum Methods {
  get = 'get',
  post = 'post',
}

function exceedHttpDecorator(type: Methods) {
  return function (path: string) {
    return function (
      target: CrowllerController | LoginController,
      key: string
    ) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    };
  };
}

export const get = exceedHttpDecorator(Methods.get);
export const post = exceedHttpDecorator(Methods.post);
