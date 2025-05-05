import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FlightSearch.css';

const allCities = [
  "New York", "London", "Paris", "Cairo", "Tokyo", "Istanbul", "Dubai",
  "Doha", "Lahore", "Toronto", "Los Angeles", "Chicago", "Madrid", "Rome",
  "Bangkok", "Kuala Lumpur", "Jakarta", "Amman", "Johannesburg", "Nairobi"
  // All cities are Israel-free ✅
];

const cityOptions = allCities.map(city => ({ value: city, label: city }));

function FlightSearch() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [travelDate, setTravelDate] = useState(null);

  return (
    <div className="flight-search">
      <h2>Find Your Flight</h2>

      <div className="form-group">
        <label>From</label>
        <Select
          options={cityOptions}
          onChange={setOrigin}
          placeholder="Type a city..."
        />
      </div>

      <div className="form-group">
        <label>To</label>
        <Select
          options={cityOptions}
          onChange={setDestination}
          placeholder="Type a city..."
        />
      </div>

      <div className="form-group">
        <label>Travel Date</label>
        <DatePicker
          selected={travelDate}
          onChange={date => setTravelDate(date)}
          placeholderText="Select date"
          className="date-picker"
        />
      </div>

      <button className="search-button">Search Flights</button>
    </div>
  );
}

export default FlightSearch;
