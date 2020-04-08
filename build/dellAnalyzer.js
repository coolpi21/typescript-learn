"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var DellAnalyzer = /** @class */ (function () {
    function DellAnalyzer() {
    }
    DellAnalyzer.getInstance = function () {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    };
    DellAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var descCourseItems = $('.course-item');
        var courseInfos = [];
        descCourseItems.map(function (index, elem) {
            var title = $(elem).find('.course-desc').eq(0).text();
            var amount = parseInt($(elem).find('.course-desc').eq(1).text().split('：')[1]);
            courseInfos.push({ title: title, amount: amount });
        });
        var result = {
            time: new Date().getTime(),
            data: courseInfos,
        };
        return result;
    };
    DellAnalyzer.prototype.generatorSpiderFile = function (info, path) {
        // 定义路径
        // 定义文件内容
        var fileContent = {};
        // 如果文件内容存在
        if (fs_1.default.existsSync(path)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(path, 'utf-8'));
        }
        fileContent[info.time] = info.data;
        return fileContent;
    };
    DellAnalyzer.prototype.analyze = function (result, path) {
        var courseInfo = this.getCourseInfo(result);
        var content = this.generatorSpiderFile(courseInfo, path);
        return JSON.stringify(content);
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;
