import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import{  adminSignInStart,
  adminSignInSuccess,
  adminSignInFailure} from "../redux/user/adminSlice"
import OAuth from "../Components/OAuth";
import Header from "../Components/Header";
import Footer from "../Components/Footer";


const SignIn = () => {
  const { loading, error} = useSelector(
    (state) => state.user
  );
  const { loadingg, errorr} = useSelector(
    (state) => state.admin
  );
  const [_, setCookie] = useCookies(["token"]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    username: yup
      .string()
      .matches(/^[a-zA-Z0-9_]{3,30}$/, "Username is not valid")
      .required(),

    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z0-9])(?=.*[@#$%^&+=!])([A-Za-z0-9@#$%^&+=!]{8,30})$/,
        "Use at least 8 characters with a mix of uppercase and lowercase letters, numbers, and special symbols "
      )
      .required(),
  });

  const handleChange = async (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    try {
      await validationSchema.validateAt(id, formData);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: undefined,
      }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: error.message,
      }));
    }
  };
  const handleLoginResponse = (data) => {
    if (data.status === "error") {
      if (
        data.message === "User not found" ||
        data.message === "Incorrect password"
      ) {
        toast.error("Invalid username or password. Please try again.");
        dispatch(signInFailure(error.message));
      } else {
        toast.error(data.message);
        dispatch(signInFailure(data.message));
      }
    } else if (data.status === "admin_success") {
      toast.success("Admin login successful!");
    } else if (data.status === "user_success") {
      toast.success("User login successful!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      dispatch(signInStart()) 

      const Response = await axios.post("/api/auth/signin", formData);
      const Data = Response.data;

      if (Data.status === "admin_success") {
        setCookie("token", Data.data);
        navigate("/adminhome");
        handleLoginResponse(Data);
        dispatch(adminSignInSuccess(Data));
      } else if (Data.status === "user_success") {
        setCookie("token", Data.data);
        navigate("/");
    
        handleLoginResponse(Data);
        dispatch(signInSuccess(Data));
      } else {
        handleLoginResponse(Data);
        if (Data.status === "admin_failure") {
          dispatch(adminSignInFailure());
        } else {
          dispatch(signInFailure());
        }
      }
    } catch (error) {
      toast.error("No matching validations. Please check your credentials.");
      if (errorr) {
        dispatch(adminSignInFailure(errorr.message));
      } else {
        dispatch(signInFailure(error.message));
      }
    
    }
  };

  return (
    <div>
    <Header/>
    <div className="bg-white p-10 max-w-md mx-auto border shadow-lg mt-12">
      <h1 className="text-3xl text-center font-bold p-5 uppercase">login</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {errors.username && <p className="text-red-500">{errors.username}</p>}
        <input
          type="text"
          className="border rounded-lg p-3 "
          id="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          type="password"
          className="border rounded-lg p-3"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <button
          disabled={loading}
          className="bg-black text-white p-4 rounded-lg uppercase hover:opacity-75 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have account </p>
        <Link to="/sign-up">
          <span className="text-blue-800">click here</span>
        </Link>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default SignIn;
