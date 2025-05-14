// File: client/src/pages/CarRentals.js

import React, { useState } from "react";
import CityInput from "../CityInput";
import { FaCar } from "react-icons/fa";
import "./CarRentals.css";

const excludedCities = ["Tel Aviv", "Jerusalem", "Haifa", "Eilat", "Israel"];

function CarRentals() {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (excludedCities.some((city) => location.toLowerCase().includes(city.toLowerCase()))) {
      alert("Location not allowed.");
      return;
    }

    alert(
      `Searching car rentals in ${location} from ${pickupDate} to ${dropoffDate}... (Feature coming soon)`
    );
  };

  return (
    <div className="car-rentals-container">
      <h2><FaCar /> Rent a Car</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="car-location">Location</label>
          <CityInput
            id="car-location"
            placeholder="e.g. Dubai or JFK"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="car-pickup">Pick-Up Date</label>
            <input
              id="car-pickup"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="car-dropoff">Drop-Off Date</label>
            <input
              id="car-dropoff"
              type="date"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="search-btn">
          Search Cars
        </button>
      </form>
    </div>
  );
}

export default CarRentals;
