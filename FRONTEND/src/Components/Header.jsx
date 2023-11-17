import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentuser } = useSelector((state) => state.user);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 shadow-md p-2 bg-slate-200">
      <div className="flex justify-between items-center max-w-8xl mx-auto">
        <div className="sm:hidden">
          {isMenuOpen ? (
            <FaTimes className="text-slate-600 text-2xl" onClick={toggleMenu} />
          ) : (
            <FaBars className="text-slate-600 text-2xl" onClick={toggleMenu} />
          )}
        </div>
        <img src={Logo} alt="My Logo" className="h-10 w-30" />
        <ul
          className={`sm:hidden ${
            isMenuOpen ? "block" : "hidden"
          } bg-black p-2 absolute top-16 left-0 right-40`}
        >
          <li className="hover:bg-red-600 text-white cursor-pointer">Buy</li>
          <li className="hover:bg-red-600 text-white cursor-pointer">Sell</li>
          <li className="hover:bg-red-600 text-white cursor-pointer">Rent</li>
          <li className="hover:bg-red-600 text-white cursor-pointer">
            News & Insight
          </li>
        </ul>
        <ul className="flex gap-4">
          <li className="hidden sm:inline hover:underline cursor-pointer">
            Buy
          </li>
          <li className="hidden sm:inline hover:underline cursor-pointer">
            Sell
          </li>
          <li className="hidden sm:inline hover:underline cursor-pointer">
            Rent
          </li>
        </ul>
        <div className="flex gap-2 item-center">
          <form className="bg-slate-100 rounded-lg flex items-center p-2 ">
            <input
              type="text"
              placeholder="search..."
              className="bg-slate-100 p-3 rounded py-1 px-2 bg-transparent focus:outline-none w-20 sm:w-64"
            />
            <FaSearch className="text-slate-600 ml-2" />
          </form>
          <div className="flex gap-4 items-center">
            <ul>
              <li className="hidden sm:inline hover:underline cursor-pointer">
                News & Insight
              </li>
            </ul>
            {currentuser ? (
            <Link to="/profile">
              <img
              className="rounded-full h-7 w-7 object-cover"
              src={currentuser.rest.avatar}
              alt="profile"
              />
              </Link>
        ) : (
          <Link to="/sign-up">
            <button className="bg-black text-white p-2 rounded-lg cursor-pointer hover:bg-slate-500">
              SignUp
            </button>
          </Link>
        )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
