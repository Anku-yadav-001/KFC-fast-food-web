const mongoose = require("mongoose")

const featuredSchema = mongoose.Schema({
    title:String,
    img:String,
    cal:String,
    tag:String,
    location:String
})

const featuredModel = mongoose.model("featured-item",featuredSchema)

module.exports = featuredModel