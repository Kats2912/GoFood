const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const food_items = require("../models/foodData");
const foodCategory = require("../models/foodCat");

router.post("/foodData",async(req,res)=>{
    try{
        const foodData = await food_items.find();
        console.log(foodData);
        res.status(200).json({
            foodData
        })
    }
    catch{(err)=>console.log(err)}
})
router.post("/foodCategory",async(req,res)=>{
    try{
        const foodCat = await foodCategory.find();
        console.log(foodCat);
        res.status(201).json({
            
            foodCat
        })

    }
    catch{
        (err)=>console.log(err);
    }
})

module.exports = router;