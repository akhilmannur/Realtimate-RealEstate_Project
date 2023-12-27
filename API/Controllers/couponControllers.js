import Coupon from "../models/couponSchema.js";
import Listing from "../models/listingSchema.js";

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

export const getAllCoupons = async (req, res) => {
  const coupons = await Coupon.find();
  if (!coupons) {
    return res.status(404).json({ messege: "no coupons found" });
  }
  return res.status(200).json({ success: true, coupons });
};

export const editCoupon = async (req, res) => {
  const { id } = req.params;
  const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedCoupon) {
    return res
      .status(404)
      .json({ success: false, message: "Coupon not found" });
  }

  return res.status(200).json({ success: true, coupon: updatedCoupon });
};

export const deleteCoupon = async (req, res) => {
  const { id } = req.params;
  const deletedCoupon = await Coupon.findByIdAndDelete(id);

  if (!deletedCoupon) {
    return res
      .status(404)
      .json({ success: false, message: "Coupon not found" });
  }

  return res
    .status(200)
    .json({ success: true, message: "Coupon deleted successfully" });
};

export const applyCouponToProperty = async (req, res) => {
  const { propertyId, couponCode } = req.body;

  const property = await Listing.findById(propertyId);
  if (!property) {
    return res.status(404).json({ success: false, message: "Property not found" });
  }

  const coupon = await Coupon.findOne({ code: couponCode });
  if (!coupon) {
    return res.status(404).json({ success: false, message: "Coupon not found" });
  }
    

  if (coupon.expirationDate < new Date()) {
    return res.status(400).json({ success: false, message: "Coupon has expired" });
  }

  if (property.regularPrice < coupon.minimumPurchase) {
    return res.status(400).json({ success: false, message: "Minimum purchase amount not met" });
  }

  let discountedPrice = property.regularPrice;
  if (coupon.discountType === "percentage") {
    discountedPrice *= 1 - coupon.discountAmount / 100;
  } else if (coupon.discountType === "fixed") {
    discountedPrice -= coupon.discountAmount;
  }

  return res.status(200).json({ success: true, message: "Coupon applied successfully", discountedPrice });
};
