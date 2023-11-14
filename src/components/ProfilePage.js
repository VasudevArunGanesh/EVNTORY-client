import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "./Footer";
import Navbar from "./Navbar";
import Modal from 'react-modal';
import { Button } from "uiw";

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

export default function ProfilePage(){
  const { id } = useParams();
  const [user, setUser] = useState("abc");
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
      

  useEffect(() => {
      const url = "http://localhost:5000/user/"+id;
      axios.get(url).then((res) =>{
          // setUser(res.data);
          setUser(res.data);
          // console.log(user, "user");
      }).catch((err) =>{
          alert(err);
      });
  }, []);

  const isPasswordValid = () => {
    return  newPassword === confirmNewPassword;
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isPasswordValid()) {
      setMessage("passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // backend
      const url = "http://localhost:5000/user/"+id+"/update-pass";
      const obj = {
                        id,
                        currentPassword,
                        newPassword };
      const res = await axios.patch(url, obj);
      if (res.data.message === "Password updated successfully"){
        setMessage("Password updated successfully.");
        await setTimeout(8000);
        window.location.replace(`/user/${id}`);
      }
      setMessage(res.data.message || "Password updated successfully.");
    } catch (err) {
      // console.error(error);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


    return (
        <div>
          <Navbar links={[]}  pfpicon={true} dropdown={[{text:"Log Out", path:"../"}]} buttons={[{text:"Create an Event",type:"danger", path:"/user/"+id+"/create-event"},{text:"Update password",type:"success", path:"/user/"+id+"/update-pass"}]} bgcolor={"rgb(34, 34, 34)"} textcolor={"white"} linkto={"../user/"+id} username={user.name}  logolink={"../user/"+id+"/home"}/>
            <ul>

                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                
            </ul>

            <button onClick={openModal}>Update Pass</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{marginRight:"20px"}}>Update Password<span className="material-symbols-outlined" onClick={closeModal}>cancel</span></h2>
        
        <div  className="update-profile-container">
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div>
          <label>Current Password</label><br />
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="update-profile-input"
          />
        </div>
        <div>
          <label>New Password</label><br />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="update-profile-input"
          />
        </div>
        <div>
          <label>Confirm New Password</label><br />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="update-profile-input"
          />
        </div>
        <Button type="primary" className="update-profile-button" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </Button>
        {message && <div className="update-profile-message">{message}</div>}
      </form>
    </div>
      </Modal>
        </div>
    )
}
