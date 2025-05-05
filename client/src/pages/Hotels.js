// File: client/src/pages/Hotels.js

import React, { useState, useEffect } from "react";
import { fetchCitiesExcludingIsrael } from "../utils/amadeusAPI";

function Hotels() {
  const [city, setCity] = useState("");
  const [hotelCities, setHotelCities] = useState([]);

  useEffect(() => {
    const loadCities = async () => {
      const cities = await fetchCitiesExcludingIsrael("a");
      setHotelCities(cities);
    };
    loadCities();
  }, []);

  return (
    <div>
      <h2>Search Hotels</h2>
      <label>City:</label>
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Select City</option>
        {hotelCities.map((c) => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>

      <button>Search Hotels</button>
    </div>
  );
}

export default Hotels;
