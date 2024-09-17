const {addFoodItem,listFoodItems, removeFoodItem} =require('../controllers/foodcontroller');
const express=require("express");
const multer=require("multer");

const router=express.Router();

//IMAGE storage engine

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
     return cb(null,`${Date.now()}${file.originalname}`)  ; 
    }
})

const upload=multer({storage:storage});


router.post('/add',upload.single("image"),addFoodItem);
router.get('/list',listFoodItems);
router.delete('/:id',removeFoodItem);

module.exports=router;