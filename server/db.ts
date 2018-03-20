import { IModel } from "./models/model";
import mongoose = require('mongoose')
import { IUserModel } from "./models/user"; //import IUserModel
import { IChatModel } from "./models/chat"; //import IUserModel
//schemas
import { userSchema } from "./schemas/user"; //import userSchema
import { chatSchema } from "./schemas/chat";
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
export class Db {
    private static db=new Db() 
    private model: IModel;
    constructor() {
        global.Promise = require("q").Promise
        this.model=Object()
        mongoose.Promise = global.Promise
        let connection: mongoose.Connection = mongoose.createConnection(DB_URL);
        this.model.user = connection.model<IUserModel>("User", userSchema);
        this.model.chat=connection.model<IChatModel>("Chat",chatSchema)
    }
    public getModel(model): any {
        return this.model[model]
    }
    public static getInstance(): Db {
        return Db.db;
    }
}