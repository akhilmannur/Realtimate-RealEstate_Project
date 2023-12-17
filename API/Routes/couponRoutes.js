import express from 'express';
import verifyToken from '../middlewares/authMiddleWare.js';
import trycatch from '../middlewares/tryCatch.js';
import { addCoupon } from '../Controllers/couponControllers.js';

const couponRouter= express.Router();


couponRouter.post('/addcoupon',trycatch(addCoupon))

export default couponRouter;