// File: client/src/pages/Hotels.js

import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import API_KEYS from "../apiKeys";
import "./Hotels.css";

const excludedCities = ['Tel Aviv', 'Jerusalem', 'Haifa', 'Eilat', 'Israel', 'IL'];

function Hotels() {
  const [city, setCity] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchHotelCities = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/hotels/cities`,
          {
            headers: {
              Authorization: `Bearer ${API_KEYS.hotelSearch.key}`,
            },
          }
        );

        const cities = response.data || [];

        const filtered = cities.filter(city =>
          !excludedCities.some(ex =>
            (city.name || "").toLowerCase().includes(ex.toLowerCase()) ||
            (city.countryCode || "").toUpperCase() === "IL"
          )
        );

        const formatted = filtered.map(city => ({
          value: city.name,
          label: `${city.name}, ${city.countryCode}`,
        }));

        setOptions(formatted);
      } catch (error) {
        console.error("Error fetching hotel cities:", error);
        alert("Failed to load hotel city data.");
      }
    };

    fetchHotelCities();
  }, []);

  return (
    <div className="hotel-search">
      <h2>Search Hotels</h2>
      <div className="form-group">
        <label>City:</label>
        <Select
          options={options}
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
