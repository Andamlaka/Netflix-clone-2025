import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "../../utils/api"; // Ensure this points to your backend

const Signup = () => {
  const [formData, setFormData] = useState({
     name: "",
     email: "", 
     password: "",
     secretQuestion:"",
     secretAnswer:""
    });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.email.includes("@")) {
      setError("Invalid email address.");
      setLoading(false);
      return;
    } else if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }else if (!formData.secretQuestion || !formData.secretAnswer) {
      setError("Please select and answer a security question.");
      setLoading(false);
      return;
    }
    

    try {
      const response = await axios.post("/api/auth/signup", formData);
      console.log("Signup successful:", response.data);
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <p>Join now and start streaming the best content.</p>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password (6+ chars)" onChange={handleChange} required />
        
        <select name="secretQuestion" onChange={handleChange} required>
          <option value="">Select a security question</option>
          <option value="What is your pet's name?">What is your pet's name?</option>
          <option value="What is your favorite book?">What is your favorite book?</option>
          <option value="What city were you born in?">What city were you born in?</option>
        </select>

         <input type="text" name="secretAnswer" placeholder="Your Answer" onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Get Started"}
        </button>
      </form>

      <p className="signin-link">Already have an account? <Link to="/signin">Sign in</Link></p>
    </div>
  );
};

export default Signup;
