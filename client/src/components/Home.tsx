import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bloggingSVG from "../images/blogging.svg";

interface IPost {
  _id: string;
  title: string;
  body: string;
  author: {
    [key: string]: any;
  };
  date: Date;
  published: boolean;
  imageUrl: string;
}

interface IProps {
  posts: IPost[];
}

function Home({ posts }: IProps) {
  const publishedPosts = posts.filter((post) => post.published);

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
      <div className="flex mx-8">
        {publishedPosts.map((post: IPost, i: number) => {
          return (
            <Link to={`/${post._id}`} key={i}>
              <div className="m-4 text-center border-2 rounded">
                <img src={post.imageUrl} alt="post background" />
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p>{`By ${post.author["username"]}`}</p>
                <p>{`Created on ${new Date(
                  post.date
                ).toLocaleDateString()}`}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
