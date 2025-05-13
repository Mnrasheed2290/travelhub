// File: client/src/pages/HomePage.js
import React from "react";
import "../styles/HomePage.css"; // Make sure this matches your structure

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-banner">
        <img
          src="/assets/banner.jpg"
          alt="Explore the world"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Find Your Next Adventure</h1>
          <p>Luxury travel made affordable</p>
          <a href="/flights" className="hero-button">Search Flights</a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
