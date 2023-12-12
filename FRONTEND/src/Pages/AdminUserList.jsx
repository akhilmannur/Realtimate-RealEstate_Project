import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import Pagination from "./pagination";
import { Link, useNavigate } from "react-router-dom";
import AdminUSerProfile from "./AdminUSerProfile";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Blocked",
    value: "Blocked",
  },
];

const TABLE_HEAD = ["User", "email", "Status", "joined", ""];
const ITEMS_PER_PAGE = 5;

export default function AdminUserList() {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const res = await axios.get("/api/admin/getalluser");
        const data = await res.data;
        setUser(data.alluser);
      } catch (error) {
       error.message(error)
      }
    };
    fetchUserList();
  }, []);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentUsers = user.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Card className="max-h-[80rem] w-[19rem] sm:w-full w-full m-5">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(( users) => ( 
              <tr key={users._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar src={users.avatar} alt="img" size="sm" />
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {users.name}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-70"
                    >
                      {users.email}
                    </Typography>
                  </div>
                </td>
                <td></td>
                <td>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    
                  >
                    {users.createdAt}
                  </Typography>
                </td>
                <td className="flex flex-row gap-2">
                  <Button onClick={()=>navigate(`/adminhome/adminuserprofile/${users._id}`)}>View</Button>
                  <Button className="bg-red-500 ">Block</Button>
                  <Button className="bg-green-500">UnBlock</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-auto w-full">
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={user.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </CardFooter>
    </Card>
  );
}
