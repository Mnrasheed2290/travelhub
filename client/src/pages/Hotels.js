// File: client/src/pages/Hotels.js

import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import API_KEYS from "../apiKeys";

const excludedCities = ['Tel Aviv', 'Jerusalem', 'Haifa', 'Eilat', 'Israel'];

function Hotels() {
  const [city, setCity] = useState(null);
  const [hotelCities, setHotelCities] = useState([]);

  useEffect(() => {
    const fetchHotelCities = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/hotels/cities`, {
          headers: {
            'Authorization': `Bearer ${API_KEYS.hotelSearch.key}`
          }
        });

        const filteredCities = response.data.filter(city =>
          !excludedCities.some(ex => city.name.includes(ex) || city.countryCode === 'IL')
        );

        const options = filteredCities.map(city => ({ value: city.name, label: city.name }));
        setHotelCities(options);
      } catch (err) {
        console.error(err);
        alert("Error loading hotel cities.");
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
          options={hotelCities}
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
