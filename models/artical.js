const mongoose = require("mongoose")
const Schema = mongoose.Schema

const articalSchema = new Schema({
    title : String,
    body : String,
    numberOfLikes : Number
})

const Artical = mongoose.model("Artical",articalSchema)

module.exports = Artical

