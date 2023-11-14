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
import image1 from "./resources/local.jpg"
import image2 from "./resources/free.jpg"
import image3 from "./resources/signup_back.jpg"
import image4 from "./resources/workshop.jpg"
import image5 from "./resources/convention.jpg"
import image6 from "./resources/gathering.jpg"
export default function HomePage(){
    const { id } = useParams();
    // let user;
    const [user, setUser] = useState("abc");
    var [eventsArray, setEventsArray ] = useState([]);
    var [localArray, setLocalArray ] = useState([]);
    var [freeArray, setFreeArray ] = useState([]);
    var [workshopArray, setWorkshopArray ] = useState([]);
    var [concertArray, setConcertArray ] = useState([]);
    var [conventionArray, setConventionArray ] = useState([]);
    var [gatheringArray, setGatheringArray ] = useState([]);


     
  
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

        //  axios
        //   .get("http://localhost:5000/events/local")
        //   .then((res) => {
        //     setLocalArray(res.data);
        //   })
        //   .catch((err) => {
        //     alert(err);
        //  });

        //  axios
        //   .get("http://localhost:5000/events/concert")
        //   .then((res) => {
        //     setConcertArray(res.data);
        //   })
        //   .catch((err) => {
        //     alert(err);
        //  });

         axios
          .get("http://localhost:5000/events/workshop")
          .then((res) => {
            setWorkshopArray(res.data);
          })
          .catch((err) => {
            alert(err);
         });

        //  axios
        //   .get("http://localhost:5000/events/free")
        //   .then((res) => {
        //     setFreeArray(res.data);
        //   })
        //   .catch((err) => {
        //     alert(err);
        //  });

        //  axios
        //   .get("http://localhost:5000/event/gathering")
        //   .then((res) => {
        //     setGatheringArray(res.data);
        //   })
        //   .catch((err) => {
        //     alert(err);
        //  });

        //  axios
        //   .get("http://localhost:5000/events/convention")
        //   .then((res) => {
        //     setConventionArray(res.data);
        //   })
        //   .catch((err) => {
        //     alert(err);
        //  });






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
              <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle filter-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Filter
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </div>
            </div>   
                
            <div className="homepage-sidebar">
                <div id="div1">
                    <img  src={image1}></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Events near you!']} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div>
                <div id="div2">
                    <img  src={image2}></img>
                    <h1  className="rowdies-text">
                        <Typewriter words = {['Free Events', 'Join now for free!']} cursor = {false} loop={true} delaySpeed={10000} />
                    </h1>
                </div>
                <div id="div3">
                    <img  src={image3}></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Concerts', "Let's Party"]} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div>
                <div id="div4">
                    <img  src={image4}></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Workshops',"Hands on learning!"]} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div>
                <div id="div5">
                    <img  src={image5}></img>
                    <h1  className="rowdies-text">
                        <Typewriter words = {['Conventions']} cursor = {false} loop={true} delaySpeed={10000} />
                    </h1>
                </div>
                <div id="div6">
                    <img  src={image6}></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Community gatherings']} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div>
            </div>
          
            { 
              eventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}}>
              <swiper-slide style={{color:"white"}} >
                No Current Events
              </swiper-slide> 
            </swiper-container> ) : (
                <EventsCarousel eventarray={eventsArray} id={id}/>
              )
              }
                { 
                  eventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}} >
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={eventsArray} id={id}/>
                  )
                }
                { 
                  eventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}}>
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={eventsArray} id={id}/>
                  )
                }
                { 
                  eventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}}>
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={workshopArray} id={id}/>
                  )
                }
                { 
                  eventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}}>
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={eventsArray} id={id}/>
                  )
                }
                { 
                  eventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}}>
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={eventsArray} id={id}/>
                  )
                }
               
               <section className="contact" id="contact">
                <h1 className="rowdies-text heading">contact us </h1>
                <form className="contat-form" action="">
                    <div className="inputBox">
                        <input type="email" placeholder="email" />
                        <input type="text" placeholder="subject" />
                    </div>
                    <textarea name="" placeholder="your message" id="" cols="30" rows="7"></textarea>
                    <div className="inputBox">
                      <div></div>
                    <input type="submit" value="send message" className="button" />
                    </div>
                </form>
            </section>
            <div className="footer"><Footer textColor={'white'}></Footer></div>
            
        </div>
    )
}