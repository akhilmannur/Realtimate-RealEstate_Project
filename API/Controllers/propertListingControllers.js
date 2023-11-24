import Listing from "../Models/listingSchema.js";

export const createListing = async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    if (!listing) {
      return res
        .status(400)
        .json({ status: "error", message: "Couldn't create listing" });
    }
    return res.status(201).json({
      status: "success",
      message: "Listing created successfully",
      data: listing,
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res
      .status(404)
      .json({ status: "error", message: " user not found" });
  }
  await Listing.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ status: "sucess", message: "user deleted succesfully" });
};



export const getListing = async (req, res,) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res.status(404).json({ status: "error", message: "user not found" });
  }
  res.status(200).json({
    status: "success",
    message: "listed successfully",
    list: listing,
  });
};



