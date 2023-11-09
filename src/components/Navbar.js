import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/navbar.css"
import logo from "./resources/evntorlogo.png"

export default function Navbar({bgcolor, textcolor, links, buttons}){

    return (
        <div>
            <nav className="navbar navbar-expand-lg p-0" style={{backgroundColor: `${bgcolor}`}}>
  <div className="container-fluid p-0" >
    <a className="navbar-brand" style={{color: `${textcolor}`,marginLeft: "10px"}} href="/">      
        <img src={logo} alt="logo" width="65" height="40" />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse"  id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {
            links.map((link, index)=>{
                return (
                    <li className="nav-item" key={index}>
                        <a className="nav-link" style={{color: `${textcolor}`}} href={link.path}>{link.text}</a>
                    </li>
                )
            })
        }
      </ul>
      <form className="d-flex" role="search">
      {
            buttons.map((butn, index)=>{
                return (
                    <Link to={butn.path}><button key={index} className="btn btn-outline-dark m-auto" type="submit">{butn.text}</button></Link>
                )
            })
        }
       
      </form>
    </div>
  </div>
</nav>
        </div>
    )
}