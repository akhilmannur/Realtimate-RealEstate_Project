import Listing from "../Models/listingSchema.js";

export const createListing = async (req, res) => {
  const listing = await Listing.create(req.body);
  if (!listing) {
    return res
      .status(400)
      .json({ status: "error", message: "couldn't create listings" });
  }
  return res
    .status(201)
    .json({ status: "sucess", message: "listing created successfully" });
};
