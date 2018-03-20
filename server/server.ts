import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from "cookie-parser";
import * as logger from 'morgan'
import * as path from 'path'
import errorHandler = require('errorhandler')
import methodOverride = require('method-override')
import { IndexRoute } from './routes/index';
import mongoose = require('mongoose');
import { IModel } from './models/model';
import { IUserModel } from "./models/user"; //import IUserModel
//schemas
import { userSchema } from "./schemas/user"; //import userSchema
import * as SocketIo from 'socket.io'
import { Db } from "./db";
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
export class Server {
    private model: IModel;
    public app: express.Application;
    public server: any;
    public io: SocketIo.Server;
    private db: Db;
    public static bootstrap(): Server {
        return new Server()
    }
    constructor() {
        this.config();
        this.routes();
        this.api();
        this.socket()
    }
    public socket() {
        let io = this.io
        const Chat=this.db.getModel('chat')
        this.io.on('connect', function (socket: any) {
            socket.on('sendmsg', function (data: any) {
                const { from, to, msg } = data
                console.log('data',data)
                const chatId = [from, to].sort().join('_')
                const chat = new Chat({
                    chatId:chatId, from:from, to:to, content: msg
                })
                chat.save(function (err: Error, doc: any) {
                    if(err){
                        console.log('err',err);
                    }
                    io.emit('recvmsg', Object.assign({}, doc._doc))
                })
            })
        })
    }
    public config() {
        this.app = express();
        this.server = require('http').Server(this.app)
        this.io = SocketIo(this.server)
        this.model = Object();
        this.db=Db.getInstance()
        this.app.use(express.static(path.join(__dirname, "public")));

        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");

        this.app.use(logger("dev"))

        this.app.use(bodyParser.json());

        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use(cookieParser("SECRET_GOES_HERE"));

        this.app.use(methodOverride());
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }
    public api() {

    }
    private routes() {
        let router: express.Router;
        router = express.Router();

        //IndexRoute
        IndexRoute.create(router);

        //use router middleware
        this.app.use('/user', router);
    }

}