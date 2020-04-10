import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import DellAnalyzer from './dellAnalyzer';

const router = Router();

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}
// 增加登录密码功能
router.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method="post" action="/getData">
          <input type="password" name="password"/>
          <button>提交</button>
        </form>
      </body>
    </html>
  `);
  // res.send('Hello World!');
});

// 增加验证功能
router.post('/getData', (req: RequestWithBody, res: Response) => {
  const { password } = req.body;
  if (password === '123') {
    const secret = 'x3b174jsx';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = DellAnalyzer.getInstance();
    new Crowller(url, analyzer);
    res.send('Get Data Success!');
  } else {
    res.send(`${req.teacher} password error`);
  }
});

export default router;
