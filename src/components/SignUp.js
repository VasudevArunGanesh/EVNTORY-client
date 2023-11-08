import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/login_signup.css";

function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let handleSubmit = (event) => {
    const obj = { name, email, password };
    console.log(obj);
    const url = "http://localhost:5000/user/signup";
    axios
      .post(url, obj)
      .then((res) => {
        if (res.status === 200) {
          alert("user added successfully");
        } else {
          // Handle 404 error
          if (res.status === 404) {
            alert("The `/user/signup` endpoint does not exist.");
          } else {
            alert("An unexpected error occurred.");
          }
        }
      })
      .catch((err) => {
        // Handle other errors
        alert(err);
     });
      
    event.preventDefault();
  };
  return (
    <div className="container-fluid">
      <div className="card">
        <h1>SIGN UP</h1>
        <form onSubmit={handleSubmit} className="was-validated">
          <div><input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <div className="invalid-feedback" for="name">Name is required</div></div>
          <div>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="invalid-feedback" for="email">Email is required</div></div>
          <div>
          <input
            type="password"
            id="password"
            className="form-control"
            required
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="invalid-feedback" for="email">Password is required</div></div>
          <input className="btn" id="submit" type="submit" value="submit" />
        </form>
        <p>Have an account? <Link className="link-underline link-underline-opacity-0" to="/user/login">Login</Link></p>
        <h4>
          <Link className="link-underline link-underline-opacity-0" to="/">Home Page</Link>
        </h4>
      </div>
      
    </div>
  );
}

export default SignUp;
