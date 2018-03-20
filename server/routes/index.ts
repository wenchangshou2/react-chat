import {
  NextFunction,
  Request,
  Response,
  Router
} from "express";
import {
  BaseRoute,
  Type
} from "./route";
import {
  IModel
} from "../models/model";
import {
  connection,
  Error
} from "mongoose";
import {
  IUserModel
} from '../models/user'
import {
  userSchema
} from '../schemas/user'
import {
  Db
} from "../db";
import {
  IUser
} from "../interfaces/user";
const _filter = {
  'pwd': 0,
  '__v': 0
}
const utils = require('utility')

/**
 * / route
 *
 * @class User
 */
export class IndexRoute extends BaseRoute {
  public model: IModel;
  private db: Db;
  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    console.log("[IndexRoute::create] Creating index route.");
    router.get("/list", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().list(req, res, next);
    });
    router.post('/register', (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().register(req, res, next);
    })
    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().login(req, res, next);
    })
    router.get('/info', (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().info(req, res, next)
    })
    router.post('/update', (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().update(req, res, next)
    })
    router.get('/getmsglist',(req:Request,res:Response,next:NextFunction)=>{
      new IndexRoute().getMsgList(req, res, next)
    })
    router.post('/readmsg',(req:Request,res:Response,next:NextFunction)=>{
      new IndexRoute().readMsg(req, res, next)
    })
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
    this.db = Db.getInstance()
  }

  public readMsg(req: Request, res: Response, next: NextFunction) {
    const userId = req.cookies.userid
    const { from } = req.body
    const Chat=this.db.getModel('chat')
    Chat.update({from:from,to:userId},{'$set':{read:true}},{'multi':true},function(err:Error,doc:any){
      if(!err){
        return res.json({ code: 0, num: doc.nModified })
      }
      return res.json({code:1,msg:'修改失败'})
    })
  }
  public getMsgList(req: Request, res: Response, next: NextFunction) {
    const user = req.cookies.userid
    const User=this.db.getModel('user')
    const Chat=this.db.getModel('chat')
    User.find({}, function (err: Error, userdoc: any) {
      let users={}
      userdoc.forEach(v => {
        users[v._id] = { name: v.user, avatar: v.avatar }
      });
      Chat.find({'$or':[{from:user},{to:user}]},function(err:Error,doc:any){
        if(!err){
          return res.json({
            code:0,
            msgs: doc,
            users: users
          })
        }
      })
    })
  }
  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public list(req: Request, res: Response, next: NextFunction) {
    let user = this.db.getModel('user')
    user.find({}, function (err: any, doc: any) {
      return res.json(doc)
    })
  }
  private md5Pwd(pwd: string) {
    const salt: string = 'wcs_zhejiang_134348$*#$*98u4u3jkd'
    return utils.md5(utils.md5(pwd + salt))
  }
  public info(req: Request, res: Response, next: NextFunction) {
    let self = this
    const {
      userid
    } = req.cookies
    let userModel = this.db.getModel('user')
    if (!userid) {
      return res.json(this.result(Type.USER_NOT_LOGGED))
    }
    userModel.findOne({
      _id: userid
    }, _filter, function (err: Error, doc: Document) {
      if (err) {
        return res.json(self.result(Type.BACKEND_ERROR))
      }
      if (doc) {
        return res.json(self.result(Type.SUCCESS, {
          data:doc
        }))
      }
    })
  }
  public update(req: Request, res: Response, next: NextFunction) {
    let self = this;
    let userModel = this.db.getModel('user')
    const {
      userid
    } = req.cookies
    if (!userid) {
      return res.json({
        code: 1
      })
    }
    const body = req.body
    userModel.findByIdAndUpdate(userid, body, function (err: Error, doc: any) {
      const data = Object.assign({}, {
        user: doc.user,
        type: doc.type
      }, body)
      return res.json(self.result(Type.SUCCESS, {
        data: data
      }))
    })

  }
  public login(req: Request, res: Response, next: NextFunction) {
    let self = this;
    let userModel = this.db.getModel('user')
    const {
      user,
      pwd
    } = req.body
    userModel.findOne({
      user,
      pwd: this.md5Pwd(pwd)
    }, function (err, doc) {
      if (!doc) {
        return res.json(self.result(Type.CHECK_FAIL))
      }
      res.cookie('userid', doc._id)
      return res.json(self.result(Type.SUCCESS, {
        data: doc
      }))
    })
  }
  /**
   * 注册一个新用户
   * 
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @memberof IndexRoute
   */
  public register(req: Request, res: Response, next: NextFunction) {
    let userModel = this.db.getModel('user')
    const {
      user,
      pwd,
      type
    } = req.body
    const self = this;
    userModel.findOne({
      user: user
    }, function (err: Error, doc: Document) {
      if (doc) {
        return res.json(self.result(Type.DUPLICATE_USERNAME))
      }
      let newUser: IUser = {
        user,
        type,
        pwd: self.md5Pwd(pwd)
      }
      userModel(newUser).save(function (e: Error, d: any) {
        if (e) {
          return res.json(self.result(Type.BACKEND_ERROR))
        }
        const {
          user,
          type,
          _id
        } = d
        res.cookie('userid', _id)
        return res.json(self.result(Type.SUCCESS, {
          user,
          type,
          _id
        }))
      })
    })

  }
}