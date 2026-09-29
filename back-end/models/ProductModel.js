const mongoose=require("mongoose")

const ProductSchema=new mongoose.Schema({
    name:String,
    price:Number,
    imgPath:String,
    category:String
})

const Product=mongoose.model("Product",ProductSchema)
module.exports=Product