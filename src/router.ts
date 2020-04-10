import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import DellAnalyzer from './dellAnalyzer';
import fs from 'fs';
import path from 'path';

const router = Router();

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
    res.send('已经登入');
  } else {
    if (req.body.password === '123' && req.session) {
      req.session.isLogin = true;
      // res.send('登入成功')
      // 实现跳转页面
      res.redirect('/');
    } else {
      res.send('登入失败');
    }
  }
});

// 增加登出页面
router.get('/loginout', (req: RequestWithBody, res: Response) => {
  if (req.session) {
    req.session.isLogin = undefined;
  }
  res.redirect('/');
});

// 增加验证功能
router.get('/getData', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.isLogin : undefined;

  if (isLogin) {
    const secret = 'x3b174jsx';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = DellAnalyzer.getInstance();
    new Crowller(url, analyzer);
    res.send('Get Data Success!');
  } else {
    res.send('请先登入');
  }
});

// 展示数据
router.get('/showData', (req: RequestWithBody, res: Response) => {
  // 使用 try catch 捕获异常

  const isLogin = req.session ? req.session.isLogin : undefined;

  if (isLogin) {
    try {
      const filePath = path.resolve(__dirname, '../data/course.json');
      const result = fs.readFileSync(filePath, 'utf8');
      res.json(JSON.parse(result));
    } catch (e) {
      res.send('没有数据');
    }
  } else {
    res.send('请先登入');
  }
});

export default router;
