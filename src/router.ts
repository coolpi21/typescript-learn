import fs from 'fs';
import path from 'path';
import { Router, Request, Response, NextFunction } from 'express';
import Crowller from './utils/crowller';
import DellAnalyzer from './utils/dellAnalyzer';
import { getReponseInfo } from './utils/util';

const router = Router();

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.isLogin : false;
  if (isLogin) {
    next();
  } else {
    res.json(getReponseInfo(null, '请先登入'));
  }
};
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}
// 增加登录密码功能
router.get('/', (req: Request, res: Response) => {
  // 判断是否登录
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
});

// 增加登录路由
router.post('/login', (req: Request, res: Response) => {
  // 判断是否登入
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
});

// 增加登出页面
router.get('/loginout', (req: RequestWithBody, res: Response) => {
  if (req.session) {
    req.session.isLogin = undefined;
  }
  res.json(getReponseInfo(null));
});

// 增加验证功能
router.get('/getData', checkLogin, (req: RequestWithBody, res: Response) => {
  const secret = 'x3b174jsx';
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  const analyzer = DellAnalyzer.getInstance();
  new Crowller(url, analyzer);
  res.json(getReponseInfo(null));
});

// 展示数据
router.get('/showData', checkLogin, (req: RequestWithBody, res: Response) => {
  // 使用 try catch 捕获异常
  try {
    const filePath = path.resolve(__dirname, '../data/course.json');
    const result = fs.readFileSync(filePath, 'utf8');
    res.json(getReponseInfo(JSON.parse(result)));
  } catch (e) {
    res.json(getReponseInfo(null, '没有数据'));
  }
});

export default router;
