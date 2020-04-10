"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send('Hello World!');
});
router.get('/data', function (req, res) {
    res.send('Get Data Success!');
});
exports.default = router;
