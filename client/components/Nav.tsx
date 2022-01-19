import type { NextPage } from "next";
import Link from "next/link";

const Nav: NextPage = () => {
  return (
    <div className="flex justify-between items-center p-5 shadow-md">
      <Link href="/">
        <a className="text-2xl font-semibold">Blog</a>
      </Link>
      <ul className="flex">
        <li className="px-2">
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        <li className="px-2">
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
