// File: client/src/pages/FlightSearch.js

import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FlightSearch.css';

// Full list of cities (could later be fetched from an API)
const allCities = [
  'New York (JFK)', 'Los Angeles (LAX)', 'Chicago (ORD)', 'London (LHR)',
  'Paris (CDG)', 'Rome (FCO)', 'Cairo (CAI)', 'Dubai (DXB)', 'Doha (DOH)',
  'Istanbul (IST)', 'Bangkok (BKK)', 'Tokyo (NRT)', 'Lahore (LHE)', 'Amman (AMM)',
  'Johannesburg (JNB)', 'Nairobi (NBO)', 'Toronto (YYZ)', 'Madrid (MAD)',
  'Kuala Lumpur (KUL)', 'Jakarta (CGK)',

  // Israeli cities to be excluded
  'Tel Aviv (TLV)', 'Jerusalem', 'Haifa', 'Eilat', 'Israel'
];

// Exclude all Israeli locations
const excluded = ['Tel Aviv (TLV)', 'Jerusalem', 'Haifa', 'Eilat', 'Israel'];

const cityOptions = allCities
  .filter(city => !excluded.includes(city))
  .map(city => ({ value: city, label: city }));

function FlightSearch() {
  const [tripType, setTripType] = useState('round-trip');
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);

  const handleSearch = () => {
    if (!fromCity || !toCity || !departureDate || (tripType === 'round-trip' && !returnDate)) {
      alert("Please complete all fields before searching.");
      return;
    }
    alert(`Searching flights from ${fromCity.label} to ${toCity.label}`);
  };

  return (
    <div className="flight-search-container">
      <h2 className="search-title">Search Flights</h2>

      <div className="trip-toggle">
        <label>
          <input
            type="radio"
            name="tripType"
            value="round-trip"
            checked={tripType === 'round-trip'}
            onChange={() => setTripType('round-trip')}
          />
          Round-trip
        </label>
        <label>
          <input
            type="radio"
            name="tripType"
            value="one-way"
            checked={tripType === 'one-way'}
            onChange={() => setTripType('one-way')}
          />
          One-way
        </label>
      </div>

      <div className="form-group">
        <label>From</label>
        <Select
          options={cityOptions}
          value={fromCity}
          onChange={setFromCity}
          placeholder="e.g. JFK or New York"
          isSearchable
        />
      </div>

      <div className="form-group">
        <label>To</label>
        <Select
          options={cityOptions}
          value={toCity}
          onChange={setToCity}
          placeholder="e.g. LHR or London"
          isSearchable
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Departure Date</label>
          <DatePicker
            selected={departureDate}
            onChange={setDepartureDate}
            placeholderText="Choose departure"
          />
        </div>

        {tripType === 'round-trip' && (
          <div className="form-group">
            <label>Return Date</label>
            <DatePicker
              selected={returnDate}
              onChange={setReturnDate}
              placeholderText="Choose return"
            />
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Passengers</label>
        <input
          type="number"
          min={1}
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
          className="passenger-input"
        />
      </div>

      <button className="search-btn" onClick={handleSearch}>
        Search Flights
      </button>
    </div>
  );
}

export default FlightSearch;
