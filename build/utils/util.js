"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getReponseInfo(data, errMsg) {
    if (errMsg) {
        return {
            success: false,
            errMsg: errMsg,
            data: null,
        };
    }
    else {
        return {
            success: true,
            data: data,
        };
    }
}
exports.getReponseInfo = getReponseInfo;
