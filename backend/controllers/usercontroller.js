const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

require("dotenv").config();

const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  const {email,password}=req.body;
  try{
    const user=await userModel.findOne({email});
    if(!user){
      return res.json({success:false,msg:"User doesn't exist"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.json({success:false,msg:"Invalid credentials"});
    }
    const token=createToken(user._id);
    res.json({success:true,token});
  }
  catch(err){
    console.log(err);
    res.json({success:false,msg:"Error"});
  }

};


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, msg: "User already exists" });
    }
    //validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, msg: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        msg: "Please enter a strong password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser =new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } 
  catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};
module.exports = {
  loginUser,
  registerUser,
};
