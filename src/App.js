import './App.css';
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
