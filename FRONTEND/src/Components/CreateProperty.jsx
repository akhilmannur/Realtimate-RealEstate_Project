import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import{ Link }from "react-router-dom";

const CreateProperty = () => {
  return (
    <div className="flex flex justify-center mt-10 sm:mx-5">
      <Card className="w-full max-w-[48rem] flex-row ">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img
            src="https://www.nyrentownsell.com/blog/wp-content/uploads/2021/01/buying-a-home.jpg"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            RealtiMate
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            You Can Create Your Own Properties Completely Free
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Real estate is an imperishable asset, ever increasing in value. It
            is the most solid security that human ingenuity has devised. It is
            the basis of all security and about the only indestructible security
          </Typography>
          <Link to={"/createlisting"}>
            <Button variant="text" className="flex items-center gap-2">
              Create Your Property
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateProperty;
