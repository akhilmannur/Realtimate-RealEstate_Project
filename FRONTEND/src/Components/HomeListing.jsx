import React, { useEffect, useRef, useState } from "react";
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
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const HomeListing = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [offerVisible, setOfferVisible] = useState(4);
  const [saleVisible, setSaleVisible] = useState(4);
  const [rentVisible, setRentVisible] = useState(4);
  const offerScrollRef = useRef(null);
  const rentScrollRef = useRef(null);
  const saleScrollRef = useRef(null);

  const scrollLeft = (scrollRef) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: 0,
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (scrollRef) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: 0,
        left: 400,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await axios.get("/api/list/getlistings?offer=true&limit=6");
        const data = await res.data;
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await axios.get("/api/list/getlistings?type=rent&limit=6");
        const data = await res.data;
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await axios.get("/api/list/getlistings?type=sell&limit=6");
        const data = await res.data;
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {offerListings && offerListings.length > 0 && (
        <div className="mx-10 border rounded-lg shadow-lg my-5">
          <h1 className="text-2xl font-semibold text-slate-600 m-5">
            Recent plots in offer
          </h1>
          <div className="relative flex items-center">
            <div className="absolute top-1/2 transform -translate-y-1/2">
              <button
                className="bg-white text-black p-4 rounded-full"
                onClick={() => {
                  setOfferVisible(offerVisible - 1);
                  scrollLeft(offerScrollRef);
                }}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            </div>
            <div
              className="flex overflow-x-hidden overflow-y-hidden mt-10 gap-5 p-3 py-4 mx-10 w-full"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
              ref={offerScrollRef}
            >
              {offerListings.map((listing) => (
                <Card
                  className=" max-w-[16rem] max-h-[30rem] shadow-lg  flex-shrink-0"
                  listing={listing}
                  key={listing._id}
                >
                  <CardHeader floated={false} color="blue-gray">
                    <img
                      src={listing.ListingimageUrls[0]}
                      alt="ui/ux review check"
                      className="min-h-[15rem] min-w-[18rem] max-h-[15rem] max-w-[15rem] object-cover"
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
                      </Typography>
                    </div>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Link to={`/listing/${listing._id}`}>
                      <Button size="lg" fullWidth={true}>
                        More Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
              {offerVisible < offerListings.length && (
                <button
                  className="bg-white text-black p-4 rounded-full absolute right-0 top-2/4 transform -translate-y-2/4"
                  onClick={() => {
                    setOfferVisible(offerVisible + 1);
                    scrollRight(offerScrollRef);
                  }}
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          {offerVisible === offerListings.length && (
            <div className="flex justify-end m-5">
              <p className="text-blue-500 text-xl  cursor-pointer">
                show more Rent lists
              </p>
            </div>
          )}
        </div>
      )}
      {rentListings && rentListings.length > 0 && (
        <div className="mx-10  border rounded-lg shadow-lg my-5">
          <h1 className="text-2xl font-semibold text-slate-600 m-5">
            Recent plots for Rent
          </h1>
          <div className="relative flex items-center">
            <div className="absolute top-1/2 transform -translate-y-1/2">
              <button
                className="bg-white text-black p-4 rounded-full"
                onClick={() => {
                  setRentVisible(rentVisible - 1);
                  scrollLeft(rentScrollRef);
                }}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            </div>
            <div
              className="flex overflow-x-hidden overflow-y-hidden mt-10 gap-5 p-3 py-4 mx-10 w-full"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
              ref={rentScrollRef}
            >
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
                      className="min-h-[15rem] min-w-[18rem] max-h-[15rem] max-w-[15rem] object-cover"
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
                    <Link to={`/listing/${listing._id}`}>
                      <Button size="lg" fullWidth={true}>
                        More Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
              {rentVisible < rentListings.length && (
                <button
                  className="bg-white text-black p-4 rounded-full absolute right-0 top-2/4 transform -translate-y-2/4"
                  onClick={() => {
                    setRentVisible(rentVisible + 1);
                    scrollRight(rentScrollRef);
                  }}
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          {rentVisible === rentListings.length && (
            <div className="flex justify-end m-5">
              <p className="text-blue-500 text-xl cursor-pointer">
                show more Rent lists
              </p>
            </div>
          )}
        </div>
      )}

      {saleListings && saleListings.length > 0 && (
        <div className="mx-10  border  rounded-lg shadow-lg my-5">
          <h1 className="text-2xl font-semibold text-slate-600 m-5">
            Recent plots for Sale
          </h1>
          <div className="relative flex items-center">
            <div className="absolute top-1/2 transform -translate-y-1/2">
              <button
                className="bg-white text-black p-4 rounded-full"
                onClick={() => {
                  setSaleVisible(saleVisible - 1);
                  scrollLeft(saleScrollRef);
                }}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            </div>
            <div
              className="flex overflow-x-hidden overflow-y-hidden mt-10 gap-5 p-3 py-4 mx-10 w-full"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
              ref={saleScrollRef}
            >
              {saleListings.map((listing) => (
                <Card
                  className=" max-w-[16rem] max-h-[30rem] shadow-lg  flex-shrink-0"
                  listing={listing}
                  key={listing._id}
                >
                  <CardHeader floated={false} color="blue-gray">
                    <img
                      src={listing.ListingimageUrls[0]}
                      alt="ui/ux review check"
                      className="min-h-[15rem] min-w-[18rem] max-h-[15rem] max-w-[15rem] object-cover"
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
                        {listing.regularPrice.toLocaleString("en-IN")}
                      </Typography>
                    </div>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Link to={`/listing/${listing._id}`}>
                      <Button size="lg" fullWidth={true}>
                        More Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
              {saleVisible < saleListings.length && (
                <button
                  className="bg-white text-black p-4 rounded-full absolute right-0 top-2/4 transform -translate-y-2/4"
                  onClick={() => {
                    setSaleVisible(saleVisible + 1);
                    scrollRight(saleScrollRef);
                  }}
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          {saleVisible === saleListings.length && (
            <div className="flex justify-end m-5">
              <p className="text-blue-500 text-xl  cursor-pointer">
                show more Rent lists
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeListing;
