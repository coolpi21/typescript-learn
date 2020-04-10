"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var express_1 = require("express");
var crowller_1 = __importDefault(require("./utils/crowller"));
var dellAnalyzer_1 = __importDefault(require("./utils/dellAnalyzer"));
var util_1 = require("./utils/util");
var router = express_1.Router();
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.isLogin : false;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getReponseInfo(null, '请先登入'));
    }
};
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
        res.json(util_1.getReponseInfo(null, '请先登入'));
    }
    else {
        if (req.body.password === '123' && req.session) {
            req.session.isLogin = true;
            // res.send('登入成功')
            // 实现跳转页面
            res.json(util_1.getReponseInfo(null));
        }
        else {
            // res.send('登入失败');
            res.json(util_1.getReponseInfo(null, '登入失败'));
        }
    }
});
// 增加登出页面
router.get('/loginout', function (req, res) {
    if (req.session) {
        req.session.isLogin = undefined;
    }
    res.json(util_1.getReponseInfo(null));
});
// 增加验证功能
router.get('/getData', checkLogin, function (req, res) {
    var secret = 'x3b174jsx';
    var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
    var analyzer = dellAnalyzer_1.default.getInstance();
    new crowller_1.default(url, analyzer);
    res.json(util_1.getReponseInfo(null));
});
// 展示数据
router.get('/showData', checkLogin, function (req, res) {
    // 使用 try catch 捕获异常
    try {
        var filePath = path_1.default.resolve(__dirname, '../data/course.json');
        var result = fs_1.default.readFileSync(filePath, 'utf8');
        res.json(util_1.getReponseInfo(JSON.parse(result)));
    }
    catch (e) {
        res.json(util_1.getReponseInfo(null, '没有数据'));
    }
});
exports.default = router;
