// File: client/src/pages/HotelSearch.js

import React, { useState, useEffect, useContext, useCallback } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../components/BookingContext";
import "./HotelSearch.css";

function HotelSearch() {
  const [city, setCity] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [options, setOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { addBooking } = useContext(BookingContext);
  const navigate = useNavigate();

  // Fetch city suggestions as the user types
  useEffect(() => {
    const fetchCities = async () => {
      if (searchTerm.length < 2) return;
      try {
        const res = await axios.get(`https://travelhub-1.onrender.com/api/locations?q=${searchTerm}`);
        const formatted = res.data.map(city => ({
          value: city.iataCode,
          label: `${city.name}, ${city.country}`
        }));
        setOptions(formatted);
      } catch (err) {
        console.error("Hotel city fetch failed:", err.message);
        setOptions([]);
      }
    };
    fetchCities();
  }, [searchTerm]);

  const handleInputChange = useCallback((inputValue, { action }) => {
    if (action === "input-change") {
      setSearchTerm(inputValue);
    }
  }, []);

  const handleSearch = () => {
    if (!city || !checkIn || !checkOut) {
      alert("Please fill all fields");
      return;
    }

    setResults([
      {
        hotelName: "SkyNest Royal Suites",
        city: city.label,
        checkIn,
        checkOut,
        price: "$620",
        adults,
        rooms
      }
    ]);
  };

  return (
    <div className="hotel-search-container">
      <h2>Luxury Hotel Search</h2>

      <div className="form-group">
        <label>Destination city</label>
        <Select
          options={options}
          value={city}
          onChange={setCity}
          onInputChange={handleInputChange}
          isSearchable
          placeholder="Type to search..."
        />
      </div>

      <div className="form-group">
        <label>Check-In Date</label>
        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Check-Out Date</label>
        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Guests</label>
        <input type="number" min={1} value={adults} onChange={(e) => setAdults(Number(e.target.value))} />
      </div>

      <div className="form-group">
        <label>Rooms</label>
        <input type="number" min={1} value={rooms} onChange={(e) => setRooms(Number(e.target.value))} />
      </div>

      <button className="search-btn" onClick={handleSearch}>Search Hotels</button>

      {results.length > 0 && (
        <div className="results-section">
          {results.map((hotel, i) => (
            <div className="result-card" key={i}>
              <h4>{hotel.hotelName}</h4>
              <p>{hotel.city}</p>
              <p>{hotel.checkIn} → {hotel.checkOut}</p>
              <p>{hotel.rooms} room(s), {hotel.adults} guest(s)</p>
              <p className="price">{hotel.price}</p>
              <button onClick={() => addBooking({ type: "hotel", ...hotel })}>
                Add to Itinerary
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HotelSearch;
