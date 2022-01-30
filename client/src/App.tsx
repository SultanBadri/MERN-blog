import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Nav from "./components/Nav";

function App() {
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
      <Nav />
    </>
  );
}

export default App;
