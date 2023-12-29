import { Card, Input } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "/api/auth/forgotpassword",
        { email }
      );
      console.log(res);

      toast.success("A recovery link has been sent to your email");
    } catch (error) {
      toast.error("Failed to send the recovery link. Please try again.");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex justify-center items-center my-[10rem]">
      <Card className="h-[10rem] w-[30rem] p-4 gap-4">
        <h2 className="font-bold text-2xl">Enter Your email</h2>
        <Input
          placeholder="enter your email"
          onChange={handleEmailChange}
          value={email}
        />
        <button
          className="bg-black text-white rounded-lg w-20"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </Card>
    </div>
  );
};

export default ForgetPassword;
