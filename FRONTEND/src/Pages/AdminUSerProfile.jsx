import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Avatar,
  CardHeader,
  CardBody,
  Button,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminUSerProfile = () => {
  const [userById, setUserById] = useState({});
  const [listingByUser, setListingByUser] = useState([]);
  const params = useParams();
  const { userId } = params;

  const fetchUserById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/admin/getUserById/${userId}`
      );
      const data = res.data;
      setUserById(data);
    } catch (error) {
      error.message(error);
    }
  };

  const fetchPropertyList = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/admin/getpropertiesByUser/${userId}`
      );
      const data = res.data;
      setListingByUser(data);
    } catch (error) {
      error.message(error);
    }
  };

  useEffect(() => {
    fetchUserById();
    fetchPropertyList();
  }, []);
  console.log(listingByUser);

  return (
    <div>
      <div className="flex gap-10 flex-col sm:flex-row">
        <Card className="h-[calc(60vh-2rem)] w-full sm:max-w-[20rem] max-w-[15rem] p-2 shadow-xl shadow-blue-gray-900/5 m-5 ">
          <div className=" p-2 flex justify-center items-center">
            <Typography variant="h2" color="blue-gray">
              UserProfile
            </Typography>
          </div>
          <div className="flex justify-center items-center h-[40rem]">
            <Avatar
              src={userById?.users?.avatar}
              alt="avatar"
              className="w-40 h-40 object-cover rounded-full"
            />
          </div>
        </Card>
        <Card
          color="transparent"
          shadow={false}
          className="w-full max-w-[26rem] m-5"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
            <Avatar
              size="lg"
              variant="circular"
              src={userById?.users?.avatar}
              alt="tania andrew"
              className="h-10 w-10"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  {userById?.users?.name}
                </Typography>
              </div>
              <Typography color="blue-gray">
                Username: {userById?.users?.username}
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <Typography>Email: {userById?.users?.email}</Typography>
            <div className="flex gap-4 mt-10">
              <Button className="bg-red-500 gap-4">Block</Button>
              <Button className="bg-green-500">UnBlock</Button>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex justify-center sm:mx-60 mx-4">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" color="blue-gray">
                  User Posted Property Lists
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          { listingByUser.length > 0 ?(
          listingByUser.map((listing) => (
            <CardBody className="px-0" key={listing._id}>
              <div className="w-full min-w-max ">
                <div className="flex items-center  justify-around">
                  <Avatar
                    src={listing.ListingimageUrls[0]}
                    alt=".."
                    size="md"
                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                  />
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    {listing.name}
                  </Typography>

                  <Button>view</Button>
                </div>
              </div>
            </CardBody>
          ))):(
            <CardBody className="px-0">
            <div className="flex items-center justify-center h-20">
              <Typography variant="small" color="blue-gray">
                No listing posted by this user.
              </Typography>
            </div>
          </CardBody>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminUSerProfile;
