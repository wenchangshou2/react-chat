"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
const db_1 = require("../db");
const _filter = {
    'pwd': 0,
    '__v': 0
};
const utils = require('utility');
class IndexRoute extends route_1.BaseRoute {
    static create(router) {
        console.log("[IndexRoute::create] Creating index route.");
        router.get("/list", (req, res, next) => {
            new IndexRoute().list(req, res, next);
        });
        router.post('/register', (req, res, next) => {
            new IndexRoute().register(req, res, next);
        });
        router.post('/login', (req, res, next) => {
            new IndexRoute().login(req, res, next);
        });
        router.get('/info', (req, res, next) => {
            new IndexRoute().info(req, res, next);
        });
        router.post('/update', (req, res, next) => {
            new IndexRoute().update(req, res, next);
        });
        router.get('/getmsglist', (req, res, next) => {
            new IndexRoute().getMsgList(req, res, next);
        });
        router.post('/readmsg', (req, res, next) => {
            new IndexRoute().readMsg(req, res, next);
        });
    }
    constructor() {
        super();
        this.db = db_1.Db.getInstance();
    }
    readMsg(req, res, next) {
        const userId = req.cookies.userid;
        const { from } = req.body;
        const Chat = this.db.getModel('chat');
        Chat.update({ from: from, to: userId }, { '$set': { read: true } }, { 'multi': true }, function (err, doc) {
            if (!err) {
                return res.json({ code: 0, num: doc.nModified });
            }
            return res.json({ code: 1, msg: '修改失败' });
        });
    }
    getMsgList(req, res, next) {
        const user = req.cookies.userid;
        const User = this.db.getModel('user');
        const Chat = this.db.getModel('chat');
        User.find({}, function (err, userdoc) {
            let users = {};
            userdoc.forEach(v => {
                users[v._id] = { name: v.user, avatar: v.avatar };
            });
            Chat.find({ '$or': [{ from: user }, { to: user }] }, function (err, doc) {
                if (!err) {
                    return res.json({
                        code: 0,
                        msgs: doc,
                        users: users
                    });
                }
            });
        });
    }
    list(req, res, next) {
        let user = this.db.getModel('user');
        user.find({}, function (err, doc) {
            return res.json(doc);
        });
    }
    md5Pwd(pwd) {
        const salt = 'wcs_zhejiang_134348$*#$*98u4u3jkd';
        return utils.md5(utils.md5(pwd + salt));
    }
    info(req, res, next) {
        let self = this;
        const { userid } = req.cookies;
        let userModel = this.db.getModel('user');
        if (!userid) {
            return res.json(this.result(route_1.Type.USER_NOT_LOGGED));
        }
        userModel.findOne({
            _id: userid
        }, _filter, function (err, doc) {
            if (err) {
                return res.json(self.result(route_1.Type.BACKEND_ERROR));
            }
            if (doc) {
                return res.json(self.result(route_1.Type.SUCCESS, {
                    data: doc
                }));
            }
        });
    }
    update(req, res, next) {
        let self = this;
        let userModel = this.db.getModel('user');
        const { userid } = req.cookies;
        if (!userid) {
            return res.json({
                code: 1
            });
        }
        const body = req.body;
        userModel.findByIdAndUpdate(userid, body, function (err, doc) {
            const data = Object.assign({}, {
                user: doc.user,
                type: doc.type
            }, body);
            return res.json(self.result(route_1.Type.SUCCESS, {
                data: data
            }));
        });
    }
    login(req, res, next) {
        let self = this;
        let userModel = this.db.getModel('user');
        const { user, pwd } = req.body;
        userModel.findOne({
            user,
            pwd: this.md5Pwd(pwd)
        }, function (err, doc) {
            if (!doc) {
                return res.json(self.result(route_1.Type.CHECK_FAIL));
            }
            res.cookie('userid', doc._id);
            return res.json(self.result(route_1.Type.SUCCESS, {
                data: doc
            }));
        });
    }
    register(req, res, next) {
        let userModel = this.db.getModel('user');
        const { user, pwd, type } = req.body;
        const self = this;
        userModel.findOne({
            user: user
        }, function (err, doc) {
            if (doc) {
                return res.json(self.result(route_1.Type.DUPLICATE_USERNAME));
            }
            let newUser = {
                user,
                type,
                pwd: self.md5Pwd(pwd)
            };
            userModel(newUser).save(function (e, d) {
                if (e) {
                    return res.json(self.result(route_1.Type.BACKEND_ERROR));
                }
                const { user, type, _id } = d;
                res.cookie('userid', _id);
                return res.json(self.result(route_1.Type.SUCCESS, {
                    user,
                    type,
                    _id
                }));
            });
        });
    }
}
exports.IndexRoute = IndexRoute;
