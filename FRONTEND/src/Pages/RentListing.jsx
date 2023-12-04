import React, { useEffect, useState } from "react";
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
import CreateProperty from "../Components/CreateProperty";

const RentListing = () => {
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchRentListings = async () => {
      try {
        const res = await axios.get("/api/list/getlistings?type=rent");
        const data = await res.data;
        setRentListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRentListings();
  }, []);

  return (
    <div>
        <CreateProperty/>
      
      {rentListings && rentListings.length > 0 && (
        <div className="mx-10 border-t-2 border rounded-lg shadow-lg my-5">
          <h1 className="text-2xl font-semibold text-center m-5">
            Plots For Rent
          </h1>
          <div className=" flex flex-wrap gap-6 mt-10  sm:mx-auto sm:justify-center p-3 max-w-[75rem] ">
            {rentListings.map((listing) => (
              <Card
                className=" max-w-[16rem] max-h-[30rem] shadow-lg  flex-shrink-0"
                listing={listing}
                key={listing._id}
              >
                <CardHeader floated={false} color="blue-gray">
                  <img
                    src={listing.ListingimageUrls[0]}
                    alt="ui/ux review check"
                    className="h-40 w-50 object-cover object-center"
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
                      {listing.name}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdLocationOn className="h-4 w-4 text-green-700" />
                    <Typography className="text-sm text-gray-600 truncate line-clamp-1 w-16rem">
                      {listing.address}
                    </Typography>
                  </div>
                  <Typography color="gray" className=" line-clamp-1 w-16rem">
                    {listing.description}
                  </Typography>
                  <div className="mb-3 flex items-center justify-between">
                    <Typography
                      variant="h5"
                      className="font-medium bg-green-200 rounded-lg w-20 text-center my-2"
                    >
                      {listing.type}
                    </Typography>
                  </div>
                  <div className="mb-3 flex items-center justify-between">
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="font-medium"
                    >
                      Rs
                      {listing.offer
                        ? listing.regularPrice.toLocaleString("en-IN")
                        : listing.discountPrice.toLocaleString("en-IN")}
                      {listing.type === "rent" && " / month"}
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
      )}
    </div>
  );
};

export default RentListing;
