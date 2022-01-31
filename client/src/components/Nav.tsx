import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className=" py-6 px-4 flex justify-between items-center drop-shadow-md">
      <Link to="/">
        <h2 className="text-3xl text-purple-600 font-semibold">My Blog</h2>
      </Link>
      <ul className="flex">
        <Link to="/login">
          <li className="px-2 duration-300 hover:text-purple-600">Log in</li>
        </Link>
        <Link to="/signup">
          <li className="px-2 hover:text-purple-600">Sign up</li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
