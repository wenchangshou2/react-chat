"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.chatSchema = new mongoose_1.Schema({
    chatid: String,
    from: String,
    to: String,
    read: {
        type: Boolean,
        required: false,
        default: false,
    },
    content: String,
    create_time: {
        type: Number,
        default: () => new Date().getTime(),
    }
});
