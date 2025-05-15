import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// ... (other imports, e.g., BookingContext, styling, etc.)
import axios from "axios";

function FlightSearch() {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState(null);    // selected origin
  const [toCity, setToCity] = useState(null);        // selected destination
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cityOptions, setCityOptions] = useState([]); // suggestions list (city names)

  // Fetch city suggestions (same endpoint used as for hotels)
  const fetchCities = async (keyword) => {
    if (!keyword || keyword.length < 2) {
      setCityOptions([]);
      return;
    }
    try {
      const response = await axios.get(`https://travelhub-1.onrender.com/api/hotel-cities?keyword=${encodeURIComponent(keyword)}`);
      setCityOptions(response.data);
    } catch (err) {
      console.error("Error loading flight cities:", err);
      alert("Unable to load cities. Please try again later.");
    }
  };

  // Handlers for typing in origin/destination fields
  const handleFromInput = (inputValue) => {
    fetchCities(inputValue);
  };
  const handleToInput = (inputValue) => {
    fetchCities(inputValue);
  };

  // ... (Rendering logic: two inputs or select components for From and To)
  // For example, using datalist:
  // <input type="text" list="cityOptions" value={fromCity ? fromCity.label : ""} onChange={e => handleFromInput(e.target.value)} placeholder="From city or airport" required />
  // <input type="text" list="cityOptions" value={toCity ? toCity.label : ""} onChange={e => handleToInput(e.target.value)} placeholder="To city or airport" required />
  // <datalist id="cityOptions">{cityOptions.map(opt => <option key={opt.value} value={opt.label} />)}</datalist>
  //
  // If using Select components:
  // <Select options={cityOptions} value={fromCity} onChange={opt => setFromCity(opt)} onInputChange={(val, meta) => { if(meta.action === "input-change") handleFromInput(val); }} placeholder="From" />
  // <Select options={cityOptions} value={toCity} onChange={opt => setToCity(opt)} onInputChange={(val, meta) => { if(meta.action === "input-change") handleToInput(val); }} placeholder="To" />

  const handleSearchFlights = (e) => {
    e.preventDefault();
    if (!fromCity || !toCity) {
      alert("Please select origin and destination cities.");
      return;
    }
    // Save flight search criteria and navigate to results page
    // e.g., BookingContext or state management
    // navigate("/flight-results");
  };

  return (
    <form className="flight-search-form" onSubmit={handleSearchFlights}>
      {/* Origin and Destination inputs with suggestions (as described above) */}
      <input 
        type="text" 
        list="cityOptions" 
        value={fromCity ? fromCity.label : ""} 
        onChange={(e) => handleFromInput(e.target.value)} 
        placeholder="From (city)" 
        required 
      />
      <input 
        type="text" 
        list="cityOptions" 
        value={toCity ? toCity.label : ""} 
        onChange={(e) => handleToInput(e.target.value)} 
        placeholder="To (city)" 
        required 
      />
      <datalist id="cityOptions">
        {cityOptions.map(opt => (
          <option key={opt.value} value={opt.label} />
        ))}
      </datalist>

      <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} required />
      <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
      <button type="submit">Search Flights</button>
    </form>
  );
}

export default FlightSearch;
