const mongoose = require("mongoose");
const {Schema} = mongoose;

const foodSchema = new Schema({
    CategoryName:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    options:[],
    description:{
        type:String,
        required:true,
    }
})
module.exports = mongoose.model('food_items',foodSchema);