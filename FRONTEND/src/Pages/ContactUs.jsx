import React from "react";
import {
  Typography,
  Input,
  Select,
  Textarea,
  Button,
  Option,
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const ContactUs = () => {
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
            <div className="mb-4 mt-4 flex flex-col sm:flex-row gap-4 ">
              <div className="sm:flex-1 ">
                <Input
                  type="text"
                  placeholder="First Name"
                  size="md"
                  outline={false}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Last Name"
                  size="md"
                  outline={false}
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  size="md"
                  outline={false}
                />
              </div>
              <div className="flex-1">
                <Select color="" size="md" outline={false} value="select">
                  <Option Value="" >
                    Option 1
                  </Option>
                  <Option value="2">
                    Option 2
                  </Option>
                  <Option value="3" >
                    Option 3
                  </Option>
                </Select>
              </div>
            </div>
            <div className="mb-4 sm:w-[43.5rem]">
              <Input
                type="email"
                placeholder="Email"
                size="md"
                outline={false}
              />
            </div>
            <div className="mb-4">
              <Textarea placeholder="Your Message" size="md" outline={false} />
            </div>
            <div>
              <Button color="lightBlue" ripple="light">
                send message
              </Button>
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
          </div>
        </figcaption>
      </figure>
      <Footer />
    </>
  );
};

export default ContactUs;
