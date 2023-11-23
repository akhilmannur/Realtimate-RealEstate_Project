import Listing from "../Models/listingSchema.js";

export const createListing = async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    if (!listing) {
      return res
        .status(400)
        .json({ status: "error", message: "Couldn't create listing" });
    }
    return res
      .status(201)
      .json({
        status: "success",
        message: "Listing created successfully",
        data: listing,
      });
  } catch (error) {
    // Since you're using middleware for error handling, you may not need this block.
    // However, you could log the error for your reference.
    console.error(error);
    // Pass the error to the error-handling middleware.
    throw new Error(error);
  }
};

