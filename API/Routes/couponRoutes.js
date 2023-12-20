import express from 'express';
import verifyToken from '../middlewares/authMiddleWare.js';
import trycatch from '../middlewares/tryCatch.js';
import { addCoupon, applyCouponToProperty, deleteCoupon, editCoupon, getAllCoupons } from '../Controllers/couponControllers.js';

const couponRouter= express.Router();


couponRouter.post('/addcoupon',trycatch(addCoupon))
couponRouter.get('/getallcoupons',trycatch( getAllCoupons));
couponRouter.put('/:id/editcoupon', trycatch(editCoupon));
couponRouter.delete('/:id/deletecoupon', trycatch(deleteCoupon));
couponRouter.post('/applycoupon', trycatch(applyCouponToProperty));


export default couponRouter;