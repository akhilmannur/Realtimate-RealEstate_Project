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

export const showUserById= async (req, res) => {
  const UserId = req.params.id;
  const users= await User.findById(UserId);
  if(!users) {
    return res.status(404).json({ error: "User not found"})
  }
  res.status(200).json({
    users
  })
};


export const showPropertiesBasedOnUser= async (req, res) => {
  const userId=req.params.id;

  const properties= await Listing.find({ userRef: userId })
  if(!properties){
    return res.status(404).json({ error: "user not found"})
  }
  res.status(200).json(
    properties
  )
};

export const usersPermonth = async (req,res)=>{
  const userCounts = await User.aggregate([
    {
      $project: {
        month: { $month: '$createdAt' } 
      }
    },
    {
      $group: {
        _id: '$month',
        count: { $sum: 1 } 
      }
    },
    {
      $sort: { _id: 1 } 
    }
  ]);

  res.status(200).json(userCounts);
};

export const listingPerMonth= async(req,res)=>{

  const listingsPerMonth = await Listing.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m', date: '$createdAt' } 
        },
        count: { $sum: 1 } 
      }
    },
    {
      $sort: { _id: 1 } 
    }
  ]);

    res.status(200).json(listingsPerMonth);
};

export const typeCount = async (req,res)=>{
  const typeCounts = await Listing.aggregate([
    {
      $group: {
        _id: null,
        sellCount: {
          $sum: {
            $cond: { if: { $eq: ['$type', 'sell'] }, then: 1, else: 0 }
          }
        },
        rentCount: {
          $sum: {
            $cond: { if: { $eq: ['$type', 'rent'] }, then: 1, else: 0 }
          }
        }
      }
    }
  ]);


  const [result] = typeCounts;

  const { sellCount, rentCount } = result;
  
  return res.status(200).json( { sellCount, rentCount });

}