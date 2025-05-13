// File: client/src/pages/HomePage.js

import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-banner">
        <img
          src={`${process.env.PUBLIC_URL}/assets/banner.jpg`}
          alt="Luxury Travel Deals"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Explore the World in Style</h1>
          <p>Luxury travel made effortless – flights, hotels & cars in one place.</p>
        </div>
      </div>

      <div className="search-section">
        <h2>Plan Your Journey</h2>
        <p>Book flights, hotels, and rental cars with unbeatable deals.</p>
      </div>
    </div>
  );
};

export default HomePage;
