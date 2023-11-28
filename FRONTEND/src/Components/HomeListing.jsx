import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";

const HomeListing = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await axios.get("/api/list/getlistings?offer=true&limit=4");
        const data = await res.data;
        // console.log(data);
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await axios.get("/api/list/getlistings?type=rent&limit=4");
        const data = await res.data;
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await axios.get("/api/list/getlistings?type=sell&limit=4");
        const data = await res.data;
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="m-10">
       <h1 className='text-2xl font-semibold text-slate-600'>Recent offers</h1> 
    <div className=" flex flex-wrap gap-4 mt-10 mx-20 p-3 ">
      {offerListings.map((listing, index) => (
        <Card className=" max-w-[16rem] max-h-[30rem] shadow-lg mx-1">
          <CardHeader floated={false} color="blue-gray" key={index}>
            <img
              src={listing.ListingimageUrls[0]}
              alt="ui/ux review check"
              className="h-40 object-cover object-center"
            />
            <div className="to-bg-black-10 absolute inset-0 h-full w-30 bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          </CardHeader>
          <CardBody>
            <div className="mb-3 flex items-center justify-between">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-medium"
              >
                {/* {listing.name} */}
              </Typography>
            </div>
            <div className="flex items-center gap-1">
              <MdLocationOn className="h-4 w-4 text-green-700" />
              <Typography className="text-sm text-gray-600 truncate">
                {/* {listing.address} */}
              </Typography>
            </div>
            <Typography color="gray" className=" line-clamp-1 w-30">
              {/* {listing.description} */}
            </Typography>
            <div className="mb-3 flex items-center justify-between">
              <Typography
                variant="h5"
                className="font-medium bg-green-200 rounded-lg w-20 text-center my-2"
              >
                {/* {listing.type} */}
              </Typography>
            </div>
            <div className="mb-3 flex items-center justify-between">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-medium"
              >
                Rs
                {/* {listing.offer
               ? listing.regularPrice.toLocaleString("en-IN")
               : listing.discountPrice.toLocaleString("en-IN")}
             {listing.type === "rent" && " / month"} */}
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button size="lg" fullWidth={true}>
              More Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
    </div>
  );
};

export default HomeListing;
