// File: client/src/pages/CarRental.js

import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './CarRental.css';

const CarRental = () => {
  const [city, setCity] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [driverAge, setDriverAge] = useState(25);
  const [locations, setLocations] = useState([]);

  const handleSearch = async () => {
    if (!city || !pickupDate || !returnDate || !driverAge) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.get(
        `https://test.api.amadeus.com/v1/reference-data/locations`,
        {
          params: {
            keyword: city.label,
            subType: "CITY",
          },
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_CARRENTALSEARCH_AMADEUS_API_KEY}`
          }
        }
      );

      const cityData = response.data?.data || [];
      setLocations(cityData);
      alert(`Found ${cityData.length} rental locations in ${city.label}`);
    } catch (err) {
      console.error("Car rental fetch error:", err);
      alert("Error fetching car rentals.");
    }
  };

  const cityOptions = [
    "New York", "Los Angeles", "London", "Paris", "Rome", "Dubai",
    "Istanbul", "Doha", "Cairo", "Toronto", "Chicago"
  ].map(city => ({ value: city, label: city }));

  return (
    <div className="car-rental-container">
      <h2>Find Rental Cars</h2>

      <div className="form-group">
        <label>Pickup City</label>
        <Select
          options={cityOptions}
          value={city}
          onChange={setCity}
          placeholder="e.g. New York or Rome"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Pickup Date</label>
          <DatePicker
            selected={pickupDate}
            onChange={setPickupDate}
            placeholderText="Select pickup date"
          />
        </div>
        <div className="form-group">
          <label>Return Date</label>
          <DatePicker
            selected={returnDate}
            onChange={setReturnDate}
            placeholderText="Select return date"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Driver Age</label>
        <input
          type="number"
          min="18"
          value={driverAge}
          onChange={(e) => setDriverAge(Number(e.target.value))}
        />
      </div>

      <button className="search-btn" onClick={handleSearch}>
        Search Cars
      </button>

      {locations.length > 0 && (
        <div className="results-section">
          <h3>Available Rental Locations</h3>
          <ul>
            {locations.map((loc, index) => (
              <li key={index}>
                {loc.name} — {loc.iataCode}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarRental;
