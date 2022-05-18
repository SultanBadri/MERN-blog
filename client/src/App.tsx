import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./App.css";
import axios from "axios";
import Nav from "./components/Nav";

function App() {
  interface IPost {
    title: string;
    content: string;
    author: string;
    date: Date;
    published: boolean;
    imageUrl: string;
  }

  const [user, setUser] = useState<null | undefined>();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => {
        setPosts(res.data);
        console.log(posts);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Nav user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
