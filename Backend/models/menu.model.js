const mongoose = require("mongoose")

const menuSchema = mongoose.Schema({
    title:String,
    img:String
})

const menuModel = mongoose.model("menu-item",menuSchema)

module.exports = menuModel