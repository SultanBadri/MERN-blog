import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface IProps {
  user: any;
  setUser: React.Dispatch<any>;
}

function Nav({ user, setUser }: IProps) {
  const [isVisibleHamburgerMenu, setIsVisibleHamburgerMenu] =
    useState<boolean>(false);

  const handleLogout = (): void => {
    localStorage.removeItem("user");
    setUser(undefined);
  };

  useEffect(() => {}, []);

  return (
    <div className="shadow-md py-6 px-12 flex justify-between items-center border-2 border-b-purple-600">
      <Link to="/">
        <h2 className="text-2xl sm:text-3xl text-purple-600 font-semibold">
          My Blog
        </h2>
      </Link>
      {/* Hamburger menu  */}
      {/* &#9776; */}
      {/* X close button */}
      {/* &times; */}
      <ul className="flex">
        <Link to="/login" hidden={user ? true : false}>
          <li className="px-2 mx-2 text-white bg-purple-600 rounded duration-200 hover:bg-purple-700">
            Log in
          </li>
        </Link>
        <Link to="/signup" hidden={user ? true : false}>
          <li className="px-2 hover:text-purple-600">Sign up</li>
        </Link>
        <Link to="/" hidden={user ? false : true}>
          <li className="px-2 mx-2 text-white bg-purple-600 rounded duration-200 hover:bg-purple-700">
            Home
          </li>
        </Link>
        <Link to="/dashboard" hidden={user ? false : true}>
          <li className="px-2 hover:text-purple-600">Dashboard</li>
        </Link>
        <Link to="/create" hidden={user ? false : true}>
          <li className="px-2 hover:text-purple-600">Create</li>
        </Link>
        <Link to="/" hidden={user ? false : true}>
          <li onClick={handleLogout} className="px-2 hover:text-purple-600">
            Log out
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
