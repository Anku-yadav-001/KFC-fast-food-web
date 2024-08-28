const express = require('express')
const carouselModel = require('../models/carousel.model')
const carouselRouter = express.Router()

carouselRouter.post("/add-carousel-item", async(req,res)=>{
    const {image,heading,paragraph,buttonText,buttonLink,termsText} = req.body
    try {
        let item = await carouselModel({
            image,
            heading,
            paragraph,
            buttonText,
            buttonLink,
            termsText
        })
        await item.save()
        res.send("carousel item added successfully")
    } catch (error) {
        res.send("failed to add carousel item")
    }
})

carouselRouter.get("/list-carousel-data",async(req,res)=>{
    try {
        let items = await carouselModel.find()
        res.json({message:"list of carousel data",status:200,items})
    } catch (error) {
        res.send("failed to list carousel data items")
    }
})

module.exports = carouselRouter