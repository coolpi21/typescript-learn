import fs from 'fs';
import cheerio from 'cheerio';
import Analyzer from './crowller';

interface Course {
  title: string;
  amount: number;
}
interface courseInfo {
  time: number;
  data: Course[];
}

interface courseResult {
  [propName: number]: Course[];
}

export default class DellAnalyzer implements Analyzer {
  private static instance: DellAnalyzer;

  static getInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance;
  }

  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const descCourseItems = $('.course-item');
    const courseInfos: Course[] = [];
    descCourseItems.map((index, elem) => {
      const title = $(elem).find('.course-desc').eq(0).text();
      const amount = parseInt(
        $(elem).find('.course-desc').eq(1).text().split('：')[1]
      );
      courseInfos.push({ title, amount });
    });
    const result = {
      time: new Date().getTime(),
      data: courseInfos,
    };
    return result;
  }

  private generatorSpiderFile(info: courseInfo, path: string) {
    // 定义路径
    // 定义文件内容
    let fileContent: courseResult = {};
    // 如果文件内容存在
    if (fs.existsSync(path)) {
      fileContent = JSON.parse(fs.readFileSync(path, 'utf-8'));
    }
    fileContent[info.time] = info.data;
    return fileContent;
  }

  analyze(result: string, path: string) {
    const courseInfo = this.getCourseInfo(result);
    const content = this.generatorSpiderFile(courseInfo, path);
    return JSON.stringify(content);
  }

  private constructor() {}
}
