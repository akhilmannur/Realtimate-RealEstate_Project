import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminNav from "../Components/AdminNav";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const AdminHome = () => {
  const { currentadmin } = useSelector((state) => state.admin);
  return (
    <>
      <div><AdminNav /></div>
          
      <div className="flex">
        <AdminSideBar />
      {  currentadmin ?  <Outlet />:<Navigate to='/sign-in' />}
      
      </div>
    </>
  );
};

export default AdminHome;
