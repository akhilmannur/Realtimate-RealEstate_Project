import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import Pagination from "./pagination";


const ITEMS_PER_PAGE = 4;

const AdminPropertyList = () => {
  const [Property, setProperty] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPropertyList = async () => {
      try {
        const res = await axios.get("/api/admin/getalllisting");
        const data = await res.data;
        setProperty(data.listing);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPropertyList();
  }, []);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentList = Property.slice(indexOfFirstItem, indexOfLastItem);

  return (
 
    <div className="flex sm:flex-row flex:col flex-wrap w-full">
      {currentList.map((listing) => (
        
        <Card
          className="sm:max-w-[18rem] sm:max-h-[25rem] max-w-[5rem] max-h-[5rem] m-5 sm:[mt-20 ] mx-auto"
          key={listing.id}
        >
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src={listing.ListingimageUrls[0]}
              alt="card-image"
              className="min-h-[15rem] min-w-[18rem] max-h-[15rem] max-w-[15rem] object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between">
              <Typography color="blue-gray" className="font-medium">
                {listing.name}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                Rs{listing.regularPrice.toLocaleString("en-IN")}
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75  line-clamp-1 w-30"
            >
              {listing.description}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="font-medium bg-green-200 rounded-lg w-20 text-center my-2"
            >
              {listing.type}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-black text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              View
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={Property.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
   
  
  );
};

export default AdminPropertyList;
