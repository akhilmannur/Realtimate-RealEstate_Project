import React from "react";
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

const AdminUSerProfile = () => {
  return (
  <div>
      <div className="flex gap-10 flex-col sm:flex-row ">
        <Card className="h-[calc(60vh-2rem)] w-full max-w-[20rem] p-2 shadow-xl shadow-blue-gray-900/5 m-5 ">
          <div className=" p-2 flex justify-center items-center">
            <Typography variant="h2" color="blue-gray">
              UserProfile
            </Typography>
          </div>
          <div className="flex justify-center items-center h-[40rem]">
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
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
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="tania andrew"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  Tania Andrew
                </Typography>
              </div>
              <Typography color="blue-gray">Frontend Lead @ Google</Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <Typography>
              &quot;I found solution to all my design needs from Creative Tim. I
              use them as a freelancer in my hobby projects for fun! And its
              really affordable, very humble guys !!!&quot;
            </Typography>
          </CardBody>
        </Card>
      </div>
      <div>
      </div>
    <div className="flex justify-center">
      <Card className=" mx-10 h-full w-full ">
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
        <CardBody className=" px-0">
          <table className="w-full min-w-max table-auto text-left">
            
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      alt=".."
                      size="md"
                      className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                    />
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    ></Typography>
                  </div>
                </td>
                <td>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  ></Typography>
                </td>
                <td>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  ></Typography>
                </td>
                <td>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                      <Avatar
                        src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                        size="sm"
                        alt="mastercard"
                        variant="square"
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal capitalize"
                      ></Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      ></Typography>
                    </div>
                  </div>
                </td>
                <td>
                  <Tooltip content="Edit User">
                    <IconButton variant="text">
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
      </div>
</div>
  );
};

export default AdminUSerProfile;
