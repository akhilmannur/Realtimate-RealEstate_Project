import React from "react";
import { Card, 
  CardHeader,
  CardBody,
  Typography,
  Avatar} from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";

const ChatsideBar = () => {
  return (
    <div>
      <Card className="h-[35rem] sm:h-[35rem] w-full sm:w-[25rem] w-[10rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYoPFYMpFpua5QA4XDZNWezBifJ-LHTvT1b51G_2MJg&s"
            alt="avatar"
            className="h-8 w-8"
          />
        </div>
        <div className="flex ">
          <form className="bg-gray-100 rounded-lg flex p-2 item-center">
            <input
              type="text"
              id="search"
              placeholder="search..."
              className=" p-3 rounded py-1 px-2 bg-transparent focus:outline-none w-20 sm:w-80"
            />
            <button type="submit">
              <FaSearch className="text-slate-600 " />
            </button>
          </form>
        </div>
        <Card color="transparent" shadow={false} className="w-full max-w-[26rem] h-[7rem] sm:h-[8rem]">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar
          size="sm"
          variant="circular"
          src="https://res.cloudinary.com/dstfms4d6/image/upload/v1700824578/Avatar/opedkwre15phg4w9c540.jpg"
          alt="tania andrew"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between h-5">
            <Typography variant="h6" color="blue-gray">
            Hridya Ramesh
            </Typography>
            <div className="5 flex items-center gap-0">
          <p>Today</p>
            </div>
          </div>
          <Typography color="blue-gray">latest message</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        
      </CardBody>
    </Card>
      </Card>
    </div>
  );
};

export default ChatsideBar;
