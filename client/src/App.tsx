import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

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
  }, [backendData]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Test <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
