import React from "react";
import "../styles/HomePage.css";
import FlightSearch from "../components/FlightSearch";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-banner">
        <img
          src="/assets/banner.png"
          alt="Fly high with our deals"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Discover the World</h1>
          <p>Book flights and hotels with unbeatable prices</p>
        </div>
      </div>

      <div className="search-section">
        <FlightSearch />
      </div>
    </div>
  );
};

export default HomePage;
