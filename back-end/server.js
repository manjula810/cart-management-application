require("dotenv").config();
const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())

const Product=require("./models/ProductModel")
const Cart=require("./models/CartModel")


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then( ()=>{
    console.log("Mongodb connectced!")
    app.listen(PORT)
    console.log("Server is Runningg")
}).catch((error)=>console.log(error.message))

//*********GET ALL PRODUCTS**********

app.get("/api/products",async (req,res)=>{
    try{

        const data=await Product.find()
        res.json(data)
        console.log("Got all productss")
    }
    catch(error){
      res.status(500).json({
        message:"Failed to fetch products"
      })
    }

})
app.get("/api/carts",async (req,res)=>{
    try{

        const data=await Cart.find().populate('product')
        res.json(data)
        console.log("Got all itemss")
    }
    catch(error){
      res.status(500).json({
        message:"Failed to fetch cart items"
      })
    }

})
app.post("/api/carts",async (req,res)=>{
    try{
      
      const createdCart=await Cart.create(req.body)
      const populatedCart=await Cart.findById(createdCart._id).populate('product')
      res.status(200).json(populatedCart)
    }
    catch(error){
      res.status(500).json({
        message:"Failed to send data to backend!"
      })
    }
})

app.delete('/api/carts/:id',async(req,res)=>{
    try{
      const id=req.params.id
      const deletedItem=await Cart.findByIdAndDelete(id)
      res.status(200).json(deletedItem)
    }
    catch(error){
       res.status(500).json({
        message:"Failed to delete item from cart!"
       })
    }
})
app.delete("/api/carts", async (req, res) => {
  try {
    const result = await Cart.deleteMany({});

    res.json({
      message: "Order placed and cart cleared successfully! ✅",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to clear cart!"
    });
  }
});
app.patch('/api/carts/:id',async(req,res)=>{
    try{
     const id=req.params.id
     const updatedItem=await Cart.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true
     })
     if (!updatedItem) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }
     res.json(updatedItem)
    }
    catch{
     res.status(500).json({
        message:"failed to Update Quantityy"
     })

    }
})