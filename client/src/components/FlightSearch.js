import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FlightSearch.css';

const allCities = [
  'New York', 'London', 'Paris', 'Cairo', 'Tokyo', 'Istanbul', 'Dubai',
  'Doha', 'Lahore', 'Toronto', 'Los Angeles', 'Chicago', 'Madrid',
  'Rome', 'Bangkok', 'Kuala Lumpur', 'Jakarta', 'Amman', 'Johannesburg', 'Nairobi'
];

const cityOptions = allCities.map(city => ({ value: city, label: city }));

function FlightSearch() {
  const [tripType, setTripType] = useState('round-trip');
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [adults, setAdults] = useState(1);

  const handleSearch = () => {
    if (!origin || !destination || !departureDate || (tripType === 'round-trip' && !returnDate)) {
      alert("Please fill in all fields.");
      return;
    }

    alert(`Searching flights from ${origin.value} to ${destination.value}`);
  };

  return (
    <div className="flight-search-container">
      <h2>Book your flight with confidence</h2>

      <div className="trip-type-toggle">
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
        <label>Departing from:</label>
        <Select
          options={cityOptions}
          value={origin}
          onChange={setOrigin}
          placeholder="City or airport"
          isSearchable
        />
      </div>

      <div className="form-group">
        <label>Going to:</label>
        <Select
          options={cityOptions}
          value={destination}
          onChange={setDestination}
          placeholder="City or airport"
          isSearchable
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Departure Date:</label>
          <DatePicker selected={departureDate} onChange={setDepartureDate} placeholderText="Select date" />
        </div>

        {tripType === 'round-trip' && (
          <div className="form-group">
            <label>Return Date:</label>
            <DatePicker selected={returnDate} onChange={setReturnDate} placeholderText="Select return" />
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Passengers:</label>
        <input
          type="number"
          min={1}
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          className="passenger-input"
        />
      </div>

      <button className="search-btn" onClick={handleSearch}>Search Flights</button>
    </div>
  );
}

export default FlightSearch;
