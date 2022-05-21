import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    document.title = "Sign up | MERN Blog";
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios
      .post("/api/users/signup", {
        username,
        password,
        confirmPassword,
      })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-black-500 w-1/2 mt-24 absolute left-1/2 -translate-x-1/2">
      <div className="border-2 p-10 shadow-xl rounded-md">
        <h1 className="text-purple-600 text-3xl font-semibold pb-4">Sign Up</h1>
        <p className="py-2">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline">
            {" "}
            Log in
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
              className="w-full mb-4 text-gray-900 text-base leading-5 h-8 rounded bg-gray-100 py-1 px-2 duration-100 border-2 shadow-sm outline-0 focus:border-purple-400"
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
              className="w-full mb-4 text-gray-900 text-base leading-5 h-8 rounded bg-gray-100 py-1 px-2 duration-100 border-2 shadow-sm outline-0 focus:border-purple-400"
              required
            />
            <br />

            {/* confirm password */}
            <label htmlFor="confirmPassword">Confirm password</label>
            <br />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full mb-4 text-gray-900 text-base leading-5 h-8 rounded bg-gray-100 py-1 px-2 duration-100 border-2 shadow-sm outline-0 focus:border-purple-400"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-8 py-1 mt-4 rounded border-2 border-purple-600 text-purple-600 duration-300 hover:text-white hover:bg-purple-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
