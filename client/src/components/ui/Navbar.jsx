import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between py-4 items-center px-4 shadow-md">
      <h1 className="text-xl font-bold">Parking management</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-[#22cc9d] duration-200">
          Home
        </Link>
        <Link to="/stats" className="hover:text-[#22cc9d] duration-200">
          Stats
        </Link>
        <Link to="/config" className="hover:text-[#22cc9d] duration-200">
          Config
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
