const express=require("express");
const {authMiddleware}=require('../middlewares/auth')
const {placeOrder,verifyOrder,orders,AllOrders,updateStatus}=require('../controllers/ordercontroller');

const router=express.Router();

router.post('/place',authMiddleware,placeOrder);
router.post('/verify',verifyOrder);
router.post("/userorders",authMiddleware,orders);
router.get("/allorders",AllOrders);
router.post("/status",updateStatus);

module.exports=router;