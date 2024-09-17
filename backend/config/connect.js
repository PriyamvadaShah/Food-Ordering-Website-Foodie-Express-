const mongoose=require("mongoose");

const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://rainadixit11048:4523232@cluster0.sx9hf2f.mongodb.net/food-del').then(()=>{
        console.log("MONGOBD CONNECTED");
    })
}
module.exports={connectDB};
//mongodb+srv://rainadixit11048:<db_password>@cluster0.sx9hf2f.mongodb.net/?