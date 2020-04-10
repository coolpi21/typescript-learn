"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var router = express_1.Router();
// 增加登录密码功能
router.get('/', function (req, res) {
    // 判断是否登录
    var isLogin = req.session ? req.session.isLogin : undefined;
    if (isLogin) {
        res.send("\n    <html>\n      <body>\n        <a href=\"/showData\">\u5C55\u793A\u6570\u636E</a>\n        <a href=\"/getData\">\u722C\u53D6\u6570\u636E</a>\n        <a href=\"/loginout\">\u767B\u51FA</a>\n      </body>\n    </html>\n  ");
    }
    else {
        res.send("\n    <html>\n      <body>\n        <form method=\"post\" action=\"/login\">\n          <input type=\"password\" name=\"password\"/>\n          <button>\u767B\u5165</button>\n        </form>\n      </body>\n    </html>\n  ");
    }
});
// 增加登录路由
router.post('/login', function (req, res) {
    // 判断是否登入
    var isLogin = req.session ? req.session.isLogin : undefined;
    if (isLogin) {
        res.send('已经登入');
    }
    else {
        if (req.body.password === '123' && req.session) {
            req.session.isLogin = true;
            // res.send('登入成功')
            // 实现跳转页面
            res.redirect('/');
        }
        else {
            res.send('登入失败');
        }
    }
});
// 增加登出页面
router.get('/loginout', function (req, res) {
    if (req.session) {
        req.session.isLogin = undefined;
    }
    res.redirect('/');
});
// 增加验证功能
router.get('/getData', function (req, res) {
    var isLogin = req.session ? req.session.isLogin : undefined;
    if (isLogin) {
        var secret = 'x3b174jsx';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
        var analyzer = dellAnalyzer_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        res.send('Get Data Success!');
    }
    else {
        res.send('请先登入');
    }
});
// 展示数据
router.get('/showData', function (req, res) {
    // 使用 try catch 捕获异常
    var isLogin = req.session ? req.session.isLogin : undefined;
    if (isLogin) {
        try {
            var filePath = path_1.default.resolve(__dirname, '../data/course.json');
            var result = fs_1.default.readFileSync(filePath, 'utf8');
            res.json(JSON.parse(result));
        }
        catch (e) {
            res.send('没有数据');
        }
    }
    else {
        res.send('请先登入');
    }
});
exports.default = router;
