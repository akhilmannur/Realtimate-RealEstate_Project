import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeTop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <div className="relative">
      <img
        className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
        src="https://static.rdc.moveaws.com/images/hero/default/2021-11/webp/hp-hero-desktop-xl.webp"
        alt="nature image"
      />
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center w-full">
        <span className="text-3xl lg:text-6xl font-bold">
          <h1>
            Find your next <span className="text-yellow-800">perfect</span>
          </h1>
          <h1>place with ease</h1>
        </span> 
      </div>
      <div className="absolute top-85 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
        <form className="bg-gray-200 rounded-full flex items-center p-2"  onSubmit={handleSubmit} >
         
          <input
            type="text"
            id="search"
            placeholder="search..."
            className="rounded p-0 sm:p-2 bg-transparent focus:outline-none w-30  lg:w-96 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button type="submit">
            <FaSearch className="text-slate-600 shadow-lg" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeTop;
