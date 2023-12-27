import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import ticket from "../assets/ticket.png";

const HomeCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const handleOpen = (coupon) => {
    setSelectedCoupon(coupon);
    setOpen(true);
  };

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

  const copyToClipboard = async () => {
    if (selectedCoupon) {
      try {
        await navigator.clipboard.writeText(selectedCoupon);

        toast.success("Coupon code copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-4">Available Coupons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="p-10  rounded-lg h-[13rem] "
            style={{
              backgroundImage: `url(${ticket})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p>Discount Type: {coupon.discountType} </p>
            <p> Discount Amount: {coupon.discountAmount}</p>

            <p>Minimum Purchase: {coupon.minimumPurchase}</p>
            <p>
              Expires on:{" "}
              {coupon.expirationDate
                ? moment(coupon.expirationDate).format("DD-MM-YYYY")
                : "Invalid date"}
            </p>

            <div className="flex justify-end mt-4">
              <button
                className=" font-bold "
                onClick={() => handleOpen(coupon.code)}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
      <>
        <Dialog
          size="xs"
          open={open}
          handler={() => setOpen(false)}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Coupon Code
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                Copy this code and Redeem it on the property view section
              </Typography>
              <h3 color="blue-gray">
                {selectedCoupon}
              </h3>
            </CardBody>
            <CardFooter className="pt-0 flex gap-2">
              <Button
                variant="gradient"
                onClick={() => {
                  copyToClipboard();
                  setOpen(false);
                }}
                fullWidth
              >
                Copy code
              </Button>
              <Button
                variant="gradient"
                onClick={() => setOpen(false)}
                fullWidth
              >
                close
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </>
    </div>
  );
};

export default HomeCoupon;
