import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/login_signup.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import logo from "./resources/evntor2.png"
// style={{ backgroundImage:`url(${background})` }}
function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  var [duplicate, setDuplicate] = useState("");

  let handleSubmit = (event) => {
    const obj = { name, email, password };
    const url = "http://localhost:5000/user/signup";
    axios
      .post(url, obj)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.message === "user exists with email") {
            console.log("user exists");
            setDuplicate("User exists with Email");
          } else {let id = res.data._id;
          console.log(id);
          window.location.replace(`/user/${id}/createevent`);
        }
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
  return ( <div>
    <Navbar links={[]} buttons={[]} bgcolor={"rgb(34, 34, 34)"} textcolor={"white"} linkto={"../user/login"} username={"LOG IN"}/>
    <div className="background-image-sign"></div>
    <div className="container-fluid" >
      <div className="card">
      <div  className="card-title">
          <img className="login-img" src={logo} width="220" height="100" /><h1>SIGN UP</h1>
          </div>
        <form onSubmit={handleSubmit} className="was-validated form-login">
          <div><input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            required
            onChange={(e) => setName(e.target.value)}
          /><span className="invalid-feedback" for="name">Name is required</span>
          </div>
          <div>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="invalid-feedback" for="email">Email is required</div>
          <div style={{color: "orange"}}>{duplicate}</div></div>
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
          <input className="btn" id="submit" type="submit" value="SIGN UP" />
        </form>
        <p>Have an account? <Link className="link-underline link-underline-opacity-0" to="/user/login">Login</Link></p>
      </div>
      </div>
    <div className="footer"><Footer textColor={'white'}></Footer></div>
    </div>
  );
}

export default SignUp;
