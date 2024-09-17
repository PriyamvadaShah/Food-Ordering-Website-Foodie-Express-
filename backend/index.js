const express =require( "express");
const cors =require("cors");
const {connectDB}=require('./config/connect');
const app=express();
const foodRouter=require('./routes/foodroute');
const userRouter = require("./routes/userroute");
const cartRouter = require("./routes/cartroute");
const orderRouter = require("./routes/orderroute");

require('dotenv').config();

const PORT=8000;
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/food',foodRouter);
app.use('/images',express.static('uploads'));
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.listen(PORT,()=>{
    console.log("App running on port 8000");
})

