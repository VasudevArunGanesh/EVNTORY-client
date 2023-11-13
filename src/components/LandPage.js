import React, { useEffect, useState } from "react";
import "./styles/homepage.css"
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Typewriter from 'typewriter-effect';
import { Button } from 'uiw';
import EventsNewCarousel from "./EventsNewCarousel";




export default function LandPage(){
    const [pubEventsArray, setPubEventsArray ] = useState([]);
    useEffect( () => {
  
     
        axios
          .get("http://localhost:5000/public-events")
          .then((res) => {
            // console.log(res.data);
            setPubEventsArray(res.data);
          })
          .catch((err) => {
            alert(err);
         });
        }, []);

    return  (
    <div className="landpagebody">    
    
        <Navbar  dropdown={[]} bgcolor={"rgb(34, 34, 34)"} textcolor={"white"} links={[]} buttons={[{text:"login",type:"success", path:"./user/login"}]} logolink={"/"}/>
        {/* <div className="background-image-land"></div> */}

        <h1 className="rowdies-text">Welcome to EVNTORY</h1>
        <h3 className="rowdies-text">The inventory for all your events</h3>
        <h2 className="rowdies-text">Create your <Typewriter
  options={{
    strings: ['Weddings', 'Meetings', 'Parties'],
    autoStart: true,
    delay:80,
    loop: true,
  }}
/> with us</h2>
{ 
  pubEventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' >
  <swiper-slide style={{color:"white"}}>
    No Current Events
  </swiper-slide> 
</swiper-container> ) : (
    <EventsNewCarousel eventarray={pubEventsArray}/>
  )
}
        <Link to={"./user/signup"}><Button icon="login" type="danger">Create an event now</Button></Link>

        <section className="service" id="service">

<h1 className="heading"> our <span>services</span></h1>

<div className="box-container">

<div className="box">    
<i className="fa fa-map-marker-alt"></i>    
<h3>venue selection</h3>    
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, suscipit.</p>

</div>

<div className="box">    
    <i className="fa fa-envelope"></i>    
    <h3>invitation card</h3>    
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, suscipit.</p>
    
</div>

<div className="box">    
    <i className="fa fa-music"></i>    
    <h3>entertainment</h3>    
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, suscipit.</p>
    
</div>

<div className="box">    
    <i className="fa fa-utensils"></i>    
    <h3>food and drinks</h3>    
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, suscipit.</p>
    
</div>

<div className="box">    
    <i className="fa fa-photo-video"></i>    
    <h3>photos and videos</h3>    
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, suscipit.</p>
    
</div>

<div className="box">    
    <i className="fa fa-birthday cake"></i>    
    <h3>custom foodt</h3>    
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, suscipit.</p>
    
</div>

</div>

</section>
<section class="about" id="about">
<h1 class="heading"><span>about</span> us </h1>
<div class="row">
<div class="image">
<img src="resources/login_back.jpg" alt="" />
</div>
<div class="content">
<h3>we will give a very special celebration for you</h3>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore fugiat ut esse perferendis perspiciatis provident dolores fuga in facilis culpa possimus, quia praesentium itaque, sapiente quasi harum rem asperiores.</p>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat vero expedita incidunt provident quibusdam aut odit, numquam nesciunt similique nisi.</p>
<a href="#" class="btn">contact us</a>
</div>
</div>

</section>
    </div>
    )
}