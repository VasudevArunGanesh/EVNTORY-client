import { useParams } from "react-router-dom";
import MyCalendar from "./MyCalendar";
import Navbar from "./Navbar";
import "./styles/calendar.css"
import { useState,useEffect } from "react";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";


export default function CalendarPage(){
    const {id} = useParams();
    const [user, setUser] = useState("abc");
    const [eventsList, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {


        const getData= async () => {
          setIsLoading(true);
          try{
            const res1 = await axios.get("https://evntory-app-api.onrender.com/user/"+id);
            setUser(res1.data);
            setList(res1.data.registeredEvents);
            
          } catch (err){
            alert(err);
          } finally{
            setIsLoading(false);
          }
        }
    
        getData();
    
      }, []);

      if (isLoading) {
        return <LoadingScreen  isLoading={isLoading}/>
      }

    return <div className="calendar-page">
            <Navbar links={[]} pfpicon={true} userpfp={user.pfp} dropdown={[{text:"Profile", path:"/user/"+id},{text:"Log Out", path:"../"}]} buttons={[]} bgcolor={"rgb(34, 34, 34)"} textcolor={"white"} linkto={"../user/"+id} username={user.name} logolink={"/user/"+id+"/home"}/>
        <MyCalendar myEventsList={eventsList}/>
    </div>
}