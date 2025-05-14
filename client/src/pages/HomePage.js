// File: client/src/pages/HomePage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHotel, FaPlane, FaCar } from "react-icons/fa";
import "./HomePage.css";

const HomePage = () => {
  const [tab, setTab] = useState("hotels");
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (tab === "flights") navigate("/flights");
    else if (tab === "cars") navigate("/cars");
    else navigate("/hotels");
  };

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

      <div className="homepage-tabs">
        <div className="tab-buttons">
          <button className={tab === "hotels" ? "active" : ""} onClick={() => setTab("hotels")}>
            <FaHotel /> Hotels
          </button>
          <button className={tab === "flights" ? "active" : ""} onClick={() => setTab("flights")}>
            <FaPlane /> Flights
          </button>
          <button className={tab === "cars" ? "active" : ""} onClick={() => setTab("cars")}>
            <FaCar /> Cars
          </button>
        </div>
        <button className="go-search" onClick={handleRedirect}>Go to {tab.charAt(0).toUpperCase() + tab.slice(1)} Search</button>
      </div>
    </div>
  );
};

export default HomePage;
