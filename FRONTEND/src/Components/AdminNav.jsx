import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  signOutAdminFailure,
  signOutAdminSuccess,
} from "../redux/user/adminSlice";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { clearPersistedState } from "../redux/store";

const AdminNav = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const { currentadmin } = useSelector((state) => state.admin);
  const [_, removeCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    if (currentadmin) {
      removeCookie("token");
      dispatch(signOutAdminSuccess());
      toast.success("signout successful");
      clearPersistedState();
      navigate("/sign-in");
    } else {
      dispatch(signOutAdminFailure());
      toast.error("signout failed");
    }
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="max-w-10xl p-3">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900 w-full">
        <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
          <img src={Logo} alt="My Logo" className="h-10 w-30" />
        </Typography>
        <div className="flex items-center gap-x-1">
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
            onClick={handleSignOut}
          >
            <span>Logout</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          <div className="flex items-center">
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              className=""
              onClick={handleSignOut}
            >
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default AdminNav;
