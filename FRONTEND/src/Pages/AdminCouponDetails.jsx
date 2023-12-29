import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

const AdminCouponDetails = () => {
  const [coupons, setCoupons] = useState([]);
  const [editedCoupons, setEditedCoupons] = useState({});
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("/api/coupon/getallcoupons");
        setCoupons(response.data.coupons);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoupons();
  }, []);

  const handleDelete = async (couponId) => {
    try {
      const response = await axios.delete(
        `/api/coupon/${couponId}/deletecoupon`
      );
      console.log(response.data);
      setCoupons((prev) => prev.filter((coupon) => coupon._id !== couponId));
      toast.success("deleted succesfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCoupons({ ...editedCoupons, [name]: value });
  };
  const handleSelectChange = (value, name) => {
    setEditedCoupons({ ...editedCoupons, [name]: value });

  };
  const handleOpen = (couponId) => {
    const editedCoupon = coupons.find((coupon) => coupon._id === couponId);
    setEditedCoupons(editedCoupon || {});
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/coupon/${editedCoupons._id}/editcoupon`,
        editedCoupons
      );
      toast.success("Updated coupon successfully");
      const updatedCoupon = response.data;
      console.log(updatedCoupon);
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon._id === updatedCoupon?.coupon?._id ? updatedCoupon : coupon
        )
      );

      setOpen(false);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
    window.location.reload()
  };

  return (
    <div className="container mx-auto p-4 mt-4 gap-2">
      <Link to="/adminhome/admincouponadd">
        <Button className="mb-3">Addmore</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <div
            className="relative bg-white p-4 shadow-md rounded-md"
            key={coupon._id}
          >
            <div className="absolute top-2 right-2 flex">
              <button className="mr-2">
                <TrashIcon
                  className="h-5 w-5 text-blue-gray-500"
                  onClick={() => handleDelete(coupon._id)}
                />
              </button>
              <button>
                <PencilIcon
                  className="h-5 w-5  text-blue-gray-500"
                  onClick={() => handleOpen(coupon._id)}
                />
              </button>
            </div>

            <h2 className="text-lg font-semibold mb-2">{coupon.code}</h2>
            <p>Discount Type: {coupon.discountType}</p>
            <p>Discount Amount: {coupon.discountAmount}</p>
            <p>Minimum Purchase: {coupon.minimumPurchase}</p>
            <p>
              {coupon.expirationDate
                ? moment(coupon.expirationDate).format("DD-MM-YYYY")
                : "Invalid date"}
            </p>
          </div>
        ))}
        <>
          <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
          >
            <Card className="mx-auto w-full max-w-[24rem]">
              <form onSubmit={handleSubmit}>
                <CardBody className="flex flex-col gap-4">
                  {editedCoupons && (
                    <>
                      <Typography variant="h4" color="blue-gray">
                        Edit Coupon
                      </Typography>
                      <Typography className="-mb-2" variant="h6">
                        Coupon Code
                      </Typography>
                      <Input
                        label="Coupon Code"
                        name="code"
                        size="lg"
                        variant="outlined"
                        value={editedCoupons.code || ""}
                        onChange={handleChange}
                      />
                      <Typography className="-mb-2" variant="h6">
                        Discount Type
                      </Typography>
                      <Select
                        label="Discount Type"
                        name="discountType"
                        size="lg"
                        variant="outlined"
                        onChange={(value) =>
                          handleSelectChange(value, "discountType")
                        }
                        value={editedCoupons.discountType || ""}
                      >
                        <Option value="">Select Discount Type</Option>
                        <Option value="percentage">Percentage</Option>
                        <Option value="fixed">Fixed</Option>
                      </Select>
                      <Typography className="-mb-2" variant="h6">
                        Discount Amount
                      </Typography>
                      <Input
                        label="Discount Amount"
                        name="discountAmount"
                        size="lg"
                        variant="outlined"
                        onChange={handleChange}
                        value={editedCoupons.discountAmount || ""}
                      />
                      <Typography className="-mb-2" variant="h6">
                        Minimum Purchase
                      </Typography>
                      <Input
                        label="Minimum Purchase"
                        name="minimumPurchase"
                        size="lg"
                        variant="outlined"
                        onChange={handleChange}
                        value={editedCoupons.minimumPurchase || ""}
                      />
                      <Typography className="-mb-2" variant="h6">
                        Expiration Date
                      </Typography>
                      <Input
                        label="Expiration Date"
                        name="expirationDate"
                        size="lg"
                        type="date"
                        variant="outlined"
                        onChange={handleChange}
                        value={
                          editedCoupons.expirationDate
                            ? moment(editedCoupons.expirationDate).format("YYYY-MM-DD")
                            : ""
                        }
                      />
                    </>
                  )}
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="gradient" type="submit" fullWidth>
                    Update
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </Dialog>
        </>
      </div>
    </div>
  );
};

export default AdminCouponDetails;
