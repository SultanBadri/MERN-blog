import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PostForm from "./components/PostForm";
import Dashboard from "./components/Dashboard";
import Post from "./components/Post";

function App() {
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

  const [user, setUser] = useState<any>();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    // make sure user is still logged in
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    }

    axios
      .get("/api/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Nav user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/create"
            element={<PostForm posts={posts} setPosts={setPosts} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard posts={posts} setPosts={setPosts} />}
          />
          {posts.map((post: IPost, i: number) => {
            <Route
              path={`/posts/${post._id}`}
              element={<Post {...post} user={user} />}
            />;
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
