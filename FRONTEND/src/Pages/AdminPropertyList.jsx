import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Avatar,
  // DialogFooter,
} from "@material-tailwind/react";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import axios from "axios";
import Pagination from "./pagination";
import { Carousel } from "@material-tailwind/react";

const ITEMS_PER_PAGE = 4;

const AdminPropertyList = () => {
  const [Property, setProperty] = useState([]);
  const [propertyById, setPropertyById] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const handleOpen = (id) => {
    setOpen(true);
    setSelectedPropertyId(id);
  };
  useEffect(() => {
    const fetchPropertyList = async () => {
      try {
        const res = await axios.get("/api/admin/getalllisting");
        const data = await res.data;
        setProperty(data.listing);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPropertyList();
  }, []);

  const fetchPropertyListById = async (id) => {
    try {
      const res = await axios.get(`/api/admin/getListingById/${id}`);
      const data = await res.data;
      setPropertyById(data);
    } catch (error) {
      error.message(error);
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentList = Property.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex sm:flex-row flex:col flex-wrap w-full">
      {currentList.map((listing, index) => (
        <Card
          className="sm:max-w-[18rem] sm:max-h-[25rem] max-w-[5rem] max-h-[5rem] m-5 sm:[mt-20 ] mx-auto"
          key={index}
        >
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src={listing.ListingimageUrls[0]}
              alt="card-image"
              className="min-h-[15rem] min-w-[18rem] max-h-[15rem] max-w-[15rem] object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between">
              <Typography color="blue-gray" className="font-medium">
                {listing.name}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                Rs{listing.regularPrice.toLocaleString("en-IN")}
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75  line-clamp-1 w-30"
            >
              {listing.description}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="font-medium bg-green-200 rounded-lg w-20 text-center my-2"
            >
              {listing.type}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-black text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              onClick={() => {
                fetchPropertyListById(listing._id);
                handleOpen(listing._id);
              }}
            >
              View
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Dialog open={open} handler={() => handleOpen(null)}>
        <DialogHeader>PropertyListing</DialogHeader>
        <Carousel>
          <img
            src={propertyById?.Listings?.ListingimageUrls[0]}
            alt="image 1"
            className="h-[20rem] w-full object-cover"
          />
          <img
            src={propertyById?.Listings?.ListingimageUrls[1]}
            alt="image 1"
            className="h-[20rem] w-full object-cover"
          />
          <img
            src={propertyById?.Listings?.ListingimageUrls[2]}
            alt="image 1"
            className="h-[20rem] w-full object-cover"
          />
        </Carousel>
        <DialogBody className="h-[20rem] overflow-scroll ">
          {propertyById ? (
            <div>
              <Typography className="text-3xl text-3xl font-bold">
                {propertyById?.Listings?.name}
              </Typography>
              <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
                <Typography>Posted By</Typography>
                <div className="flex items-center">
                  <Card
                    className="w-[10rem] flex items-center"
                    color="transparent"
                    shadow={false}
                  >
                    <Avatar
                      size="sm"
                      variant="circular"
                      src={propertyById?.Listings?.userRef.avatar}
                      alt="avatar"
                    />
                    <div className="ml-2">
                      <Typography variant="h5" color="blue-gray">
                        {propertyById?.Listings?.userRef.name}
                      </Typography>
                    </div>
                  </Card>
                </div>

                <Typography className="text-2xl font-semibold">
                  Rs{" "}
                  {propertyById?.Listings?.offer
                    ? propertyById?.Listings?.regularPrice.toLocaleString(
                        "en-IN"
                      )
                    : propertyById?.Listings?.discountPrice.toLocaleString(
                        "en-IN"
                      )}
                  {propertyById?.Listings?.type === "rent" && " / month"}
                </Typography>
                <Typography className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
                  <FaMapMarkerAlt className="text-green-700" />
                  {propertyById?.Listings?.address}
                </Typography>
                <div className="flex gap-4">
                  <Typography className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    {propertyById?.Listings?.type === "rent"
                      ? "For Rent"
                      : "For Sale"}
                  </Typography>
                  {propertyById?.Listings?.offer && (
                    <Typography className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                      Rs{propertyById?.Listings?.discountPrice} OFF every month
                    </Typography>
                  )}
                </div>
                <Typography className="text-slate-800">
                  <span className="font-semibold text-black">
                    Description -{" "}
                  </span>
                  {propertyById?.Listings?.description}
                </Typography>
                <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaBed className="text-lg" />
                    {propertyById?.Listings?.bedrooms > 1
                      ? `${propertyById?.Listings?.bedrooms} beds `
                      : `${propertyById?.Listings?.bedrooms} bed `}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaBath className="text-lg" />
                    {propertyById?.Listings?.bathrooms > 1
                      ? `${propertyById?.Listings?.bathrooms} baths `
                      : `${propertyById?.Listings?.bathrooms} bath `}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaParking className="text-lg" />
                    {propertyById?.Listings?.parking
                      ? "Parking spot"
                      : "No Parking"}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaChair className="text-lg" />
                    {propertyById?.Listings?.furnished
                      ? "Furnished"
                      : "Unfurnished"}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Typography>No property details available</Typography>
          )}
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogBody>
      </Dialog>

      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={Property.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default AdminPropertyList;
