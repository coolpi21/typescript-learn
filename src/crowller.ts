import fs from 'fs';
import path from 'path';
import superagent from 'superagent';

export interface Analyzer {
  analyze: (result: string, path: string) => string;
}

class Crowller {
  private filePath = path.resolve(__dirname, '../data/course.json');

  private async getRawHtml(url: string) {
    const result = await superagent.get(url);
    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async init(url: string) {
    const result = await this.getRawHtml(url);
    const content = this.analyzer.analyze(result, this.filePath);
    this.writeFile(content);
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.init(url);
  }
}

export default Crowller;
