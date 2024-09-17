const foodModel=require('../models/foodModel');
const fs=require("fs");

const addFoodItem=async(req,res)=>{
    const {name,description,price,category}=req.body;
    let image_filename=`${req.file.filename}`;

    if (!image_filename) {
        console.log('Image is required');
      }
      
    const food=new foodModel({
        name:name,
        description:description,
        price:price,
        image:image_filename,
        category:category
    })
    try{
    await food.save();
    res.json({success:true,msg:"Food Item Added"});
    }
    catch(err){
       console.log(err);
       res.json({success:false,msg:"Error"});

    }

}

const listFoodItems=async(req,res)=>{

    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods});
    }
    catch(err){
        console.log(err);
        res.json({success:false,msg:"Error"});
    }
}
const removeFoodItem=async(req,res)=>{

const id=req.params.id;
const Item=await foodModel.findById(id);

fs.unlink(`uploads/${Item.image}`,()=>{})

if(!Item)return res.json({msg:"Item not found"});

await foodModel.findByIdAndDelete(id);
return res.json({success:true,msg:"Item deleted"});


}
module.exports={addFoodItem,listFoodItems,removeFoodItem};