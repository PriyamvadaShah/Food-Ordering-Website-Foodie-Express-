const express=require("express");
const {addToCart,removeFromCart,getCart}=require('../controllers/cartcontroller')
const {authMiddleware}=require('../middlewares/auth')

const router=express.Router();

router.post('/add',authMiddleware,addToCart);
router.post('/remove',authMiddleware,removeFromCart);
router.post('/get',authMiddleware,getCart);

module.exports=router;