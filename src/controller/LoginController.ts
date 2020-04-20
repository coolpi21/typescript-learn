import 'reflect-metadata';
import { Request, Response } from 'express';
import { get, controller } from './decorator';
import { getReponseInfo } from '../utils/util';

@controller
class LoginController {
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
