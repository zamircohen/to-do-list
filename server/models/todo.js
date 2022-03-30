const mongoose = require("mongoose")
const Schema = mongoose.Schema

const todoSchema = new Schema({
    todo: {type: String},
    user: {type: Schema.Types.ObjectId, ref: "User"},
    date: {type: Date, default: Date.now},
    isDone: {type: Boolean, default: false}
})

const Todo = mongoose.model("Todo", todoSchema)
exports.Todo = Todo