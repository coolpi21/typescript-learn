import 'reflect-metadata';
import { Request, Response } from 'express';
import { get, controller, post } from './decorator';
import { getReponseInfo } from '../utils/util';

@controller
class LoginController {
  @post('/login')
  login(req: Request, res: Response) {
    const isLogin = req.session ? req.session.isLogin : undefined;

    if (isLogin) {
      res.json(getReponseInfo(null, '请先登入'));
    } else {
      if (req.body.password === '123' && req.session) {
        req.session.isLogin = true;
        // res.send('登入成功')
        // 实现跳转页面
        res.json(getReponseInfo(null));
      } else {
        // res.send('登入失败');
        res.json(getReponseInfo(null, '登入失败'));
      }
    }
  }
  @get('/loginout')
  loginout(req: Request, res: Response) {
    if (req.session) {
      req.session.isLogin = undefined;
    }
    res.json(getReponseInfo(null));
  }
  @get('/')
  home(req: Request, res: Response) {
    const isLogin = req.session ? req.session.isLogin : undefined;

    if (isLogin) {
      res.send(`
      <html>
        <body>
          <a href="/showData">展示数据</a>
          <a href="/getData">爬取数据</a>
          <a href="/loginout">登出</a>
        </body>
      </html>
    `);
    } else {
      res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="password" name="password"/>
            <button>登入</button>
          </form>
        </body>
      </html>
    `);
    }
  }
}
