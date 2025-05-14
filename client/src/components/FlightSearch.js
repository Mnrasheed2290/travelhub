// File: client/src/pages/FlightSearch.js

import React, { useState } from 'react';
import Select from 'react-select/async';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './FlightSearch.css';

const AMADEUS_API_KEY = process.env.REACT_APP_flightAMADEUS_API_KEY;
const EXCLUDED_COUNTRY = 'IL';

function FlightSearch() {
  const [tripType, setTripType] = useState('round-trip');
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);

  const fetchCities = async (inputValue) => {
    if (!inputValue) return [];

    try {
      const response = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations', {
        params: {
          keyword: inputValue,
          subType: 'AIRPORT,CITY',
        },
        headers: {
          Authorization: `Bearer ${AMADEUS_API_KEY}`
        }
      });

      return response.data.data
        .filter(loc => loc.address?.countryCode !== EXCLUDED_COUNTRY)
        .map(loc => ({
          value: loc.iataCode,
          label: `${loc.name} (${loc.iataCode})`,
        }));
    } catch (error) {
      console.error('Amadeus city fetch failed:', error);
      return [];
    }
  };

  const handleSearch = () => {
    if (!fromCity || !toCity || !departureDate || (tripType === 'round-trip' && !returnDate)) {
      alert("Please complete all fields.");
      return;
    }

    alert(`Searching flights from ${fromCity.label} to ${toCity.label}`);
  };

  return (
    <div className="flight-search-container">
      <h2 className="search-heading">Book your flight with confidence</h2>

      <div className="trip-toggle">
        <label className={tripType === 'round-trip' ? 'active' : ''}>
          <input
            type="radio"
            value="round-trip"
            checked={tripType === 'round-trip'}
            onChange={() => setTripType('round-trip')}
          />
          Round-trip
        </label>
        <label className={tripType === 'one-way' ? 'active' : ''}>
          <input
            type="radio"
            value="one-way"
            checked={tripType === 'one-way'}
            onChange={() => setTripType('one-way')}
          />
          One-way
        </label>
      </div>

      <div className="form-group">
        <label>Departing from</label>
        <Select
          loadOptions={fetchCities}
          onChange={setFromCity}
          value={fromCity}
          placeholder="City or airport"
          isClearable
          cacheOptions
          defaultOptions
        />
      </div>

      <div className="form-group">
        <label>Going to</label>
        <Select
          loadOptions={fetchCities}
          onChange={setToCity}
          value={toCity}
          placeholder="City or airport"
          isClearable
          cacheOptions
          defaultOptions
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Departure Date</label>
          <DatePicker
            selected={departureDate}
            onChange={setDepartureDate}
            placeholderText="Choose departure"
            className="date-picker"
          />
        </div>
        {tripType === 'round-trip' && (
          <div className="form-group">
            <label>Return Date</label>
            <DatePicker
              selected={returnDate}
              onChange={setReturnDate}
              placeholderText="Choose return"
              className="date-picker"
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

      <button className="search-button" onClick={handleSearch}>
        Search Flights
      </button>
    </div>
  );
}

export default FlightSearch;
