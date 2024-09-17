const jwt=require("jsonwebtoken");

const authMiddleware=async(req,res,next)=>{
    const authHeadVal=req.headers['authorization'];
    if(!authHeadVal)return res.status(401).json({success:false,msg:"Token not found"});
 try
    { 
     const token=authHeadVal.split(' ')[1];
     if(!token)return res.status(401).json({error:"Unauthorised"});
 
     const token_decode= jwt.verify(token,process.env.JWT_SECRET);
     req.body.userId=token_decode.id;
     return next();
 }
    
 catch(err){
         console.log(err);
         res.json({success:false,msg:"Error"});
     }
}

module.exports={authMiddleware};
