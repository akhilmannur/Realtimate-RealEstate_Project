import React, { useState, useRef,  } from "react";
import {
  Typography,
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import {
  updateUserStart,
  updateUserFailure,
  updateUserAvatar,

} from "../redux/user/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FaEdit, FaSignOutAlt, FaCamera } from "react-icons/fa";
import axios from "axios";
import AvatarUpload from "./AvatarUpload";


const Profile = () => {
  const { currentuser, loading, error } = useSelector((state) => state.user);
  const avatarUrl = currentuser?.rest?.avatar;
  const [open, setOpen] = React.useState(false);
  const [avatar, setavatar] = useState(null);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen((cur) => !cur);

  // console.log(currentuser);
  const handleFileUpload = async () => {
    try {
      dispatch(updateUserStart());
      const url = await AvatarUpload(avatar);
      // console.log(url);

     await axios.put(
        `http://localhost:3000/api/user/${currentuser?.rest?._id}/avatar`,
        {
          Avatar: url,
        },
        {
          headers: {
            Authorization: `${currentuser?.data}`,
          },
        }
      );    
      dispatch(updateUserAvatar(url));
    } catch (error) {
      console.log("from upload", error.message);
      dispatch(updateUserFailure(error.message));
    }
  };
  const uploadavatar = async (e) => {
    setavatar(e.target.files[0]);
  };
  return (
    <div>
      <figure className="relative h-96 w-full">
        <img
          className="h-full w-full rounded-xl object-cover object-center"
          src="https://www.contemporist.com/wp-content/uploads/2023/09/modern-house-dark-brick-exterior-040923-931-01.jpg"
          alt="nature image"
        />
        <div className="absolute top-5 right-5 p-2 text-white">
          <FaEdit size={30} />
        </div>
        <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-3rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div>
            <Typography variant="h5" color="blue-gray">
              {currentuser?.rest?.name}
            </Typography>
            <Typography color="gray" className="mt-2 font-normal">
              USER
            </Typography>
          </div>
          <div className="flex flex-col justify-center align-center ">
            <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
              <img
                className="w-24 h-24 mb-4 rounded-full object-cover cursor-pointer self-center "
                src={avatarUrl}
                alt="profile image"
              />
              <div className="absolute bottom-0 left-11 ml-3 mb-2  text-white">
                <FaCamera size={24} />
              </div>
            </div>
            <Typography color="gray" className="font-normal">
              {currentuser?.rest?.username}
            </Typography>
            
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-1">
              <FaEdit size={18} onClick={handleOpen} />
              <Typography color="gray" onClick={handleOpen}>
                Edit
              </Typography>
            </div>
            <div className="flex items-center gap-1">
              <FaSignOutAlt size={18} />
              <Typography color="gray">Logout</Typography>
            </div>
          </div>
        </figcaption>
      </figure>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              EDIT YOUR PROFILE
            </Typography>
            <input
              onChange={(e) => uploadavatar(e)}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              className="w-24 h-24 mb-4 rounded-full object-cover cursor-pointer self-center "
              src={avatarUrl}
              alt="profile image"
              onClick={() => fileRef.current.click()}
            />
            <div className="flex flex-col justify-between items-end">
              <div className="flex items-center gap-4">
                <label htmlFor="avatar" className="cursor-pointer">
                  <FaCamera size={18} />
                </label>
                <input
                  id="avatar"
                  onChange={(e) => uploadavatar(e)}
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                />
                <FaSignOutAlt
                  size={18}
                  onClick={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <Typography className="-mb-2" variant="h6">
              username
            </Typography>

            <Input
              label="username"
              size="lg"
              id="username"
              name="username"
              autoComplete="username"
            />
            <Typography className="-mb-2" variant="h6">
              email
            </Typography>

            <Input
              label="email"
              size="lg"
              id="email"
              name="email"
              autoComplete="email"
            />
            <Typography className="-mb-2" variant="h6">
              password
            </Typography>

            <Input
              label="password"
              size="lg"
              id="password"
              name="password"
              autoComplete="current-password"
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={() => handleFileUpload}>save</Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};

export default Profile;
