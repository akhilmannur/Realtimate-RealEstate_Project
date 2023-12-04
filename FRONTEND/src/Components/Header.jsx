import React, { useState ,useEffect} from "react";
import Logo from "../assets/logo.png";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import {
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [_, removeCookie] = useCookies(["token"]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentuser } = useSelector((state) => state.user);

  const toggleDropdown = () => {
    setOpen(!open);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    if (currentuser) {
      removeCookie("token");
      dispatch(signOutUserSuccess());
      toast.success("signout successful");
      navigate("/sign-in");
    } else {
      dispatch(signOutUserFailure());
      toast.error("signout failed");
    }
  };

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
    <nav className="sticky top-0 z-50 shadow-md p-2 bg-blue-gray-100">
      <div className="flex justify-around items-center max-w-8xl mx-auto">
        <div className="sm:hidden">
          {isMenuOpen ? (
            <FaTimes className="text-slate-600 text-2xl" onClick={toggleMenu} />
          ) : (
            <FaBars className="text-slate-600 text-2xl" onClick={toggleMenu} />
          )}
        </div>
        <Link to={'/'}>
        <img src={Logo} alt="My Logo" className="h-10 w-30" />
        </Link>
        <ul
          className={`sm:hidden ${
            isMenuOpen ? "block" : "hidden"
          } dropdown-menu transition-[opacity,margin] duration opacity-100 min-w-[8rem] bg-white shadow-md rounded-lg p-2 mt-2  absolute top-16 left-0 right-40`}
        ><Link to={'/buy'}>
          <li className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
            Buy
          </li>
          </Link>
          <Link to={'/sell'}>
          <li className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
            Sell
          </li>
          </Link>
          <Link to={"/rent"}>
          <li className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
            Rent
          </li>
          </Link>
          <li className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
            News & Insight
          </li>
        </ul>
        <ul className="flex gap-4">
          <Link to={'/buy'}>
          <li className="hidden sm:inline hover:underline cursor-pointer">
            Buy
          </li>
          </Link>
          <Link to={'/sell'}>
          <li className="hidden sm:inline hover:underline cursor-pointer">
            Sell
          </li>
          </Link>
          <Link to={"/rent"}>
          <li className="hidden sm:inline hover:underline cursor-pointer">
            Rent
          </li>
          </Link>
        </ul>
        <div className="flex gap-6 item-center">
          <form
            className="bg-gray-200 rounded-lg flex items-center p-2 "
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              id="search"
              placeholder="search..."
              className="bg-slate-200 p-3 rounded py-1 px-2 bg-transparent focus:outline-none w-20 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FaSearch className="text-slate-600 ml-2" />
            </button>
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
                    src={currentuser?.rest?.avatar || currentuser?.avatar}
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
                      <Link to={"/profile"}>
                        <li
                          className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          onClick={toggleDropdown}
                        >
                          Profile
                        </li>
                      </Link>

                      <li
                        className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        onClick={handleSignOut}
                      >
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
