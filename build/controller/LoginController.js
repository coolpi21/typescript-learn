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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var decorator_1 = require("./decorator");
var util_1 = require("../utils/util");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.login = function (req, res) {
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
    };
    LoginController.prototype.loginout = function (req, res) {
        if (req.session) {
            req.session.isLogin = undefined;
        }
        res.json(util_1.getReponseInfo(null));
    };
    LoginController.prototype.home = function (req, res) {
        var isLogin = req.session ? req.session.isLogin : undefined;
        if (isLogin) {
            res.send("\n      <html>\n        <body>\n          <a href=\"/showData\">\u5C55\u793A\u6570\u636E</a>\n          <a href=\"/getData\">\u722C\u53D6\u6570\u636E</a>\n          <a href=\"/loginout\">\u767B\u51FA</a>\n        </body>\n      </html>\n    ");
        }
        else {
            res.send("\n      <html>\n        <body>\n          <form method=\"post\" action=\"/login\">\n            <input type=\"password\" name=\"password\"/>\n            <button>\u767B\u5165</button>\n          </form>\n        </body>\n      </html>\n    ");
        }
    };
    __decorate([
        decorator_1.post('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "login", null);
    __decorate([
        decorator_1.get('/loginout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "loginout", null);
    __decorate([
        decorator_1.get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "home", null);
    LoginController = __decorate([
        decorator_1.controller
    ], LoginController);
    return LoginController;
}());
