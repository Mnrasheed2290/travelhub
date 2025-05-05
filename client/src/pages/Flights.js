// File: client/src/pages/Flights.js

import React, { useState, useEffect } from "react";
import { fetchCitiesExcludingIsrael } from "../utils/amadeusAPI";

function Flights() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadCities = async () => {
      const cities = await fetchCitiesExcludingIsrael("a"); // You can loop or auto-expand this
      setLocations(cities);
    };
    loadCities();
  }, []);

  return (
    <div>
      <h2>Book Flights</h2>
      <label>From:</label>
      <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
        <option value="">Select Origin</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.name}>{loc.name}</option>
        ))}
      </select>

      <label>To:</label>
      <select value={destination} onChange={(e) => setDestination(e.target.value)}>
        <option value="">Select Destination</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.name}>{loc.name}</option>
        ))}
      </select>

      <button>Search Flights</button>
    </div>
  );
}

export default Flights;
