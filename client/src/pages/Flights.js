import React, { useState } from "react";

const locations = [
  "New York", "London", "Paris", "Dubai", "Tokyo", "Lahore", "Istanbul", "Cairo", "Johannesburg"
  // Israel is intentionally excluded
];

function Flights() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <div>
      <h2>Book Flights</h2>
      <label>From:</label>
      <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
        <option value="">Select Origin</option>
        {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
      </select>

      <label>To:</label>
      <select value={destination} onChange={(e) => setDestination(e.target.value)}>
        <option value="">Select Destination</option>
        {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
      </select>

      <button>Search Flights</button>
    </div>
  );
}

export default Flights;
