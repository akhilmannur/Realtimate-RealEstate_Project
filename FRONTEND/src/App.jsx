import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHome from "./Pages/AdminHome";
import PrivateRoute from "./Components/PrivateRoute";
import Createlist from "./Pages/Createlist";
import Listing from "./Pages/Listing";
import Search from "./Pages/Search";
import RentListing from "./Pages/RentListing";
import SellListing from "./Pages/SellListing";
import BuyListing from "./Pages/BuyListing";
import AdminUserList from "./Pages/AdminUserList";
import AdminDashbord from "./Pages/AdminDashbord";
import AdminPropertyList from "./Pages/AdminPropertyList";
import AdminUSerProfile from "./Pages/AdminUSerProfile";
import ChatBox from "./Pages/ChatBox";
import io from "socket.io-client";
import AdminListing from "./Pages/AdminListing";
import AdminCouponAdd from "./Pages/AdminCouponAdd";

const socket = io.connect("http://localhost:3000");

function App() {
  return (
    <>
  
      <Routes>
        <Route path="/" element={<Home socket={socket}/>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/search" element={<Search />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createlisting" element={<Createlist />} />
        </Route>

        <Route path="/buy" element={<BuyListing />} />
        <Route path="/sell" element={<SellListing />} />
        <Route path="/rent" element={<RentListing />} />
        <Route path="/chatbox" element={<ChatBox/>} />

        <Route path="/adminhome" element={<AdminHome />}>
          <Route index element={<AdminDashbord />} />
          <Route path="adminuserlist" element={<AdminUserList />} />
          <Route path="admindashbord" element={<AdminDashbord />} />
          <Route path="admindpropertyList" element={<AdminPropertyList />} />
          <Route path="adminuserprofile/:userId" element={<AdminUSerProfile />}/>
          <Route path="admincreatlisting" element={<AdminListing/>} />
          <Route path="admincreatlisting" element={<AdminListing/>} />
          <Route path="admincouponadd" element={<AdminCouponAdd/>} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
