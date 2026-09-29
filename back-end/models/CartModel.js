const mongoose=require("mongoose")
const CartScheme=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
})

const Cart=mongoose.model("Cart",CartScheme)
module.exports=Cart