import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="bg-red-500 p-4 flex justify-between items-center">
      <h2 className="text-2xl">
        <a href="/">My Blog</a>
      </h2>
      <ul className="flex">
        <li className="px-2">
          <a href="/login">Log in</a>
        </li>
        <li className="px-2">
          <a href="/signup">Sign up</a>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
