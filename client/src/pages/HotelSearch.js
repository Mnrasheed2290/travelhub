import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../components/BookingContext";
import axios from "axios";

// (Assume any required styling or additional imports here, e.g., for a Select component)

function HotelSearch() {
  const navigate = useNavigate();
  const [city, setCity] = useState(null);         // selected city (object with value/label)
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [options, setOptions] = useState([]);     // city suggestion options for dropdown

  // Fetch city suggestions from backend for a given input (keyword)
  const fetchCities = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setOptions([]);  // no input, clear suggestions
      return;
    }
    try {
      // Call our backend proxy to get city suggestions (already filtered and formatted)
      const response = await axios.get(`https://travelhub-1.onrender.com/api/hotel-cities?keyword=${encodeURIComponent(keyword)}`);
      const cityOptions = response.data;  // array of { value, label } objects
      setOptions(cityOptions);
    } catch (err) {
      console.error("Error loading city suggestions:", err);
      alert("Error loading cities.");
    }
  };

  // Handle user typing in the city input (for live suggestions)
  const handleCityInputChange = (inputValue) => {
    // Optionally require a minimum length to avoid too-broad searches:
    if (inputValue.length < 2) {
      setOptions([]);
      return;
    }
    fetchCities(inputValue);
  };

  // If using a third-party Select component for autocomplete:
  // <Select 
  //    options={options} 
  //    value={city} 
  //    onChange={(option) => setCity(option)} 
  //    onInputChange={(val, { action }) => { if (action === "input-change") handleCityInputChange(val); }}
  //    placeholder="Enter city" 
  // />
  //
  // If using a regular input with datalist for suggestions:
  // <input 
  //   type="text" 
  //   list="cityOptions" 
  //   value={city ? city.label : ""} 
  //   onChange={e => handleCityInputChange(e.target.value)} 
  //   onBlur={...} onFocus={...} placeholder="Enter city" 
  // />
  // <datalist id="cityOptions">
  //   {options.map(opt => <option key={opt.value} value={opt.label} />)}
  // </datalist>
  //
  // (The exact rendering depends on the UI library or approach chosen for autocomplete dropdown)

  // ... (Other form inputs for check-in/check-out dates and submit button, not shown) ...

  // Handle form submission (search for hotels in selected city and date range)
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) {
      alert("Please select a city.");
      return;
    }
    // Save search criteria in context or navigate to results page
    // (BookingContext could be used to store the search parameters globally)
    // Example:
    // setBookingContext({ city: city.value, checkIn, checkOut });
    // navigate("/hotel-results");
  };

  return (
    <form className="hotel-search-form" onSubmit={handleSearch}>
      {/* City input with suggestions */}
      {/* (Use either a Select component or an input + datalist as described above) */}
      {/* Example using react-select: */}
      {/* 
      <Select 
        className="city-select"
        options={options}
        value={city}
        onChange={(option) => setCity(option)}
        onInputChange={(val, actionMeta) => {
          if (actionMeta.action === "input-change") handleCityInputChange(val);
        }}
        placeholder="Destination city"
      /> 
      */}
      
      {/* Example using input+datalist: */}
      <input 
        type="text"
        list="cityOptions"
        value={city ? city.label : ""} 
        onChange={(e) => handleCityInputChange(e.target.value)}
        placeholder="Destination city"
        required 
      />
      <datalist id="cityOptions">
        {options.map(opt => (
          <option key={opt.value} value={opt.label} />
        ))}
      </datalist>

      {/* Date inputs and Search button (not fully shown for brevity) */}
      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required />
      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required />
      <button type="submit">Search Hotels</button>
    </form>
  );
}

export default HotelSearch;
