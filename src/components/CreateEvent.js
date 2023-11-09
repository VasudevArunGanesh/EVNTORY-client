import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";


export default function CreateEvent(){
    const [ name, setName ] = useState();
    const { id } = useParams();
    useEffect(() => { axios
      .get("http://localhost:5000/user/" + id + "/createevent")
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        alert(err);
     });})
   
    return <p>Welcome to create event page! {name}</p>
}