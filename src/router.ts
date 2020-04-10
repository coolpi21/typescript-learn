import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import DellAnalyzer from './dellAnalyzer';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.get('/getData', (req: Request, res: Response) => {
  const secret = 'x3b174jsx';
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  const analyzer = DellAnalyzer.getInstance();
  new Crowller(url, analyzer);
  res.send('Get Data Success!');
});

export default router;
