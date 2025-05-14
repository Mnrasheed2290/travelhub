// File: client/src/pages/HotelSearch.js

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import API_KEYS from '../apiKeys';
import './HotelSearch.css';

const excludedCities = ['Tel Aviv', 'Jerusalem', 'Haifa', 'Eilat', 'Israel', 'IL'];

function HotelSearch() {
  const [city, setCity] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/hotels/cities`, {
          headers: {
            'Authorization': `Bearer ${API_KEYS.hotelSearch.key}`
          }
        });

        const filteredCities = response.data.filter(city =>
          !excludedCities.some(ex =>
            city.name.toLowerCase().includes(ex.toLowerCase()) ||
            city.countryCode === 'IL'
          )
        );

        const options = filteredCities.map(city => ({
          value: city.name,
          label: `${city.name}, ${city.countryCode}`
        }));
        setHotels(options);
      } catch (err) {
        console.error('Error loading hotel cities:', err);
        alert("Error loading hotel cities.");
      }
    };
    fetchHotels();
  }, []);

  const handleSearch = () => {
    if (!city || !checkInDate || !checkOutDate) {
      alert('Please fill all fields');
      return;
    }
    alert(`Searching hotels in ${city.value} from ${checkInDate} to ${checkOutDate}`);
  };

  return (
    <div className="hotel-search-container">
      <h2>Luxury Hotel Search</h2>
      <div className="form-group">
        <label>City</label>
        <Select
          options={hotels}
          onChange={setCity}
          value={city}
          placeholder="Type a city..."
          isSearchable
        />
      </div>

      <div className="form-group">
        <label>Check-In Date</label>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Check-Out Date</label>
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
      </div>

      <button className="search-btn" onClick={handleSearch}>
        Search Hotels
      </button>
    </div>
  );
}

export default HotelSearch;
