import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import axios from "axios";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../Components/Contact";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const { currentuser } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/list/${params.listingId}/getlisting`,
          {
            headers: {
              Authorization: `${currentuser?.data}`,
            },
          }
        );
        const data = await res.data;
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data?.list);

        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listing]);
  const handleRedeemClick = () => {
    setShowInput(true);
  };

  const handleApplyCoupon = async (formData) => {
    try {
      const res = await axios.post(
        "/api/coupon/applycoupon",
        { propertyId: listing._id, couponCode: formData.couponCode }
      );

      const data = res.data;
      if (data.success) {
        if (data.alreadyApplied) {
          toast.warning("Coupon has already been applied");
        } else {
          setDiscountedPrice(data.discountedPrice);
          toast.success("Successfully applied");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred", error);
    }
    setShowInput(false);
  };

  return (
    <>
      <Header />
      <main className="border border-gray-300 shadow-lg rounded-lg sm:w-[50rem] w-[25rem] mx-auto h-full mt-5">
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && (
          <p className="text-center my-7 text-2xl">
            Something went wrong!{error.message}
          </p>
        )}
        {listing && !loading && !error && (
          <div>
            <Swiper navigation>
              {listing.ListingimageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[30rem] w-[30rem] mt-5 mx-auto "
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="fixed top-[13%] right-[5%]z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
              <FaShare
                className="text-black"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className="fixed top-[13%] right-[80%] z-10 rounded-md bg-white p-2">
                Link copied!
              </p>
            )}
            <div className="flex flex-col w-full  p-3 my-7 gap-4 mx-10">
              <p className="text-2xl font-semibold">
                {listing.name} - Rs{" "}
                {discountedPrice !== null
                  ? `Discounted Price: ${discountedPrice.toLocaleString(
                      "en-IN"
                    )}`
                  : `Regular Price: ${listing.regularPrice.toLocaleString(
                      "en-IN"
                    )}`}
                {listing.type === "rent" && " / month"}
              </p>
              <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
                <FaMapMarkerAlt className="text-green-700" />
                {listing.address}
              </p>
              <div className="flex gap-4">
                <p className="bg-red-900 w-full max-w-[100px] text-white text-center p-1 rounded-md">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && listing.type === "rent" && (
                  <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    Rs{listing.discountPrice} OFF every month
                  </p>
                )}
                {listing.offer && listing.type === "sell" && (
                  <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    Rs{listing.discountPrice} off
                  </p>
                )}
              </div>
              <p className="text-slate-800">
                <span className="font-semibold text-black">Description - </span>
                {listing.description}
              </p>
              <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBed className="text-lg" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds `
                    : `${listing.bedrooms} bed `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBath className="text-lg" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths `
                    : `${listing.bathrooms} bath `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaParking className="text-lg" />
                  {listing.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaChair className="text-lg" />
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>
              <div>
                {!showInput && (
                  <Button onClick={handleRedeemClick}>Redeem Coupon</Button>
                )}
                {showInput && (
                  <div>
                    <form onSubmit={handleSubmit(handleApplyCoupon)}>
                      <input
                        className="block w-[20rem] mb-4 px-4 py-2 border border-gray-300 rounded-md"
                        type="text"
                        placeholder="Enter coupon code"
                        name="couponCode"
                        {...register("couponCode", {
                          required: "Coupon code is required",
                        })}
                      />
                      {errors.couponCode && (
                        <p className="text-red-500 text-sm">
                          {errors.couponCode.message}
                        </p>
                      )}
                      <Button type="submit">Apply</Button>
                    </form>
                  </div>
                )}
              </div>

              {currentuser &&
                listing?.userRef !== currentuser?.rest._id &&
                !contact && (
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <button
                      onClick={() => setContact(true)}
                      className="bg-black text-white rounded-lg uppercase hover:opacity-95 p-3 w-[20rem]"
                    >
                      Contact Owner
                    </button>
                    <button
                      className="bg-black text-white rounded-lg uppercase hover:opacity-95 p-3 w-[20rem]"
                      onClick={() => {
                        navigate("/chatbox");
                      }}
                    >
                      LiveChat
                    </button>
                  </div>
                )}
              {contact && <Contact listing={listing} />}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Listing;
