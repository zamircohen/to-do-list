const mongoose = require("mongoose")
const Schema = mongoose.Schema

const labelSchema = new Schema({
    title: {type: String, unique: true, required: true},
    todo: {type: Schema.Types.ObjectId, ref: "Todo"}
})

const Label = mongoose.model("Label", labelSchema)
exports.Label = Label