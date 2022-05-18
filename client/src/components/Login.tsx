import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface IProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login({ setIsLoggedIn }: IProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    document.title = "Login | MERN Blog";
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios
      .post("/api/users/login", {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-black-500 w-1/2 mt-24 absolute left-1/2 -translate-x-1/2">
      <div className="border-2 p-10 shadow-xl rounded-md">
        <h1 className="text-purple-600 text-4xl pb-4">Log in</h1>
        <p>
          Don't have an account?
          <Link to="/signup" className="text-blue-500 hover:underline">
            {" "}
            Sign up
          </Link>
        </p>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            {/* username */}
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              required
            />
            <br />

            {/* password */}
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
