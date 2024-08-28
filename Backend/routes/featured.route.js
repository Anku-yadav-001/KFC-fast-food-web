const express = require("express")
const featuredModel = require("../models/featured.mode")
const featuredRoute = express.Router()

featuredRoute.post("/add-feature-item",async(req,res)=>{
    const {title,img,tag,location,cal} = req.body
    try {
        let item = await featuredModel({
            title,
            img,
            tag,
            location,
            cal
        })
        await item.save()
        res.send("item added successfully")
    } catch (error) {
        res.send("failed to add featured item")
    }
})

featuredRoute.get("/list-featured-item",async(req,res)=>{
    try {
        const items = await featuredModel.find()
        res.json({message:"list of featured items",message:200,items})
    } catch (error) {
        res.send("failed to list featured items")
    }
})

module.exports =featuredRoute