const express = require("express")
const menuModel = require("../models/menu.model")
const menuRoute = express.Router()

menuRoute.post("/add-menu-item",async(req,res)=>{
    const {title,img} = req.body
    try {
        const item = await menuModel({
            title,img
        })
        await item.save()
        res.send("menu item added successfully")
    } catch (error) {
        res.send("failed to add menu item")
    }
})

menuRoute.get("/list-menu-items",async(req,res)=>{
    try {
        let items = await menuModel.find()
        res.json({message:"menu item list", status:200,items})
    } catch (error) {
        res.send("failed to show menu item list")
    }
})

module.exports = menuRoute