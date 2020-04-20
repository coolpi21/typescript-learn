import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from '../decorator';
import { getReponseInfo } from '../utils/util';
import Crowller from '../utils/crowller';
import DellAnalyzer from '../utils/dellAnalyzer';

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = !!(req.session ? req.session.isLogin : false);
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

@controller('/')
export class CrowllerController {
  @get('/showData')
  @use(checkLogin)
  showData(req: RequestWithBody, res: Response): void {
    try {
      const filePath = path.resolve(__dirname, '../../data/course.json');
      const result = fs.readFileSync(filePath, 'utf8');
      res.json(getReponseInfo(JSON.parse(result)));
    } catch (e) {
      res.json(getReponseInfo(null, '没有数据'));
    }
  }

  @get('/getData')
  @use(checkLogin)
  getData(req: RequestWithBody, res: Response): void {
    const secret = 'x3b174jsx';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = DellAnalyzer.getInstance();
    new Crowller(url, analyzer);
    res.json(getReponseInfo(null));
  }
}
