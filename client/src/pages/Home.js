import React from "react";
import "../styles/HomePage.css"; // Make sure this matches the actual path
import SearchTabs from "../components/SearchTabs";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-banner">
        <img
          src="/banner.png"
          alt="Fly high with our deals"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Discover the World</h1>
          <p>Book flights and hotels with unbeatable prices</p>
        </div>
      </div>

      <div className="search-section">
        <SearchTabs />
      </div>
    </div>
  );
};

export default HomePage;
