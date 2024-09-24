import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

const Layout = () => {
  return (
    <div className="bg-[#111827] text-[#fff] min-h-screen">
      <Navbar />
      <Outlet className="px-4 " />
    </div>
  );
};

export default Layout;
