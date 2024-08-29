const mongoose = require("mongoose")

const itemSchema = mongoose.Schema({
    title:String,
    img:String,
    cal:String
})

const categorySchema = mongoose.Schema({
    category:String,
    items:[itemSchema]
})

const categoryModel = mongoose.model("categorie",categorySchema)

module.exports = categoryModel