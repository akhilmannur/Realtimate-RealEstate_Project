import { Card, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(document.location.search);
  const queryValues = searchParams.get("token");
  const [password, setPassword] = useState("");

  const passwordSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post(
        "/api/auth/resetpassword",
        { password, queryValues }
      );

      navigate("/sign-in");
      toast.success("Password reset successful");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center my-[10rem]">
        <Card className="h-[10rem] w-[30rem] p-4 gap-4">
          <h2 className="font-bold text-2xl">Reset Your password</h2>
          <form onSubmit={passwordSubmit}>
            <Input
              placeholder="enter new password"
              type="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-black text-white rounded-lg w-20 mt-4"
              type="submit"
            >
              Submit
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
