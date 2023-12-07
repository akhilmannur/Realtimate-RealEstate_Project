import User from "../models/userSchema.js";
import Listing from "../models/listingSchema.js";

export const showAllUser = async (req, res) => {
  const alluser = await User.find();

  res.status(200).json({
    status: "success",
    message: "Successfully fetched user datas.",
    alluser,
  });
};

export const showListing = async (req, res) => {
  const listing = await Listing.find();

  res.status(200).json({
    status: "success",
    message: "Successfully fetched all listing",
    listing,
  });
};
