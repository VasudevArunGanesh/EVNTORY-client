import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./styles/updateevent.css";
import { useParams } from "react-router-dom";

export default function UpdateEvent() {
    const { eid } = useParams();
    const [eventData, setEventData] = useState(null); 
    const [eventName, setEventName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [venueName, setVenueName] = useState("");
    const [venueAddress, setVenueAddress] = useState("");
    const [organizerContact, setOrganizerContact] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [expectedAttendees, setExpectedAttendees] = useState("");
    const [useOtherServices, setUseOtherServices] = useState([]);
    const [eventPoster, setEventPoster ] = useState();

  useEffect(() => {
    const fetchEventData = async () => {
      const url = "http://localhost:5000/events/" +eid;
      try {
        const res = await axios.get(url);
        console.log(res.data);
        // setEventData(res.data);
        // setEventName(res.data.eventName)
        // setStartDate(res.data.startDate);
        // setEndDate(res.data.endDate);
        // setVenueName(res.data.venueName);
        // setVenueAddress(res.data.venueAddress);
        // setOrganizerContact(res.data.organizerContact);
        // setTicketPrice(res.data.ticketPrice);
        // setExpectedAttendees(res.data.expectedAttendees);
        // setUseOtherServices(res.data.useOtherServices);
        setEventPoster(res.data.eventPoster);
        var imgEle = document.getElementsByClassName("imageele");
        imgEle.scr ='data:image/jpeg;base64,'+eventPoster.toString('base64');
      } catch (error) {
        console.error("Error fetching event data", error);
      }
    };
    fetchEventData();
  }, [eid]);

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
    const updatedData = {
      startDate,
      endDate,
      venueName,
      venueAddress,
      organizerContact,
      ticketPrice,
      expectedAttendees,
      useOtherServices,
    };

    const url = "http://localhost:5000/events/update/"+eid; 

    axios
      .patch(url, updatedData)
      .then((res) => {
        if (res.status === 200) {
          alert("Event updated successfully");
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

//   if (!eventData) {
//     return <div>Loading...</div>;
//   }

  return (
    <div>
        <img className="imageele" src={eventPoster} />
      <h2>Update Your Event</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
        <br />
        {/* <label>
          Event Type:
          <input type="text" value={eventData.eventType} readOnly />
        </label> */}
        <br />

        <label>
          Start Date and Time:
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          End Date and Time:
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Venue Name:
          <input
            type="text"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Venue Address:
          <textarea
            value={venueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
          />
        </label>
        <br />
        <label>
          Organizer's Contact Number:
          <input
            type="text"
            value={organizerContact}
            onChange={(e) => setOrganizerContact(e.target.value)}
          />
        </label>
        <br />
        <label>
          Ticket Price:
          <input
            type="text"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Expected Number of Attendees:
          <input
            type="number"
            value={expectedAttendees}
            onChange={(e) => setExpectedAttendees(e.target.value)}
          />
        </label>
        <br />
        <label>
          Additional Services:
          <div className="services-checkboxes">
            {['Catering', 'Security', 'Audio/Visual'].map((service) => (
              <div key={service}>
                <input
                  type="checkbox"
                  id={service}
                  checked={useOtherServices.includes(service)}
                  onChange={() => handleOtherServiceChange(service)}
                />
                <label htmlFor={service}>{service}</label>
              </div>
            ))}
          </div>
        </label>
        <br />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
}

