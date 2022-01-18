import type { NextPage } from "next";
import Link from "next/link";

const Nav: NextPage = () => {
  return (
    <>
      <Link href="/">
        <a className="text-2xl bg-red-400">Blog</a>
      </Link>
      <ul>
        <li>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="signup">
            <a>Sign up</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Nav;
