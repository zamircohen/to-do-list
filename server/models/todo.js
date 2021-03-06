const mongoose = require("mongoose")
const Schema = mongoose.Schema

const todoSchema = new Schema({
    todo: {type: String},
    user: {type: Schema.Types.ObjectId, ref: "User"},
    date: {type: Date, default: Date.now},
    description: {type: String, default: ""},
    file: {type: String, default: ""},
    isDone: {type: Boolean, default: false},
    tagList: [{type: String}]
})

const Todo = mongoose.model("Todo", todoSchema)
exports.Todo = Todo