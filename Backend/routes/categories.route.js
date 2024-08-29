const express = require("express")
const categoryModel = require("../models/categories.model")
const categoryRoute = express.Router()

categoryRoute.post("/add-category-item",async(req,res)=>{
    try {
        const {category,items} = req.body

        if(!category || !Array.isArray(items)){
            return res.send(400).send("Invalid data")
        }

        const isCategoryExists = await categoryModel.findOne({category})

        if(isCategoryExists){
            isCategoryExists.items = [...new Set([...isCategoryExists.items, ...items])]
            await isCategoryExists.save()
        }
        else{
            const menuData = await categoryModel({
                category,
                items
            })
            await menuData.save()
        }
        res.send("Category and ites items added successfully")
    } catch (error) {
        res.send("failed to add category itemes")
    }
})

categoryRoute.get("/list-category-items",async(req,res)=>{
    try {
        let categories = await categoryModel.find()
        res.json({message:"all categories", status:200, categories})
    } catch (error) {
        res.status(400).send("failed to list category items")
    }
})

categoryRoute.get("/list-category-items/sub-categories/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryModel.findById(id);
        
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({ category });
    } catch (error) {
        res.status(500).json({ message: "Failed to list sub-categories", error: error.message });
    }
});

module.exports = categoryRoute