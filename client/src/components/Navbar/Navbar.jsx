import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-700 px-3 py-4 text-right font-medium ">
      <Link to="/login" className="mr-4 text-gray-100 hover:text-gray-300">
        Login
      </Link>
      <Link to="/register" className="mr-4 text-gray-100 hover:text-gray-300">
        Register
      </Link>
    </div>
  );
};

export default Navbar;
