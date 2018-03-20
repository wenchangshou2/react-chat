"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    user: String,
    pwd: String,
    type: String,
    avatar: String,
    desc: String,
    title: String,
    company: String,
    money: String
});
