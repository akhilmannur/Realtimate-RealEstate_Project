import React, { useState, useRef } from "react";
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
  updateUserDetails,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserSuccess,
  signOutUserFailure
} from "../redux/user/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  FaEdit,
  FaSignOutAlt,
  FaCamera,
  FaCheck,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
import AvatarUpload from "./AvatarUpload";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const Profile = () => {
  const { currentuser, loading, error } = useSelector((state) => state.user);
  const avatarUrl = currentuser?.rest?.avatar;
  const [open, setOpen] = React.useState(false);
  const [avatar, setavatar] = useState(null);
  const [formData, setFormData] = useState({});
  const [_, removeCookie] = useCookies(["token"]);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpen = () => setOpen((cur) => !cur);

  const handleFileUpload = async () => {
    try {
      dispatch(updateUserStart());
      const url = await AvatarUpload(avatar);

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
      toast.success("Updated sucessfully");
    } catch (error) {
      console.log("from upload", error.message);
      dispatch(updateUserFailure(error));
      toast.error("updation failed:", error.message);
    }
  };
  const uploadavatar = async (e) => {
    setavatar(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.put(
        `http://localhost:3000/api/user/${currentuser?.rest?._id}/updateuser`,
        formData,
        {
          headers: {
            Authorization: `${currentuser?.data}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserDetails(data.rest));
      toast.success("Updated sucessfully");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error("updation failed:", error.message);
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(
        `http://localhost:3000/api/user/${currentuser?.rest?._id}/deleteuser`,
        {
          headers: {
            Authorization: `${currentuser?.data}`,
          },
        }
      );

      const data = await res.data;
      console.log(data);
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast.error("delete user failed", data.message);
        return;
      }
      dispatch(deleteUserSuccess(data));
      removeCookie("token");
      toast.success("delete user success", data.message);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error("delete user failed", error.message);
    }
  };

  const handleSignOut = () => {

    if(currentuser){
    removeCookie("token");
    dispatch(signOutUserSuccess());
    toast.success("signout successful");
    navigate('/sign-in');
    }
    else{
    dispatch(signOutUserFailure());
    toast.error("signout failed");
  };
  }
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await axios.get(`http://localhost:3000/api/user/${currentuser?.rest?._id}/listing`,
      {
        headers: {
          Authorization: `${currentuser?.data}`,
        },
      }
      );
      const data = await res.data;
      setUserListings(data?.list)
      console.log("userlisting",userListings)
      console.log(data);
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
    } catch (error) {
      setShowListingsError(true);
    }
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
        <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-1rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div>
            <Typography variant="h5" color="blue-gray">
              {currentuser?.rest?.name}
            </Typography>
            <Typography color="gray" className="mt-2 font-normal">
              USER
            </Typography>
          </div>
          <div className="flex flex-col justify-between align-center ">
            <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
              <img
                className="w-24 h-24 mb-4 rounded-full object-cover cursor-pointer self-center "
                src={avatarUrl}
                alt="profile image"
              />
              <div className="absolute bottom-0 left-11 ml-3 mb-2  text-white">
                <FaCamera size={24} onClick={handleOpen} />
              </div>
            </div>
            <Typography color="gray" className="font-normal">
              {currentuser?.rest?.username || currentuser.data.username}
            </Typography>
          </div>

          <div className="flex flex-col gap-4 mt-1 mr-8">
            <div className="flex items-center gap-1">
              <FaEdit size={18} onClick={handleOpen} />
              <Typography color="gray" onClick={handleOpen}>
                Edit
              </Typography>
            </div>
            <div className="flex items-center gap-1">
              <FaSignOutAlt size={18} onClick={handleSignOut} />
              <Typography color="gray"  onClick={handleSignOut} >Logout</Typography>
            </div>
            <div className="flex items-center">
              <FaTrash size={18} onClick={handleDeleteUser} />
              <Typography color="gray" onClick={handleDeleteUser}>
                DeleteAccount
              </Typography>
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
                <span className="ml-1">Edit Image</span>
                <FaCheck
                  size={18}
                  onClick={handleFileUpload}
                  className="cursor-pointer"
                />
                <span className="ml-1">Update</span>
                <input
                  id="avatar"
                  onChange={(e) => uploadavatar(e)}
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                />
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between items-end gap-4"
            >
              <Input
                label="name"
                size="lg"
                id="name"
                name="name"
                type="text"
                autoComplete="email"
                value={formData.name || currentuser?.rest?.name || ""}
                onChange={handleChange}
              />

              <Input
                label="username"
                size="lg"
                id="username"
                name="username"
                autoComplete="username"
                value={formData.username || currentuser?.rest?.username || ""}
                onChange={handleChange}
              />

              <Input
                label="email"
                size="lg"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email || currentuser?.rest?.email || ""}
                onChange={handleChange}
              />

              <CardFooter className="pt-0">
                <Button type="submit" disabled={loading}>
                  {" "}
                  {loading ? "Loading..." : "Update"}
                </Button>
              </CardFooter>
            </form>
            <Button onClick={handleOpen} color="blue" size="sm">
              Back to Profile
            </Button>
          </CardBody>
        </Card>
      </Dialog>
      <div className="mx-10 my-10">
     <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={'/createlisting'}>
      creat your properties
     </Link>
     </div>
     <div >
     <button onClick={handleShowListings} className='w-full text-3xl ' >
        Show Listings
      </button>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4 m-20 justify-around'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.ListingimageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
     </div>

    </div>
  );
};

export default Profile;
