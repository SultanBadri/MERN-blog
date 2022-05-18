import { Link } from "react-router-dom";

interface IProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Nav({ isLoggedIn, setIsLoggedIn }: IProps) {
  const handleLogout = (): void => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="shadow-md py-6 px-12 flex justify-between items-center">
      <Link to="/">
        <h2 className="text-3xl text-purple-600 font-semibold">My Blog</h2>
      </Link>
      <ul className="flex">
        <Link to="/login" hidden={isLoggedIn ? true : false}>
          <li className="px-2 duration-300 hover:text-purple-600">Log in</li>
        </Link>
        <Link to="/signup" hidden={isLoggedIn ? true : false}>
          <li className="px-2 hover:text-purple-600">Sign up</li>
        </Link>
        <Link to="/create" hidden={isLoggedIn ? false : true}>
          <li className="px-2 hover:text-purple-600">Create</li>
        </Link>
        <Link to="/posts" hidden={isLoggedIn ? false : true}>
          <li className="px-2 hover:text-purple-600">My posts</li>
        </Link>
        <Link to="/" hidden={isLoggedIn ? false : true}>
          <li onClick={handleLogout} className="px-2 hover:text-purple-600">
            Log out
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
