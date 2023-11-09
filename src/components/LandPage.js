import React, { useState } from "react";
import "./styles/homepage.css"
import axios from "axios";
import { Link } from "react-router-dom";
import background from "./resources/login_back.jpg";
import Navbar from "./Navbar";

export default function LandPage(){
    return  <div>
        <Navbar bgcolor={"rgb(34, 34, 34)"} textcolor={"white"} links={[{text:"login", path:"./user/login"},{text:"login", path:"./user/login"}]} buttons={[{text:"login", path:"./user/login"}]} />
        <p>this is the landing page</p>
        <Link to={"/user/signup"}><button>create event</button></Link>
    </div>

}