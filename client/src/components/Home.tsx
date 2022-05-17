import { useState, useEffect } from "react";
import bloggingSVG from "../images/blogging.svg";

function Home() {
  useEffect(() => {
    document.title = "Home | MERN Blog";
  }, []);

  return (
    <div>
      <div className="bg-gray-300 py-20 px-12">
        <h1 className="text-5xl font-bold">Welcome to my blog!</h1>
        <p className="pt-4 w-96 leading-6">
          Hi there! Welcome to my blog, where I give my thoughts on full stack
          technologies along with other things!
        </p>
        {/* <img
        src={bloggingSVG}
        alt="blog"
        className="flex items-center justify-center"
      /> */}
      </div>
      <h2 className="text-3xl mt-12 px-12 font-semibold">Blogs</h2>
    </div>
  );
}

export default Home;
