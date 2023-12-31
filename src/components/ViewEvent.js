import React, { useState, useEffect,CSSProperties } from 'react';
// import './styles/TicketBooking.css';
import { useParams, useNavigate } from "react-router-dom"; 
import Navbar from './Navbar';
import axios from "axios";
import "./styles/viewevent.css"
import { Button } from 'uiw';
import {format, parseISO} from 'date-fns'
import { Modal } from 'react-modal';
import AddressMap from './AddressMap';
import LoadingScreen from './LoadingScreen';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };



const ViewEvent = () => {
const { id } = useParams();
  const { eid } = useParams();
  const navigate = useNavigate(); 
  const [user, setUser] = useState();
  const [eventData, setEventData] = useState();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [eventSDate, setSDate] = useState();
  const [eventEDate, setEDate] = useState();
  const [message, setMessage] = useState("Event fully booked");
  const [isDisabled, setDisabled] = useState(true);
      
  useEffect(() => {
      
   
  
      const fetchEventData = async () => {
        try {
          setIsLoading(true);
          const res = await axios.get("https://evntory-app-api.onrender.com/user/"+id)
          
          setUser(res.data);
          
      
          const response = await axios.get(`https://evntory-app-api.onrender.com/events/${eid}`);
          setEventData(response.data);
         var date = parseISO(response.data.startDate);
        date = format(date, "dd-MM-yyyy HH:mm")
          setSDate(date);
          date = parseISO(response.data.endDate);
        date = format(date, "dd-MM-yyyy HH:mm")
          setEDate(date);
          console.log(response.data.expectedAttendees,response.data.ticketBooked,response.data.expectedAttendees>response.data.ticketBooked)
          response.data.expectedAttendees>response.data.ticketBooked ? (setDisabled(false)) : (setDisabled(true))
          response.data.expectedAttendees>response.data.ticketBooked ? (setMessage("")) : (setMessage("Event fully booked"))
        } catch (error) {
          setError(`Failed to fetch event data: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchEventData();
  
  }, []);

  const proceedToBooking = () => {
    window.location.replace(`/user/${id}/event/${eid}/book-ticket`); 
  };

  if (isLoading) {
    return <LoadingScreen  isLoading={isLoading}/>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



  return (
    <div className='view-page'>
        <Navbar links={[]} pfpicon={true} userpfp={user.pfp} dropdown={[{text:"Profile", path:"/user/"+id},{text:"Log Out", path:"../"}]} buttons={[{text:"Create an Event",type:"danger", path:"/user/"+id+"/create-event"}]} bgcolor={"#444"} textcolor={"white"} linkto={"../user/"+user._id} username={user.name} logolink={"/user/"+user._id+"/home"}/>
        <div className='event-page'>
        <div className='poster-sidebar'>
            <img src={eventData?.eventPoster} alt={eventData?.eventName || 'Event'} />
        </div>
        <div className='event-info'>
            <div className='event-header'>
                <div className='event-name'><h1 className='rowdies-text'>{eventData.eventName}</h1></div>
                <div className='event-desc rowdies-text'>{eventData.eventDescription}</div>
            </div>
            <div className='event-footer'>
                <div className='event-footer-left'>
                    <div className='event-date rowdies-text'><h3>When?</h3> {eventSDate} to {eventEDate}</div>
                    <div className='event-venue rowdies-text'><h3>Where?</h3> {eventData.venueName} <br /> {eventData.venueAddress}</div>
                    <div style={{height:"200px", width:"100%"}}>
                      <AddressMap  address={eventData.venueAddress}/>

                    </div>
                    
                </div>
                <div className='event-footer-right'>
                    <div className='event-type rowdies-text'><h3>Event type:</h3>{eventData.eventType}</div>
                    <div className='event-theme rowdies-text'><h3>Theme:</h3>{eventData.eventTheme}</div>
                    <div className='event-theme rowdies-text'><h3>Ticket:</h3>{eventData.ticketPrice} INR</div>
                    <div className='ticket-button'><Button className='rowdies-text' type='success' disabled={isDisabled} onClick={proceedToBooking}>Book Tickets</Button> {message}</div>
                    <div className='event-contact rowdies-text'>Contact: {eventData.organizerContact} for more details</div>
                </div>
            {/* <div className='event-'>{eventData.}</div>
            <div className='event-'>{eventData.}</div>
            <div className='event-'>{eventData.}</div> */}
            </div>
        </div>

        </div>




        {/* <div className="ticket-booking-container">
        <p><strong>Address:</strong> {eventData.venueAddress}</p> 
        </div> */}

    </div>
  );
};

export default ViewEvent;