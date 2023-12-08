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

export const showListingById= async (req, res) => {
  const ListingId = req.params.id;
  const Listings = await Listing.findById(ListingId).populate("userRef");
  if (!Listings) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({
    status: "success",
    message: "Successfully fetched product details.",
    Listings,
  });
}
