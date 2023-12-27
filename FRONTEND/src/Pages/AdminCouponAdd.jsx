import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { Typography, } from "@material-tailwind/react";
import { toast } from "react-toastify";

const AddCouponForm = () => {
  const navigate= useNavigate()
  const [couponData, setCouponData] = useState({
    code: "",
    discountType: "",
    discountAmount: 0,
    minimumPurchase: 0,
    expirationDate: "",
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/coupon/addcoupon",
        couponData
      );
     toast.success("coupon added successfully")
     navigate("/adminhome/admincoupondetails")
    } catch (error) {
   toast.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto w-[355rem]  h-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg h-full mt-10"
      >
        <Typography variant="h6" color="blue-gray">
            coupon Code
        </Typography>
        <input
          type="text"
          name="code"
          value={couponData.code}
          onChange={handleInputChange}
          placeholder="Coupon Code"
          className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
          required
        />
         <Typography variant="h6" color="blue-gray">
          Discount type
        </Typography>
        <select
          name="discountType"
          value={couponData.discountType}
          onChange={handleInputChange}
          className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Discount Type</option>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
        <Typography variant="h6" color="blue-gray">
        Discount Amount
        </Typography>
        <input
          type="number"
          name="discountAmount"
          value={couponData.discountAmount}
          onChange={handleInputChange}
          placeholder="Discount Amount"
          className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
          required
        />
          <Typography variant="h6" color="blue-gray">
          Minimum Purchase
        </Typography>
        <input
          type="number"
          name="minimumPurchase"
          value={couponData.minimumPurchase}
          onChange={handleInputChange}
          placeholder="Minimum Purchase"
          className="block w-full mb-4 px-4 py-2 border border-grey-300 rounded-md"
          required
        />
          <Typography variant="h6" color="blue-gray">
          Expiration Date
        </Typography>

        <input
          type="date"
          name="expirationDate"
          value={couponData.expirationDate}
          onChange={handleInputChange}
          placeholder="Expiration Date"
          className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
          required
        />

        <button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        
        >
          Add Coupon
        </button>
      </form>
   
    </div>
  );
};

export default AddCouponForm;
