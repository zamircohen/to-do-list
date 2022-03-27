const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    item: {type: String},
    user: {type: mongoose.Schema.ObjectId, ref: "User"},
    date: {type: Date, default: Date.now},
    // done: {type: Boolean}
})

const Todo = mongoose.model("Todo", todoSchema)
exports.Todo = Todo