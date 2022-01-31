import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="bg-black-500 w-1/2 mt-24 absolute left-1/2 -translate-x-1/2">
      <div className="border-2 p-10 shadow-xl rounded-md">
        <h1 className="text-purple-600 text-4xl pb-4">Sign Up</h1>
        <p>
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline">
            {" "}
            Log in
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
            <br />

            {/* confirm password */}
            <label htmlFor="confirmPassword">Confirm password</label>
            <br />
            <input
              type="text"
              name="confirmPassword"
              placeholder="Confirm password"
              required
            />
          </div>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
