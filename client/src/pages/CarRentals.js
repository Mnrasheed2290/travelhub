// File: client/src/pages/CarRentals.js

import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { FaCar } from "react-icons/fa";
import "./CarRentals.css";

const excludedCountries = ["IL"]; // Exclude Israeli listings

const fetchCityOptions = async (inputValue) => {
  if (!inputValue || inputValue.length < 2) return [];
  try {
    const res = await axios.get("https://test.api.amadeus.com/v1/reference-data/locations", {
      params: {
        keyword: inputValue,
        subType: "CITY,AIRPORT",
      },
      headers: {
        Authorization: `Bearer YOUR_AMADEUS_ACCESS_TOKEN`, // Replace with actual token
      },
    });

    return res.data.data
      .filter(loc => !excludedCountries.includes(loc.address?.countryCode))
      .map(loc => ({
        value: loc.name,
        label: `${loc.name} (${loc.iataCode})`,
      }));
  } catch (err) {
    console.error("City fetch error:", err);
    return [];
  }
};

function CarRentals() {
  const [location, setLocation] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location || !pickupDate || !dropoffDate) {
      alert("Please fill all fields");
      return;
    }

    // MOCK car results (replace with live API if needed)
    setResults([
      {
        brand: "Toyota",
        model: "Camry",
        type: "Sedan",
        price: "$48/day",
      },
      {
        brand: "Jeep",
        model: "Grand Cherokee",
        type: "SUV",
        price: "$69/day",
      },
      {
        brand: "BMW",
        model: "3 Series",
        type: "Luxury",
        price: "$95/day",
      },
    ]);
  };

  return (
    <div className="car-rentals-container">
      <h2><FaCar /> Rent a Car</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>Location</label>
          <AsyncSelect
            cacheOptions
            loadOptions={fetchCityOptions}
            defaultOptions
            onChange={setLocation}
            value={location}
            placeholder="e.g. Dubai or JFK"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Pick-Up Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Drop-Off Date</label>
            <input
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

      {results.length > 0 && (
        <div className="car-results">
          <h3>Available Rentals</h3>
          <div className="car-cards">
            {results.map((car, idx) => (
              <div key={idx} className="car-card">
                <h4>{car.brand} {car.model}</h4>
                <p>{car.type}</p>
                <strong>{car.price}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CarRentals;
