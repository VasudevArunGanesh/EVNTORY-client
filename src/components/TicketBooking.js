import React, { useState, useEffect } from 'react';
// import './styles/TicketBooking.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';

const TicketBooking = () => {
    const {id} = useParams();
  const { eid } = useParams();
  const [user, setUser] = useState();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState(1);
    const [email,setEmail] = useState();
  useEffect(() => {
      
    const fetchEventData = async () => {
      try {
        setIsLoading(true);
        axios.get("http://localhost:5000/user/"+id).then((res) =>{
          // setUser(res.data);
          setUser(res.data);
          // console.log(user, "user");
      }).catch((err) =>{
          alert(err);
      });

        const response = await axios.get(`http://localhost:5000/events/${eid}`);
        setEventData(response.data);
      } catch (error) {
        setError(`Failed to fetch event data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const totalCost = eventData.ticketPrice * tickets;
    alert(`Booking confirmed. Number of tickets: ${tickets}, Total cost: ${totalCost} INR`);
  };

  if (isLoading) {
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calculate total cost
  const totalCost = eventData?.ticketPrice * tickets;

  return (
        <div className='booking-page'>
                <Navbar links={[{text:"back",path:"./"}]} pfpicon={true} dropdown={[{text:"Profile", path:"/user/"+id},{text:"Log Out", path:"../"}]} buttons={[{text:"Create an Event",type:"danger", path:"/user/"+id+"/create-event"}]} bgcolor={"#444"} textcolor={"white"} linkto={"../user/"+user._id} username={user.name} logolink={"/user/"+user._id+"/home"}/>
                <h2 className='rowdies-text' style={{color:"white"}}>Booking Tickets for {eventData?.eventName}</h2>
                <div className='booking-container'>
                    <form className='booking-form' onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email:</label>
                        <input type="text" value={user.email} id='email' onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="tickets">Number of Tickets:</label>
                        <select 
                            id="tickets" 
                            value={tickets} 
                            onChange={(e) => setTickets(Number(e.target.value))} 
                        >
                            {[...Array(10).keys()].map(n => (
                            <option key={n+1} value={n+1}>{n+1}</option>
                            ))}
                        </select>
                        <p><strong>Total Cost:</strong> {totalCost} INR</p>
                        <button type="submit">Confirm</button>
                    </form>
                </div>
                <div></div>
                <div></div>
        </div>






    // <div className="ticket-booking-container" style={{backgroundColor:"#444"}}>
    //   <h2>Booking Tickets for {eventData?.eventName}</h2>
    //   <p><strong>Price:</strong> {eventData?.ticketPrice} INR per ticket</p>
      
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //         <label htmlFor='email'>email:</label>
    //         <input type="text" value={user.email} id='email' onChange={(e) => setEmail(e.target.value)} />
    //         </div>
    //         <div>
    //       <label htmlFor="tickets">Number of Tickets:</label>
         
             
    //       <p><strong>Total Cost:</strong> {totalCost} INR</p>
    //     </div>
    //     <button type="submit">Confirm Booking</button>
    //   </form>
    // </div>
  );
};

export default TicketBooking;