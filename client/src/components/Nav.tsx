import { Link } from "react-router-dom";

interface IProps {
  user: null | undefined;
  setUser: React.Dispatch<React.SetStateAction<null | undefined>>;
}

function Nav({ user, setUser }: IProps) {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(undefined);
  };

  return (
    <div className="shadow-md py-6 px-12 flex justify-between items-center">
      <Link to="/">
        <h2 className="text-3xl text-purple-600 font-semibold">My Blog</h2>
      </Link>
      <ul className="flex">
        <Link to="/login" hidden={user ? true : false}>
          <li className="px-2 duration-300 hover:text-purple-600">Log in</li>
        </Link>
        <Link to="/signup" hidden={user ? true : false}>
          <li className="px-2 hover:text-purple-600">Sign up</li>
        </Link>
        <Link to="/" hidden={user ? false : true}>
          <li
            onClick={handleLogout}
            className="px-2 hover:text-purple-600 cursor-pointer"
          >
            Log out
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
