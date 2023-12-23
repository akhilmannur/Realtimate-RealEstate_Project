import Listing from '../models/listingSchema.js';

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

export const getAllListing = async (req, res,) => {
  const allListing = await Listing.find();
  if (!allListing) {
    return res.status(404).json({ status: "error", message: "user not found" });
  }
  res.status(200).json({
    status: "success",
    message: "listed successfully",
    list: allListing,
  });
};



export const getListings  =async (req ,res)=>{


  const limit = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;
  let offer = req.query.offer;

  if (offer === undefined || offer === 'false') {
    offer = { $in: [false, true] };
  }

  let furnished = req.query.furnished;

  if (furnished === undefined || furnished === 'false') {
    furnished = { $in: [false, true] };
  }

  let parking = req.query.parking;

  if (parking === undefined || parking === 'false') {
    parking = { $in: [false, true] };
  }

  let type = req.query.type;

  if (type === undefined || type === 'all') {
    type = { $in: ['sale', 'rent'] };
  }

  const searchTerm = req.query.searchTerm || '';

  const sort = req.query.sort || 'createdAt';

  const order = req.query.order || 'desc';

  const listings = await Listing.find({
    name: { $regex: searchTerm, $options: 'i' },
    offer,
    furnished,
    parking,
    type,
  })
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex);

  return res.status(200).json(listings);
}

