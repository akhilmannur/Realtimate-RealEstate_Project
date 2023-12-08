import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
// import Header from "./Components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHome from "./Pages/AdminHome";
import PrivateRoute from "./Components/PrivateRoute";
import Createlist from "./Pages/Createlist";
import Listing from "./Pages/Listing";
import Search from "./Pages/Search";
import Footer from "./Components/Footer";
import RentListing from "./Pages/RentListing";
import SellListing from "./Pages/SellListing";
import BuyListing from "./Pages/BuyListing";
import AdminUserList from "./Pages/AdminUserList";
import AdminDashbord from "./Pages/AdminDashbord";
import AdminPropertyList from "./Pages/AdminPropertyList";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
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

        <Route path="/adminhome" element={<AdminHome />} />
        <Route element={<AdminHome />}>
          <Route path="/adminuserlist" element={<AdminUserList />} />
          <Route path="/admindashbord" element={<AdminDashbord />} />
          <Route path="/admindpropertyList" element={<AdminPropertyList />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
