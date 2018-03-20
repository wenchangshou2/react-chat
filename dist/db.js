"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_1 = require("./schemas/user");
const chat_1 = require("./schemas/chat");
const DB_URL = 'mongodb://localhost:27017/imooc-chat';
class Db {
    constructor() {
        global.Promise = require("q").Promise;
        this.model = Object();
        mongoose.Promise = global.Promise;
        let connection = mongoose.createConnection(DB_URL);
        this.model.user = connection.model("User", user_1.userSchema);
        this.model.chat = connection.model("Chat", chat_1.chatSchema);
    }
    getModel(model) {
        return this.model[model];
    }
    static getInstance() {
        return Db.db;
    }
}
Db.db = new Db();
exports.Db = Db;
