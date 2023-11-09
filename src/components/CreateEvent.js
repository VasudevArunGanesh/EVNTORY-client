import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./styles/createevent.css"
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function CreateEvent(){
    const { id } = useParams();
    const [ name, setName ] = useState();
    const [eventName, setEventName] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [eventDescription, setEventDescription] = useState("");
    const [eventType, setEventType] = useState("");
    const [eventTheme, setEventTheme] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [venueName, setVenueName] = useState("");
    const [venueAddress, setVenueAddress] = useState("");
    const [organizerContact, setOrganizerContact] = useState("");
    const [ticketPrice, setTicketPrice] = useState(0);
    const [expectedAttendees, setExpectedAttendees] = useState("");
    const [useOtherServices, setUseOtherServices] = useState([]);
    const [customTheme, setCustomTheme] = useState("");
    const eventStatus = 0;//-1=terminated, 1=ongoing
    const [ eventPoster, setPoster ] = useState("https://picsum.photos/200/300");
    const userId = id;
    
    useEffect(() => { axios
      .get("http://localhost:5000/user/" + id + "/createevent")
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        alert(err);
     });})

     function convertToBase64(file){
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result)
        };
        fileReader.onerror = (err) => {
          reject(err);
        }
      })
     }

     const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setPoster(base64);
     }
  const handleOtherServiceChange = (selectedService) => {
    if (useOtherServices.includes(selectedService)) {
      setUseOtherServices(
        useOtherServices.filter((service) => service !== selectedService)
      );
    } else {
      setUseOtherServices([...useOtherServices, selectedService]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      eventName,
      isPrivate,
      eventDescription,
      eventType,
      eventTheme,
      startDate,
      endDate,
      venueName,
      venueAddress,
      organizerContact,
      ticketPrice,
      expectedAttendees,
      useOtherServices,
      eventStatus,
      eventPoster,
      userId
    };

    const url = "http://localhost:5000/user/createevent";//need to replace

    // Backend connection
    axios
      .post(url, eventData)
      .then((res) => {
        if (res.status === 200) {
          let eid = res.data._id;
          window.location.replace(`/user/${id}/event/${eid}/updateevent`);
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        alert(err);
      });
    
    }
     return (
      <div>
        <Navbar links={[]} buttons={[]} bgcolor={"rgb(34, 34, 34)"} textcolor={"white"} linkto={"../user/"+id} username={name}/>
        <div className="background-image-create"></div>
        <div className="eventcreatepage">
        <h2>Create Your Event</h2>
        <form className="form-event was-validated" onSubmit={handleSubmit}>
            <table className="event-table">
            
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event" >Event Name:</label></td>
              <td className="event-table-data2"><input
              className="form-control input-event"
                type="text"
                required
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              /></td>
            </tr>
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event" >Event Visibility</label></td>
              <td className="event-table-data2"><label className="label-options">
              <input
              className="input-event"
                type="radio"
                value="public"
                checked={!isPrivate}
                onChange={() => setIsPrivate(false)}
              />Public
              </label>
            <label className="label-options">
              <input
              className="input-event"
                type="radio"
                value="private"
                checked={isPrivate}
                onChange={() => setIsPrivate(true)}
              />  Private
              </label></td>
            </tr>
            <tr className="event-table-row">
              <td className="event-table-data1"><label className=" label-event">
              Event Description:</label></td>
              <td className="event-table-data2"><textarea
              className="form-control textarea-event"
              required
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              /></td>
            </tr>
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Event Type: </label></td>
              <td className="event-table-data2"><select
              className="select-event"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="Type">Select Event Type</option>
                <option value="Funeral">Funeral</option>
                <option value="Wedding">Wedding</option>
                <option value="Concert">Concert</option>
                <option value="Conference">Conference</option>
                <option value="Networking">Networking</option>
                <option value="Workshop">Workshop</option>
                <option value="Product launch">Product launch</option>
                <option value="Internal corporate">Internal corporate</option>
              </select></td>
            </tr>
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Event Theme:</label></td>
              <td className="event-table-data2"><select
              className="select-event"
                value={eventTheme}
                onChange={(e) => setEventTheme(e.target.value)}
              >
                <option value="">Select Event Theme</option>
                <option value="Greeny">Greeny</option>
                <option value="Bright">Bright</option>
                <option value="Gloomy">Gloomy</option>
                <option value="Spooky">Spooky</option>
                <option value="others">Others</option>
              </select></td>
            </tr>
            {eventTheme === "others" && (
              <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">Enter the theme:</label></td>
              <td className="event-table-data2"><input
                className="input-event"
                  type="text"
                  value={customTheme}
                  onChange={(e) => setCustomTheme(e.target.value)}
                /></td>
            </tr>
            )}
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Start Date and Time:</label></td>
              <td className="event-table-data2"><input
              className="form-control input-event"
                type="datetime-local"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              /></td>
            </tr>
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              End Date and Time:</label></td>
              <td className="event-table-data2"><input
              className="form-control input-event"
                type="datetime-local"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              /></td>
            </tr>         
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Venue Name:</label></td>
              <td className="event-table-data2"><input
              className="form-control input-event"
                type="text"
                required
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
              /></td>
            </tr>
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Venue Address:</label></td>
              <td className="event-table-data2"><textarea
              className="form-control textarea-event"
                value={venueAddress}
                required
                onChange={(e) => setVenueAddress(e.target.value)}
              /></td>
            </tr>         
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Organizer's Contact Number:</label></td>
              <td className="event-table-data2"><input
              className="input-event"
                type="text"
                value={organizerContact}
                onChange={(e) => setOrganizerContact(e.target.value)}
              /></td>
            </tr>         
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Ticket Price:</label></td>
              <td className="event-table-data2"><input
              className="input-event"
                type="text"
                placeholder="0"
                onChange={(e) => setTicketPrice(e.target.value)}
              /></td>
            </tr>          
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">Expected Number of Attendees:</label></td>
              <td className="event-table-data2"><input
              className="form-control input-event"
                type="number"
                required
                value={expectedAttendees}
                onChange={(e) => setExpectedAttendees(e.target.value)}
              /></td>
            </tr>          
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">Need of other services?</label></td>
              <td className="event-table-data2"><div>
        <label className="label-options">
          <input
          className="input-event"
            type="checkbox"
            name="useOtherServices"
            value="Hosting"
            checked={useOtherServices.includes("Hosting")}
            onChange={(e) => handleOtherServiceChange(e.target.value)}
          />
          Hosting
        </label>
        <label className="label-options">
          <input
          className="input-event"
            type="checkbox"
            name="useOtherServices"
            value="Parking"
            checked={useOtherServices.includes("Parking")}
            onChange={(e) => handleOtherServiceChange(e.target.value)}
          />
          Parking
        </label>
        <label className="label-options">
          <input
          className="input-event"
            type="checkbox"
            name="useOtherServices"
            value="catering"
            checked={useOtherServices.includes("catering")}
            onChange={(e) => handleOtherServiceChange(e.target.value)}
          />
          Catering
        </label>
        <label className="label-options">
          <input
          className="input-event"
            type="checkbox"
            name="useOtherServices"
            value="photography"
            checked={useOtherServices.includes("photography")}
            onChange={(e) => handleOtherServiceChange(e.target.value)}
          />
          Photography
        </label>
      </div></td>
            </tr>
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event" for="img">Upload poster:</label></td>
              <td className="event-table-data2"><input className="input-event-pic " style={{color:"black"}} type="file" id="img" name="img" accept=".jpeg, .png, .jpg" onChange={(e) => handleFileUpload(e)}/></td>
            </tr>
            
            
          </table>
          <button className="button-event" type="submit">Create Event</button>
        </form>
        </div>
        <div className="footer"><Footer textColor={'white'}></Footer></div>
      </div>
    );

  };



