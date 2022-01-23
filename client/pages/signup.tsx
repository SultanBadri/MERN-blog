import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";

const signUp = () => {
  let data;
  useEffect(() => {
    axios
      .get("http://localhost:3000/api")
      .then((response) => {
        data = response.data;
        console.log(data);
      })
      .catch(() => {
        console.log("Error retrieving data!!!");
      });
  }, []);

  return (
    <>
      <Nav />
      <h1>Sign up</h1>
    </>
  );
};

export default signUp;
