"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const index_1 = require("./routes/index");
const SocketIo = require("socket.io");
const db_1 = require("./db");
const DB_URL = 'mongodb://localhost:27017/imooc-chat';
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.config();
        this.routes();
        this.api();
        this.socket();
    }
    socket() {
        let io = this.io;
        const Chat = this.db.getModel('chat');
        this.io.on('connect', function (socket) {
            socket.on('sendmsg', function (data) {
                const { from, to, msg } = data;
                console.log('data', data);
                const chatId = [from, to].sort().join('_');
                const chat = new Chat({
                    chatId: chatId, from: from, to: to, content: msg
                });
                chat.save(function (err, doc) {
                    if (err) {
                        console.log('err', err);
                    }
                    io.emit('recvmsg', Object.assign({}, doc._doc));
                });
            });
        });
    }
    config() {
        this.app = express();
        this.server = require('http').Server(this.app);
        this.io = SocketIo(this.server);
        this.model = Object();
        this.db = db_1.Db.getInstance();
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser("SECRET_GOES_HERE"));
        this.app.use(methodOverride());
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
    api() {
    }
    routes() {
        let router;
        router = express.Router();
        index_1.IndexRoute.create(router);
        this.app.use('/user', router);
    }
}
exports.Server = Server;
