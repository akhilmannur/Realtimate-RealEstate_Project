import React, { useState } from "react";
import {
  Typography,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const ContactUs = () => {
  const { currentuser } = useSelector((state) => state.user);
  const userRef=currentuser?.rest?._id;
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber:"",
    enquiryType: "",
    message: "",
   userRef
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res=await axios.post( "/api/contact/sendmessage",contactForm)
      toast.success("message sent successfully")
      console.log(res);
    } catch (error) {
      toast.error(error)
    }
  }
 
  return (
    <>
      <Header />
      <figure className="relative h-[60rem] w-full">
        <img
          className="h-full w-full rounded-xl object-cover object-center"
          src="https://png.pngtree.com/background/20230521/original/pngtree-laptop-is-opened-on-a-dark-background-with-a-house-model-picture-image_2682747.jpg"
          alt="nature image"
        />
        <figcaption className="absolute top-10 left-2/4 flex justify-center w-[calc(100%-4rem)] -translate-x-2/4   rounded-xl border border-white bg-black/75 py-8 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div className=" w-full ">
            <Typography variant="h2" color="white">
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-4 flex flex-col sm:flex-row gap-4 ">
              <div className="sm:flex-1 ">
                <Input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  size="md"
                  onChange={handleInputChange}
                  value={contactForm.firstName}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  size="md"
                  onChange={handleInputChange}
                  value={contactForm.lastName}
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  size="md"
                  onChange={handleInputChange}
                  value={contactForm.phoneNumber}
                />
              </div>
              <div className="flex-1">
                <select  value={contactForm.enquiryType}  onChange={handleInputChange} name="enquiryType"
                 className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md">
                  <option value="">Select EnquiryType</option>
                  <option value="complaint">Complaint</option>
                  <option value="genaralenquiry">GeneralEnquries</option>
                </select>
              </div>
            </div>
            <div className="mb-4 sm:w-[43.5rem]">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                size="md"
                onChange={handleInputChange}
                value={contactForm.email}
              />
            </div>
            <div className="mb-4">
              <Textarea
               type="text"
                placeholder="Your Message"
                size="md"
                name="message"
                onChange={handleInputChange}
                value={contactForm.message}
              />
            </div>
            <div>
              <Button type="submit">send message</Button>
            </div>
            <div className="flex justify-between mt-10 gap-10">
              <div>
                <EnvelopeIcon className="h-20 w-20 text-white" />
                <span className="text-white">
                  <h1>Email us:</h1>
                  <h4>
                    Email us for general queries, including marketing and
                    partnership opportunities.
                  </h4>
                  <p className="text-blue-500 hover:underline cursor-pointer ">
                    akhiledakkat@gmail.com
                  </p>
                </span>
              </div>
              <div>
                <PhoneIcon className="h-20 w-20 text-white" />
                <span className="text-white">
                  <h1>Call us:</h1>
                  <h4>
                    Call us to speak to a member of our team. We are always
                    happy to help.
                  </h4>
                  <p className="cursor-pointer hover:underline hover:text-green-500">
                    9605177652
                  </p>
                </span>
              </div>
            </div>
            </form>
          </div>
        </figcaption>
      </figure>
      <Footer />
    </>
  );
};

export default ContactUs;
