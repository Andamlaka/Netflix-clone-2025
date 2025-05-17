import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing"; // New landing page
import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} /> {/* Show landing first */}
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
