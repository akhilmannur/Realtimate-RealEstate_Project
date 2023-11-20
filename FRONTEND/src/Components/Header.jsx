import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { currentuser } = useSelector((state) => state.user);
  const toggleDropdown = () => {
    setOpen(!open);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
// console.log(currentuser.rest.avatar);
  return (
    <nav className="sticky top-0 z-50 shadow-md p-2 bg-slate-300">
      <div className="flex justify-around items-center max-w-8xl mx-auto">
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
          } dropdown-menu transition-[opacity,margin] duration opacity-100 min-w-[8rem] bg-white shadow-md rounded-lg p-2 mt-2  absolute top-16 left-0 right-40`}
        >
          <li className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
            Buy
          </li>
          <li className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
            Sell
          </li>
          <li className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
            Rent
          </li>
          <li className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
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
        <div className="flex gap-6 item-center">
          <form className="bg-slate-100 rounded-lg flex items-center p-2 ">
            <input
              type="text"
              id="search"
              placeholder="search..."
              className="bg-slate-200 p-3 rounded py-1 px-2 bg-transparent focus:outline-none w-20 sm:w-64"
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
              <div
                className={`dropdown relative inline-flex ${
                  open ? "dropdown-open" : ""
                }`}
              >
                <button
                  id="dropdownCustomTrigger"
                  type="button"
                  className="dropdown-toggle "
                  onClick={toggleDropdown}
                >
                  <img
                    className={`rounded-full h-7 w-7 object-cover ${
                      open ? "dropdownOpen" : ""
                    }`}
                    src={currentuser?.rest.avatar}
                    alt="profile"
                  />
                </button>

                {open && (
                  <div
                    className={`dropdown-menu transition-[opacity,margin] duration opacity-100 min-w-[8rem] bg-white shadow-md rounded-lg p-2 mt-2`}
                    aria-labelledby="dropdownCustomTrigger"
                    style={{
                      position: "absolute",
                      top: "3rem",
                      right: "0",
                      zIndex: "999",
                    }}
                  >
                    <ul>
                      <Link to={'/profile'}>
                      <li className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                        Profile
                      </li>
                      </Link>

                      <li className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
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
