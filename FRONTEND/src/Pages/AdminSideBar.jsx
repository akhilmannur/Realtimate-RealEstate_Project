import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  // ListItemSuffix,
  // Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowUpTrayIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  signOutAdminFailure,
  signOutAdminSuccess,
} from "../redux/user/adminSlice";
import { useNavigate } from "react-router-dom";
import { clearPersistedState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [_, removeCookie] = useCookies(["token"]);
  const { currentadmin } = useSelector((state) => state.admin);

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

  return (
    <div>
      <Card className="h-[calc(100vh-2rem)] w-full sm:max-w-[25rem] max-w-[5rem] p-4 mt-3 h-full">
        <div className="mb-2 p-4 mt-10">
          <Typography variant="h5" color="blue-gray">
            <span className="hidden sm:block">Realtimate</span>
          </Typography>
        </div>
        <List>
          <ListItem
            onClick={() => {
              navigate("admindashbord");
            }}
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="hidden sm:block">Dashboard</span>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("admindpropertyList");
            }}
          >
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="hidden sm:block">PropertyListings</span>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ArrowUpTrayIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="hidden sm:block">add</span>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("adminuserlist");
            }}
          >
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="hidden sm:block">User</span>
          </ListItem>
          <ListItem onClick={handleSignOut}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="hidden sm:block">LogOut</span>
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default AdminSideBar;
