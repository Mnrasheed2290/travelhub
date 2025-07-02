// File: client/src/pages/CarRentals.js

import React, { useState, useEffect, useCallback } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      const trimmed = searchTerm.trim();
      if (trimmed.length < 2) return;
      try {
        const res = await axios.get(`https://travelhub-1.onrender.com/api/locations?q=${encodeURIComponent(trimmed)}`);
        const formatted = res.data.map(city => ({
          value: city.iataCode,
          label: `${city.name}, ${city.country}`
        }));
        setCityOptions(formatted);
      } catch (err) {
        console.error("Error loading car rental cities:", err.message);
        setCityOptions([]);
      }
    };
    fetchCities();
  }, [searchTerm]);

  const handleInputChange = useCallback((inputValue, { action }) => {
    if (action === "input-change") {
      setSearchTerm(inputValue);
    }
  }, []);

  const handleSearch = async () => {
    if (!city || !pickupDate || !returnDate || !driverAge) {
      alert("Please complete all fields.");
      return;
    }

    try {
      const payload = {
        locationCode: city.value,
        pickupDate: pickupDate.toISOString().split("T")[0],
        returnDate: returnDate.toISOString().split("T")[0],
        driverAge
      };

      const res = await axios.post("https://travelhub-1.onrender.com/api/car-rentals", payload);
      setLocations(res.data.data || []);
    } catch (err) {
      console.error("Car rental search failed:", err.message);
      alert("Failed to fetch car rentals. Please try again.");
    }
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
        <Select
          options={cityOptions}
          value={city}
          onChange={setCity}
          onInputChange={handleInputChange}
          isSearchable
          placeholder="Type city name..."
        />
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
          <h3>Available Cars</h3>
          <ul>
            {locations.map((loc, index) => (
              <li key={index}>
                <strong>{loc.vehicle?.make} {loc.vehicle?.model}</strong> — {loc.estimatedTotal?.amount} {loc.estimatedTotal?.currency}
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
