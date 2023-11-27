import React from "react";
import {
  Card,
  Typography,
} from "@material-tailwind/react";


const Search = () => {
  return (
    <div className="flex flex-col md:flex-row  ">
      <div className=" p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form>
          <Card className="md:min-h-screen w-full max-w-[45rem] p-4 shadow-xl shadow-blue-gray-900">
            <div className="mb-2 p-4">
              <Typography variant="h5" color="blue-gray">
                Search
              </Typography>
            </div>

            <div className="flex items-center gap-2 ">
              <label className="whitespace-nowrwap">SearchTerm</label>
              <input
                type="text"
                id="searchTerm"
                placeholder="search.... "
                className=" border rounded-lg p-3 w-full"
              ></input>
            </div>
            <div className="flex gap-2 flex-wrap items-center my-10">
              <label className="font-semibold">Type:</label>
              <div className="flex gap-2">
                <input type="checkbox" id="all" className="w-5" />
                <span>Rent & Sell</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5" />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="sell" className="w-5" />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="offer" className="w-5" />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center my-5">
              <label className="font-semibold">Amenities:</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
      
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
         
                />
                <span>Furnished</span>
              </div>
            </div>
            <div className='flex items-center gap-2 my-5'>
            <label className='font-semibold'>Sort:</label>
            <select
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-black text-white p-3 rounded-lg uppercase hover:opacity-95 my-10'>
            Search
          </button>
          </Card>
        </form>
      </div>
      <div>
        <h1 className='text-3xl font-semibold border-b p-3 my-5'>Search Result</h1>
      </div>
    </div>
  );
};

export default Search;
