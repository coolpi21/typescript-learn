"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
var router = express_1.Router();
// 增加登录密码功能
router.get('/', function (req, res) {
    res.send("\n    <html>\n      <body>\n        <form method=\"post\" action=\"/getData\">\n          <input type=\"password\" name=\"password\"/>\n          <button>\u63D0\u4EA4</button>\n        </form>\n      </body>\n    </html>\n  ");
    // res.send('Hello World!');
});
// 增加验证功能
router.post('/getData', function (req, res) {
    var password = req.body.password;
    if (password === '123') {
        var secret = 'x3b174jsx';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
        var analyzer = dellAnalyzer_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        res.send('Get Data Success!');
    }
    else {
        res.send(req.teacher + " password error");
    }
});
exports.default = router;
