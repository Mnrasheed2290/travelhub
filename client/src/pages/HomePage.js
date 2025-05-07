import React from "react";
import "../pages/HomePage.css";  // Correct path to CSS

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-banner">
        <img
          src={`${process.env.PUBLIC_URL}/assets/banner.png`}
          alt="Fly high with our deals"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Discover the World</h1>
          <p>Book flights and hotels with unbeatable prices</p>
        </div>
      </div>

      <div className="search-section">
        <h2>Plan Your Journey</h2>
      </div>
    </div>
  );
};

export default HomePage;
