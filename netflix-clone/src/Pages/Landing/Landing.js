import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import NetflixLogo from "../../assets/images/NetflixLogo.png"; // Netflix logo

const Landing = () => {
  const [movieImages, setMovieImages] = useState([]);
   

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(
          `${requests.fetchNetflixOriginals}&timestamp=${Date.now()}` // Prevents caching
        );

        const shuffledMovies = request.data.results.sort(() => 0.5 - Math.random()); // Shuffle movies
        const selectedMovies = shuffledMovies.slice(0, 6); // Pick 6 random movies

        const imageUrls = selectedMovies.map(
          (movie) => `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        );

        setMovieImages(imageUrls);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    })();
  }, []);

   // 🔹 Enhanced validation to prevent navigation on invalid email
  const handleStart = (e) => {
  e.preventDefault();
  const emailInput = document.querySelector(".signup-input");
  const emailValue = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailValue)) {
    emailInput.classList.add("error"); // 🔹 Highlights input field
    emailInput.focus(); // 🔹 Focuses input field
    return; // 🔹 Stops navigation
  }

  // Navigate only if email is correct
  window.location.href = "/signup";
};


  return (
    <div className="landing-container">
      {/* Netflix Logo */}
      <img src={NetflixLogo} alt="Netflix Logo" className="netflix-logo" />

      {/* Sign In Button */}
      <Link to="/signin">
        <button className="signin-button">Sign In</button>
      </Link>

      {/* Movie Collage Background */}
      <div className="multi-background">
        {movieImages.map((img, index) => (
          <div key={index} className="background-layer" style={{ backgroundImage: `url(${img})` }}></div>
        ))}
      </div>
      <div className="body">
      <h1>Unlimited Movies, TV Shows, and More.</h1>
      <p>Starts at USD 2.99. Cancel anytime.</p>
    
      
  
  <p className="signup-text">Ready to watch? Enter your email to create or restart your membership.</p>

    <div className="signup-form">
            <input type="email" placeholder="Enter your email" className="signup-input" />
            <button className="signup-button" onClick={handleStart}>Get Started</button> {/* 🔹 Uses validation logic before navigating */}
          </div>
</div>

     
    </div>
  );
};

export default Landing;
