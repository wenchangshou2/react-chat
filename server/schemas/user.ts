import { Schema } from 'mongoose'

export var userSchema: Schema = new Schema({
    user: String,
    pwd: String,
    type: String,
    avatar: String,
    desc: String,
    title: String,
    company: String,
    money: String
})