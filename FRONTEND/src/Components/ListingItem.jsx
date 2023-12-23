import React from "react";
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { MdLocationOn } from "react-icons/md";

const ListingItem = ({ listing }) => {
  return (
    <div>
        <Card className=" max-w-[16rem] max-h-[30rem] shadow-lg">
          <CardHeader floated={false} color="blue-gray">
            <img src={listing.ListingimageUrls[0]} alt="ui/ux review check" className="h-40 object-cover object-center"  />
            <div className="to-bg-black-10 absolute inset-0 h-full w-30 bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          </CardHeader>
          <CardBody>
            <div className="mb-3 flex items-center justify-between">
              <Typography variant="h5" color="blue-gray" className="font-medium">
                {listing.name}
              </Typography>
            </div>
            <div className="flex items-center gap-1">
              <MdLocationOn className="h-4 w-4 text-green-700" />
              <Typography className="text-sm text-gray-600 truncate">
                {listing.address}
              </Typography>
            </div>
            <Typography color="gray" className=" line-clamp-1 w-30">
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
              <Typography variant="h5" color="blue-gray" className="font-medium">
                Rs
             
                  { listing.regularPrice.toLocaleString("en-IN")}
                {listing.type === "rent" && " / month"}
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
          <Link to={`/listing/${listing._id}`}>
            <Button size="lg" fullWidth={true}>
              
              More Details
            </Button></Link>
          </CardFooter>
        </Card>
    </div>
  );
};

export default ListingItem;
