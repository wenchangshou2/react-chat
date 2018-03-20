import { Schema } from 'mongoose'

export var chatSchema:Schema=new Schema({
    chatid:String,
    from:String,
    to:String,
    read:{
        type:Boolean,
        required:false,
        default: false,
    },
    content:String,
    create_time:{
        type: Number,
        default: () => new Date().getTime(),
    }

})