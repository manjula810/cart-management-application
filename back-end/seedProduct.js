
require("dotenv").config();
const mongoose=require("mongoose")
const Product =require("./models/ProductModel")
const products = [
  // MEN
  {
    name: "Casual T-shirt",
    price: 1299,
    imgPath: "./images/men1.jpg",
    category: "men",
  },
  {
    name: "Men Regular Fit",
    price: 1399,
    imgPath: "./images/men2.jpg",
    category: "men",
  },
  {
    name: "Polo T-shirt",
    price: 1199,
    imgPath: "./images/men3.jpg",
    category: "men",
  },
  {
    name: "Graphic T-shirt",
    price: 999,
    imgPath: "./images/men4.jpg",
    category: "men",
  },
  {
    name: "Round Neck T-shirt",
    price: 799,
    imgPath: "./images/men5.jpg",
    category: "men",
  },
  {
    name: "Striped T-shirt",
    price: 899,
    imgPath: "./images/men6.jpg",
    category: "men",
  },
  {
    name: "Oversized T-shirt",
    price: 1799,
    imgPath: "./images/men7.jpg",
    category: "men",
  },
  {
    name: "Printed T-shirt",
    price: 1570,
    imgPath: "./images/men8.jpg",
    category: "men",
  },

  // WOMEN
  {
    name: "Floral Dress",
    price: 1499,
    imgPath: "./images/woman1.jpg",
    category: "women",
  },
  {
    name: "Casual Top",
    price: 999,
    imgPath: "./images/woman2.jpg",
    category: "women",
  },
  {
    name: "Denim Jacket",
    price: 1799,
    imgPath: "./images/woman3.jpg",
    category: "women",
  },
  {
    name: "Maxi Dress",
    price: 1599,
    imgPath: "./images/woman4.jpg",
    category: "women",
  },
  {
    name: "Crop Top",
    price: 799,
    imgPath: "./images/woman5.jpg",
    category: "women",
  },
  {
    name: "Palazzo Pants",
    price: 1199,
    imgPath: "./images/woman6.jpg",
    category: "women",
  },
  {
    name: "Party Gown",
    price: 2499,
    imgPath: "./images/woman7.jpg",
    category: "women",
  },
  {
    name: "Kurti",
    price: 1099,
    imgPath: "./images/woman8.jpg",
    category: "women",
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await Product.insertMany(products);

    console.log("Products inserted successfully ✅");

    await mongoose.disconnect();
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });