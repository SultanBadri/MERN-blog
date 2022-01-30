import { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";

function Nav() {
  return (
    <div className="bg-red-500 p-4 flex justify-between items-center">
      <Link to="/">
        <h2 className="text-2xl">My Blog</h2>
      </Link>
      <ul className="flex">
        <Link to="/login">
          <li className="px-2">Log in</li>
        </Link>
        <Link to="/signup">
          <li className="px-2">Sign up</li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
