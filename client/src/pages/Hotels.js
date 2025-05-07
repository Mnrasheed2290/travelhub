// File: client/src/pages/Hotels.js

import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import API_KEYS from "../apiKeys";

const excludedCities = ['Tel Aviv', 'Jerusalem', 'Haifa', 'Eilat', 'Israel'];

function Hotels() {
  const [city, setCity] = useState(null);

  return (
    <div className="hotel-search">
      <h2>Search Hotels</h2>
      <div className="form-group">
        <label>City:</label>
        <Select
          options={excludedCities.map(city => ({ value: city, label: city }))}
          onChange={setCity}
          value={city}
          placeholder="Type a city..."
          isSearchable
        />
      </div>
      <button disabled={!city}>Search Hotels</button>
    </div>
  );
}

export default Hotels;
