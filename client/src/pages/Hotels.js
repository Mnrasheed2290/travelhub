import React, { useState } from "react";

const hotelCities = [
  "New York", "London", "Paris", "Istanbul", "Dubai", "Doha", "Kuala Lumpur"
  // Israel excluded
];

function Hotels() {
  const [city, setCity] = useState("");

  return (
    <div>
      <h2>Search Hotels</h2>
      <label>City:</label>
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Select City</option>
        {hotelCities.map(city => <option key={city} value={city}>{city}</option>)}
      </select>

      <button>Search Hotels</button>
    </div>
  );
}

export default Hotels;
