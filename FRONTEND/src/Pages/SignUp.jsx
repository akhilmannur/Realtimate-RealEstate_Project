import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import OAuth from "../Components/OAuth";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.string(),
    username: yup
      .string()
      .matches(/^[a-zA-Z0-9_]{3,30}$/, "Username contain min 3 characters")
      .required(),
    email: yup.string().email().required(),
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

  const handleResponse = (data) => {
    if (data.success === false) {
      if (data.message === "User already exists with this email.") {
        toast.error("User already exists with this email id");
      } else {
        toast.error(data.message);
      }
    } else {
      toast.success(data.message);
      navigate("/sign-in");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      setLoading(true);

      const response = await axios.post("/api/auth/signup", formData);
      const data = response.data;
      handleResponse(data);
    } catch (error) {
      toast.error("no matching validations please check your credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header/>
  <div className="bg-white p-10 max-w-md mx-auto border shadow-lg mt-10">
    <h1 className="text-3xl text-center font-bold p-5 uppercase">Sign up</h1>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border rounded-lg p-3"
        id="name"
        placeholder="Full Name"
        onChange={handleChange}
      />
    
      <input
        type="email"
        className="border rounded-lg p-3"
        id="email"
        placeholder="Email Id"
        onChange={handleChange}
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      <input
        type="text"
        className="border rounded-lg p-3"
        id="username"
        placeholder="Username"
        onChange={handleChange}
      />
      {errors.username && <p className="text-red-500">{errors.username}</p>}
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
        {loading ? "Loading..." : "Sign Up"}
      </button>
        <OAuth/>
    </form>
    <div className="flex gap-2 mt-5">
      <p>Already Have an Account?</p>
      <Link to="/sign-in">
        <span className="text-blue-800">click here</span>
      </Link>
    </div>
  </div>
  <Footer/>
  </div>
);
};

export default SignUp;
