import React, { useState } from "react";
import axios from "axios";

function LogIn() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    let handleSubmit = (event) => {
      const obj = { name, email, password };
      const url = "http://localhost:5500/user/login";
      axios
        .post(url, obj)
        .then((res) => {
          alert(res.data);
        })
        .catch((err) => {
          alert(err);
        });
      event.preventDefault();
    };
    return (
      <div>
        <h1>event Login Page</h1>
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
      </div>
    );
  }
  
  export default LogIn;