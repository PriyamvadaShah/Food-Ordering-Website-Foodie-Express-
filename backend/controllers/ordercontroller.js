const orderModel=require('../models/orderModel');
const userModel=require('../models/userModel');

const Stripe =require("stripe"); 

const stripe=new Stripe(process.env.STRIPE_SECRET);


//Placing userorder
const placeOrder=async(req,res)=>{
    const frontendurl="http://localhost:3001";

    try{
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        });

        await newOrder.save();

        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items=req.body.items.map((item)=>({  
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*80*100
            },
            quantity:item.quantity,    
        }))
    
        
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*80*100,
            },
            quantity:1,
        })

        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontendurl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontendurl}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true,session_url:session.url});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}

const verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body;
    try{
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"});
        }
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}

const AllOrders=async(req,res)=>{
    try{
    const response=await orderModel.find({});
res.json({success:true,data:response});
}

catch(err){
    console.log(err);
    res.json({success:false,message:"Error"});
}
}

const orders=async(req,res)=>{
  try{
    console.log(req.body);
    const order=await orderModel.find({userId:req.body.userId});
    res.json({success:true,ord:order});
  }  
  catch(err){
    console.log(req.body);
    console.log(err);
    res.json({success:false,message:req.body});
  }
}

//api for updating order status
const updateStatus=async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}

module.exports={placeOrder,verifyOrder,orders,AllOrders,updateStatus};