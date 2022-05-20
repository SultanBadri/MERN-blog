import axios from "axios";
import { useState, useEffect } from "react";

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

function Posts({ posts, setPosts }: IProps) {
  const userId = JSON.parse(localStorage.getItem("user")!).user._id;
  const userPosts = posts.filter((post) => userId === post.author._id);

  useEffect(() => {
    document.title = "My posts | MERN Blog";
    console.log(posts);
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
    <>
      <h1 className="text-3xl font-bold text-center m-8">My posts</h1>
      {userPosts.reverse().map((post: IPost, i: number) => {
        return (
          <div className="bg-slate-200 m-6 p-4 rounded" key={i}>
            <img src={post.imageUrl} alt="post background" />
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p>{post.body}</p>
            <p>{`By ${post.author["username"]}`}</p>
            <p>{`Created on ${new Date(post.date).toLocaleDateString()}`}</p>
            <button
              onClick={() => togglePublish(post)}
              className="bg-white text-purple-600 my-2 px-2 py-1 rounded duration-300 hover:text-white hover:bg-purple-600"
            >
              {post.published ? "Unpublish" : "Publish"}
            </button>
          </div>
        );
      })}
    </>
  );
}

export default Posts;
