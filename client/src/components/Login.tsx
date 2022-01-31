import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="bg-black-500 w-1/2 mt-24 absolute left-1/2 -translate-x-1/2">
      <div className="p-10 bg-gray-700 text-white">
        <h1 className="text-2xl">Log in</h1>
        <p>
          Don't have an account?
          <Link to="/signup" className="text-blue-500 hover:underline">
            {" "}
            Sign up
          </Link>
        </p>

        <form action="POST">
          <div>
            {/* username */}
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <br />

            {/* password */}
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="text"
              name="password"
              placeholder="Password"
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
