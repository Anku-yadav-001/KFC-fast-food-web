const express = require("express")
const careerModel = require("../models/career.model")
const careerRoute = express.Router()

careerRoute.post("/add-career-options",async(req,res)=>{
    const {title,img,desc} = req.body
    try {
        const career = await careerModel({
            title,
            img,
            desc
        })
        await career.save()
        res.send("career option added successfully")
    } catch (error) {
        res.send("failed to add career options")
    }
})

careerRoute.get("/all-career-options", async (req,res)=>{
    try {
        let items = await careerModel.find()
        res.json({message:"all career items",status:200,items})
    } catch (error) {
        res.status(400).send("failed to load career options")
    }
})

module.exports = careerRoute