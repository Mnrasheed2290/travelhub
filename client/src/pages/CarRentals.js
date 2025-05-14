// File: client/src/pages/CarRentals.js

import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./CarRentals.css";

const CarRental = () => {
  const [city, setCity] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [driverAge, setDriverAge] = useState(25);
  const [cityOptions, setCityOptions] = useState([]);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("https://travelhub-1.onrender.com/api/hotel-cities", {
          params: { keyword: "a" }
        });
        const formatted = res.data.map(city => ({
          value: city.name,
          label: `${city.name}, ${city.country}`
        }));
        setCityOptions(formatted);
      } catch (err) {
        console.error("Error loading car rental cities:", err.message);
        alert("Failed to load pickup cities.");
      }
    };
    fetchCities();
  }, []);

  const handleSearch = () => {
    if (!city || !pickupDate || !returnDate || !driverAge) {
      alert("Please fill in all fields.");
      return;
    }

    setLocations([
      {
        name: city.label,
        iataCode: "XYZ",
        pickup: pickupDate.toDateString(),
        return: returnDate.toDateString()
      }
    ]);
  };

  const handleBook = (loc) => {
    navigate("/confirmation", {
      state: {
        bookingDetails: {
          rentalLocation: loc.name,
          city: city.label,
          pickup: pickupDate.toDateString(),
          return: returnDate.toDateString(),
          driverAge
        }
      }
    });
  };

  return (
    <div className="car-rental-container">
      <h2>Find Rental Cars</h2>
      <div className="form-group">
        <label>Pickup City</label>
        <Select options={cityOptions} value={city} onChange={setCity} isSearchable />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Pickup Date</label>
          <DatePicker selected={pickupDate} onChange={setPickupDate} />
        </div>
        <div className="form-group">
          <label>Return Date</label>
          <DatePicker selected={returnDate} onChange={setReturnDate} />
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

      <button className="search-btn" onClick={handleSearch}>Search Cars</button>

      {locations.length > 0 && (
        <div className="results-section">
          <h3>Available Locations</h3>
          <ul>
            {locations.map((loc, index) => (
              <li key={index}>
                <strong>{loc.name}</strong> — {loc.iataCode}
                <button className="book-btn" onClick={() => handleBook(loc)}>Book This Car</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarRental;
