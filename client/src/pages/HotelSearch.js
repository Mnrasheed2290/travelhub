// File: travelhub/client/src/pages/HotelSearch.js

import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../components/BookingContext";
import API_KEYS from "../apiKeys";
import "./HotelSearch.css";

const excludedCities = ["Tel Aviv", "Jerusalem", "Haifa", "Eilat", "Israel", "IL"];

function HotelSearch() {
  const [city, setCity] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [options, setOptions] = useState([]);
  const [results, setResults] = useState([]);

  const { addBooking } = useContext(BookingContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/hotels/cities`, {
          headers: { Authorization: `Bearer ${API_KEYS.hotelSearch.key}` }
        });
        const filtered = response.data.filter(city =>
          !excludedCities.some(ex =>
            city.name.toLowerCase().includes(ex.toLowerCase()) || city.countryCode === "IL"
          )
        );
        const formatted = filtered.map(city => ({
          value: city.name,
          label: `${city.name}, ${city.countryCode}`
        }));
        setOptions(formatted);
      } catch (err) {
        console.error("Error loading hotel cities:", err);
      }
    };
    fetchCities();
  }, []);

  const handleSearch = () => {
    if (!city || !checkIn || !checkOut) {
      alert("Please fill all fields");
      return;
    }

    setResults([{
      hotelName: "SkyNest Royal Suites",
      city: city.label,
      checkIn,
      checkOut,
      price: "$620",
      adults,
      rooms
    }]);
  };

  return (
    <div className="hotel-search-container">
      <h2>Luxury Hotel Search</h2>
      <div className="form-group"><label>City</label><Select options={options} value={city} onChange={setCity} /></div>
      <div className="form-group"><label>Check-In Date</label><input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} /></div>
      <div className="form-group"><label>Check-Out Date</label><input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} /></div>
      <div className="form-group"><label>Guests</label><input type="number" min={1} value={adults} onChange={(e) => setAdults(Number(e.target.value))} /></div>
      <div className="form-group"><label>Rooms</label><input type="number" min={1} value={rooms} onChange={(e) => setRooms(Number(e.target.value))} /></div>
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
