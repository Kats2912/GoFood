const mongoose = require("mongoose");
const {Schema} = mongoose;

const foodCategory = new Schema({
    CategoryName:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("foodCategory",foodCategory);