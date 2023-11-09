import './App.css';
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import LandPage from "./components/LandPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import CreateEvent from './components/CreateEvent';
import ProfilePage from './components/ProfilePage';
import UpdateEvent from './components/UpdateEvent';


function App() {
  axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data.message);
  });
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandPage />} />
        <Route path="/user/login" element={<LogIn />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/:id/createevent" element={<CreateEvent />} />
        <Route path='/user/:id' element={<ProfilePage />} />
        <Route path="/user/:id/event/:eid/updateevent" element={<UpdateEvent />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
