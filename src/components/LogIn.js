import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import "./styles/login_signup.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import logo from "./resources/evntor2.png"

function LogIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
  
    let handleSubmit = (event) => {
      const obj = { email, password };
      const url = "http://localhost:5000/user/login";
      axios
        .post(url, obj)
        .then((res) => {
          if (res.data.message === "login successfull"){
            let id = res.data.user._id;
            window.location.replace(`/user/${id}`);
          } else{          
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
      event.preventDefault();
    };
    return (
      <div>
        <Navbar links={[]} buttons={[]} bgcolor={"rgb(34, 34, 34)"} textcolor={"white"}/>
        <div className="background-image-login"></div>
      
      <div className="container-fluid">
      <div className="card login-card">
        <div  className="card-title">
          <img className="login-img" src={logo} width="200" height="100" /><h1>LOG IN</h1>
          </div>
        <form className="logn-form form-login" onSubmit={handleSubmit}>
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
          <input className="btn" id="submit" type="submit" value="LOG IN" />
        </form>
        <p>Create an account? <Link className="link-underline link-underline-opacity-0" to="/user/signup">Signup</Link></p>
      </div>
      </div>
      <div className="footer"><Footer textColor={'white'}></Footer></div>
    </div>
    );
  }
  
  export default LogIn;