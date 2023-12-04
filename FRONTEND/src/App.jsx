import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
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
import AdminSideBar from "./Pages/AdminSideBar"

function App() {
  return (
    <>
      <Header  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path='/search' element={<Search/>} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createlisting" element={<Createlist />} />
        </Route>
       

        <Route path="/buy" element={<BuyListing/>} />
        <Route path="/sell" element={<SellListing/>} />
        <Route path="/rent" element={<RentListing/>} />



        <Route  element={<AdminHome />} >
        <Route path="/adminsidebar" element={<AdminSideBar/>} />
        </Route>


      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </>
  );
}

export default App;
