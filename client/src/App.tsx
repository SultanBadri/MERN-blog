import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import axios from "axios";
import Nav from "./components/Nav";
import PostForm from "./components/PostForm";
import Posts from "./components/Posts";

function App() {
  interface IPost {
    title: string;
    body: string;
    author: {
      [key: string]: any[];
    };
    date: Date;
    published: boolean;
    // imageUrl: string;
  }

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLoggedIn(true);
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
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/create"
            element={<PostForm posts={posts} setPosts={setPosts} />}
          />
          <Route path="/posts" element={<Posts posts={posts} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
