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
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const AdminSideBar = () => {
  const navigate = useNavigate();
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
              navigate("/admindashbord");
            }}
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="hidden sm:block">Dashboard</span>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/admindpropertyList");
            }}
          >
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="hidden sm:block">PropertyListings</span>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="hidden sm:block">Dashboard</span>
            {/* <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix> */}
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/adminuserlist");
            }}
          >
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="hidden sm:block">User</span>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="hidden sm:block">Dashboard</span>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="hidden sm:block">Dashboard</span>
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default AdminSideBar;
