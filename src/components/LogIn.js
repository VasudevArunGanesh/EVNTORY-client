import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/login_signup.css";
function LogIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    let handleSubmit = (event) => {
      const obj = { email, password };
      const url = "http://localhost:5000/user/login";
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
      <div className="container-fluid">
      <div className="card">
        <h1>LOG IN</h1>
        <form onSubmit={handleSubmit}>
          <div>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          /></div>
          <div>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          /></div>
          <input className="btn" id="submit" type="submit" value="submit" />
        </form>
        
      </div>
      
    </div>
    );
  }
  
  export default LogIn;