import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

function Dashboard({ posts, setPosts }: IProps) {
  const userId = JSON.parse(localStorage.getItem("user")!).user._id;
  const userPosts = posts.filter((post) => userId === post.author._id);

  useEffect(() => {
    document.title = "Dashboard | MERN Blog";
  }, []);

  const togglePublish = (toggledPost: IPost): void => {
    const postUrl: String = toggledPost.published ? "unpublish" : "publish";
    axios
      .post(
        `/api/posts/${toggledPost._id}/${postUrl}/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${
              JSON.parse(localStorage.getItem("user")!).token
            }`,
          },
        }
      )
      .then((res) => {
        setPosts((prevState) => {
          return prevState.map((post) =>
            post._id === toggledPost._id ? res.data : post
          );
        });
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center m-8">Dashboard</h1>
      <div className="flex flex-row flex-wrap mx-8">
        {userPosts.reverse().map((post: IPost) => {
          return (
            <div
              className="border-2 m-6 p-4 rounded text-center"
              key={post._id}
            >
              <Link to={`/posts/${post._id}`}>
                <img src={post.imageUrl} alt="post background" />
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p>
                  By <em className="text-slate-500">{post.author.username}</em>
                </p>
              </Link>
              <p>Published on {new Date(post.date).toLocaleDateString()}</p>
              <button
                onClick={() => togglePublish(post)}
                className="bg-white text-purple-600 border border-purple-600 my-2 px-2 py-1 rounded duration-300 hover:text-white hover:bg-purple-600"
              >
                {post.published ? "Unpublish" : "Publish"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
