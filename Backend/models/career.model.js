const mongoose = require("mongoose")

const careerSchema = mongoose.Schema({
    title:String,
    img:String,
    desc:String
})

const careerModel = mongoose.model("career",careerSchema)

module.exports = careerModel