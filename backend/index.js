const express =require( "express");
const cors =require("cors");
const {connectDB}=require('./config/connect');
const app=express();
const foodRouter=require('./routes/foodroute');
const userRouter = require("./routes/userroute");
const cartRouter = require("./routes/cartroute");
const orderRouter = require("./routes/orderroute");
const mongoose = require('mongoose');
require('dotenv').config();

const PORT=8000;
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
const  mongoDBUrl=process.env.MONGODB_URL || "mongodb://localhost:27017/foodie";

console.log("MongoDB URL:", mongoDBUrl);
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log('App connected to database');
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/api/food',foodRouter);
app.use('/images',express.static('uploads'));
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.listen(PORT,()=>{
    console.log("App running on port 8000");
})

