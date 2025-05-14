// File: client/src/pages/HomePage.js

import React from "react";
import { FaPlaneDeparture, FaHotel, FaCar } from "react-icons/fa";
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

        <div className="icon-section">
          <div className="icon-card">
            <FaPlaneDeparture className="icon" />
            <h3>Flights</h3>
            <p>Find the best prices on international and domestic airfares.</p>
          </div>

          <div className="icon-card">
            <FaHotel className="icon" />
            <h3>Hotels</h3>
            <p>Stay in comfort with our exclusive luxury hotel deals.</p>
          </div>

          <div className="icon-card">
            <FaCar className="icon" />
            <h3>Car Rentals</h3>
            <p>Rent premium cars for your journey at the best rates.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
