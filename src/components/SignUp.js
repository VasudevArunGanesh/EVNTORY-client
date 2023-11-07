import React, { useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let handleSubmit = (event) => {
    const obj = { name, email, password };
    console.log(obj);
    const url = "http://localhost:5500/user/create-event";
    axios
      .post(url, obj)
      .then((res) => {
        if (res.status === 200) {
          alert("event added successfully");
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        alert(err);
      });
    event.preventDefault();
  };
  return (
    <div>
      <h1>event Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input id="submit" type="submit" value="submit" />
      </form>
      <h2>Have an account?</h2>
      <h4>
        <Link to="/login">Login</Link>
      </h4>
      <h4>
        <Link to="/">Home Page</Link>
      </h4>
    </div>
  );
}

export default SignUp;
