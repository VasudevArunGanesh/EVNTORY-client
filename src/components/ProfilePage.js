import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "./Footer";


export default function ProfilePage(){
    const [ name, setName ] = useState();
    const [ email, setEmail ] = useState();
    const { id } = useParams();

    useEffect(() => { 
    axios
      .get("http://localhost:5000/user/" + id)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch((err) => {
        alert(err);
     });})
    return (
        <div>
            <ul>
                <li>Name: {name}</li>
                <li>Email: {email}</li>
            </ul>
        </div>
    )
}
