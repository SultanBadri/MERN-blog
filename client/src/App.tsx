import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./App.css";
import axios from "axios";
import Nav from "./components/Nav";

function App() {
  // interface IBackendData {
  //   data: [];
  // }

  const [backendData, setBackendData] = useState({});

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        setBackendData(response.data);
        console.log(backendData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
