"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Type;
(function (Type) {
    Type[Type["CHECK_FAIL"] = 0] = "CHECK_FAIL";
    Type[Type["SUCCESS"] = 1] = "SUCCESS";
    Type[Type["BACKEND_ERROR"] = 2] = "BACKEND_ERROR";
    Type[Type["USER_NOT_LOGGED"] = 3] = "USER_NOT_LOGGED";
    Type[Type["DUPLICATE_USERNAME"] = 4] = "DUPLICATE_USERNAME";
})(Type = exports.Type || (exports.Type = {}));
class BaseRoute {
    constructor() {
        this.title = "Tour of Heros";
        this.scripts = [];
    }
    addScript(src) {
        this.scripts.push(src);
        return this;
    }
    render(req, res, view, options) {
        res.locals.BASE_URL = "/";
        res.locals.scripts = this.scripts;
        res.locals.title = this.title;
        res.render(view, options);
    }
    result(type, data) {
        switch (type) {
            case Type.CHECK_FAIL:
                return {
                    code: 1,
                    msg: '用户名或者密码错误'
                };
            case Type.SUCCESS:
                return Object.assign({ code: 0 }, data);
            case Type.USER_NOT_LOGGED:
                return {
                    code: 1,
                    msg: '用户未登录'
                };
            case Type.DUPLICATE_USERNAME:
                return {
                    code: 1,
                    msg: '用户名重复'
                };
            default:
                return {
                    code: 1,
                    msg: '未知错误'
                };
        }
    }
}
exports.BaseRoute = BaseRoute;
