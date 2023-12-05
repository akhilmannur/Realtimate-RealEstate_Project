import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminNav from "../Components/AdminNav";
import { Outlet } from "react-router-dom";

const AdminHome = () => {
 
  return (
    <>
      <div><AdminNav /></div>
          
      <div className="flex">
        <AdminSideBar />
          <Outlet />
      
      </div>
    </>
  );
};

export default AdminHome;
