import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface IProps {
  setUser: React.Dispatch<any>;
}

function Login({ setUser }: IProps) {
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
        setUser(res.data.user);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
        } else {
          console.error(err);
        }
      });
  };

  return (
    <div className="bg-black-500 w-1/2 mt-24 absolute left-1/2 -translate-x-1/2">
      <div className="border-2 p-10 shadow-xl rounded-md">
        <h1 className="text-purple-600 text-3xl font-semibold pb-4">Log in</h1>
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
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="px-8 py-1 mt-4 rounded-full border border-purple-600 text-purple-600 duration-300 hover:text-white hover:bg-purple-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
