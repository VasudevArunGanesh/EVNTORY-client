import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EventsCarousel from "./EventsCarousel";
import EventsNewCarousel from "./EventsNewCarousel"
import {Button} from 'uiw'
// import Typewriter from 'typewriter-effect';
import { Typewriter } from 'react-simple-typewriter'

export default function HomePage(){
    const { id } = useParams();
    // let user;
    const [user, setUser] = useState("abc");
    var [eventsArray, setEventsArray ] = useState([]);
     
  
    useEffect(() => {
        const url = "http://localhost:5000/user/"+id+"/home";
        axios.get(url).then((res) =>{
            // setUser(res.data);
            setUser(res.data);
        }).catch((err) =>{
            alert(err);
        });
        axios
          .get("http://localhost:5000/")
          .then((res) => {
            setEventsArray(res.data);
          })
          .catch((err) => {
            alert(err);
         });
    }, [])

    return (
        <div className="main-home-page" id="hpage" style={{backgroundColor:"#222"}}>
          <Navbar links={[{text:"free events", path:"#hpage"},{text:"parties", path:"#div1"},{text:"workshops", path:"#div2"}]} pfpicon={true} dropdown={[{text:"Profile", path:"/user/"+id},{text:"Log Out", path:"../"}]} buttons={[{text:"Create an Event",type:"danger", path:"/user/"+id+"/create-event"}]} bgcolor={"#444"} textcolor={"white"} linkto={"../user/"+user._id} username={user.name} logolink={"/user/"+user._id+"/home"}/>
            {/* <div className="background-image-home"></div> */}
             <div className="search-filter-bar">
              <form className="searchbar-form">
                <input className="search-input" type="text" placeholder="Search for events"/>  
                <Button className="search-button"  >enter</Button>
              </form>  
              <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle filter-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Filter
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </div>
            </div>   
                
            <div className="homepage-sidebar">
                <div id="div1">
                    <img  src="https://picsum.photos/200/300?random=10.jpg"></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Events near you!']} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div>
                <div id="div2">
                    <img  src="https://picsum.photos/200/300?random=11.jpg"></img>
                    <h1  className="rowdies-text">
                        <Typewriter words = {['Free Events', 'Join now for free!']} cursor = {false} loop={true} delaySpeed={10000} />
                    </h1>
                </div>
                <div id="div3">
                    <img  src="https://picsum.photos/200/300?random=12.jpg"></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Concerts', "Let's Party"]} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div>
                <div id="div4">
                    <img  src="https://picsum.photos/200/300?random=13.jpg"></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Workshops',"Hands on learning!"]} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div>
                <div id="div5">
                    <img  src="https://picsum.photos/200/300?random=123.jpg"></img>
                    <h1  className="rowdies-text">
                        <Typewriter words = {['Conventions']} cursor = {false} loop={true} delaySpeed={10000} />
                    </h1>
                </div>
                <div id="div6">
                    <img  src="https://picsum.photos/200/300?random=31.jpg"></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Community gatherings']} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div>
            </div>
          
            { 
              eventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' >
              <swiper-slide style={{color:"white"}}>
                No Current Events
              </swiper-slide> 
            </swiper-container> ) : (
                <EventsCarousel eventarray={eventsArray}/>
              )
              }
                { 
                  eventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' >
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={eventsArray}/>
                  )
                }
                { 
                  eventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' >
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={eventsArray}/>
                  )
                }
                { 
                  eventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' >
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={eventsArray}/>
                  )
                }
                { 
                  eventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' >
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={eventsArray}/>
                  )
                }
                { 
                  eventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' >
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={eventsArray}/>
                  )
                }
               
               

            
        </div>
    )
}