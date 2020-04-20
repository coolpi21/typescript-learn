"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
require("reflect-metadata");
var decorator_1 = require("./decorator");
var util_1 = require("../utils/util");
var crowller_1 = __importDefault(require("../utils/crowller"));
var dellAnalyzer_1 = __importDefault(require("../utils/dellAnalyzer"));
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.isLogin : false;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getReponseInfo(null, '请先登入'));
    }
};
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.showData = function (req, res) {
        try {
            var filePath = path_1.default.resolve(__dirname, '../../data/course.json');
            var result = fs_1.default.readFileSync(filePath, 'utf8');
            res.json(util_1.getReponseInfo(JSON.parse(result)));
        }
        catch (e) {
            res.json(util_1.getReponseInfo(null, '没有数据'));
        }
    };
    LoginController.prototype.getData = function (req, res) {
        var secret = 'x3b174jsx';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
        var analyzer = dellAnalyzer_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        res.json(util_1.getReponseInfo(null));
    };
    __decorate([
        decorator_1.get('/showData'),
        decorator_1.use(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "showData", null);
    __decorate([
        decorator_1.get('/getData'),
        decorator_1.use(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getData", null);
    LoginController = __decorate([
        decorator_1.controller
    ], LoginController);
    return LoginController;
}());
