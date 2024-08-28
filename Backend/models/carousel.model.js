const mongoose = require("mongoose")

const carouselSchema = mongoose.Schema({
    image:String,
    heading:String,
    paragraph:String,
    buttonText:String,
    buttonLink:String,
    termsText:String
})

const carouselModel = mongoose.model("carousel-detail",carouselSchema)

module.exports = carouselModel