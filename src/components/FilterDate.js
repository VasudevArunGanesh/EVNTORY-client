import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EventsCarousel from "./EventsCarousel";
import LoadingScreen from './LoadingScreen';
import "./styles/homepage.css"
import { Button } from "uiw";
import image from "./resources/local_ev.jpg"


export default function FilterDate(){
    const { id } = useParams();
    const [user, setUser] = useState("abc");
    const [dateArray, setDateArray ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [Sdate, setSdate] = useState();
    const [Edate, setEdate] = useState();



    useEffect( () => {

        const getArrays = async () => {

            var res1 = await axios.get("https://evntory-app-api.onrender.com/user/"+id+"/home");
       try{
        setUser(res1.data);

      
        } catch (err){
          console.error(err);
        } finally{
        setIsLoading(false);

        }
      }
      getArrays();
        
        
        
            },[dateArray])



            if (isLoading) {
              return <LoadingScreen  isLoading={isLoading}/>
            }
    const handleSubmit = async (e) => {
        e.preventDefault();

        var res = await axios.get("https://evntory-app-api.onrender.com/events/date/"+Sdate+"/"+Edate);
        try{
        console.log(res.data);
        setDateArray(res.data);
    }
        catch (err){
            console.error(err);
          }
    }
      
    return (
        <div className="main-home-page" id="hpage" style={{backgroundColor:"#222"}}>
            <Navbar links={[{text:"Home", path:"../"}]} pfpicon={true} userpfp={user.pfp} dropdown={[{text:"Profile", path:"/user/"+id},{text:"Log Out", path:"../"}]} buttons={[{text:"Create an Event",type:"danger", path:"/user/"+id+"/create-event#createheading"}]} bgcolor={"#444"} textcolor={"white"} linkto={"../user/"+user._id} username={user.name} logolink={"/user/"+id+"/home"}/>
            <div className="search-filter-bar"> 
                <form className="searchbar-form" onSubmit={(e)=>handleSubmit(e)}>
                    <label className="search-label">Starting date: <input className="search-input" type="datetime-local" onChange={(e)=>setSdate(e.target.value)} /></label>
                    <label className="search-label">Ending date: </label><input className="search-input" type="datetime-local" onChange={(e)=>setEdate(e.target.value)} />
                    <Button type="submit" className="search-button" onClick={(e)=>handleSubmit(e)}>Search</Button>
                </form>
              <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle filter-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Filter
                  </button>
                  <ul className="dropdown-menu">
                  <Link className="dropdown-item" to={"/user/"+id+"/home/filter/local"}><li color="#999">Events near you</li></Link>
                  </ul>
                </div>
            </div>


            <div className="homepage-sidebar-b">
                {/* <div id="div1">
                    <img  src={image1}></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Events near you!']} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div> */}
                <div id="diva">
                    <img  src={image}></img>
                    <h1  className="rowdies-text">
                        Filtering by Date
                    </h1>
                </div>
                </div>

                { 
                  dateArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}} >
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={dateArray} id={id}/>
                  )
                }
                
            <div className="footer"><Footer textColor={'white'} isLogin={true} id={id}></Footer></div>

               
            </div>

        
    )
}