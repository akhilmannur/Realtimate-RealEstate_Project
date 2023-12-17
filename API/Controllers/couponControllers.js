import Coupon from "../models/couponSchema.js";

export const addCoupon = async (req, res) => {
  const {
    code,
    discountType,
    discountAmount,
    minimumPurchase,
    expirationDate,
 
  } = req.body;

  const newCoupon = new Coupon({
    code,
    discountType,
    discountAmount,
    minimumPurchase,
    expirationDate,
  });

  const savedCoupon = await newCoupon.save();
  return res.status(201).json({ success: true, coupon: savedCoupon });
};
