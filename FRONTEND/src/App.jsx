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
import AdminUserList from "./Pages/AdminUserList";
import PrivateRoute from "./Components/PrivateRoute";
import Createlist from "./Pages/Createlist";
import Listing from "./Pages/Listing";
import Search from "./Pages/Search";

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

        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminuserlist" element={<AdminUserList />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* <Footer /> */}
    </>
  );
}

export default App;
