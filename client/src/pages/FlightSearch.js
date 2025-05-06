import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './FlightSearch.css';
import API_KEYS from '../apiKeys';

const excludedCities = ['Tel Aviv', 'Jerusalem', 'Haifa', 'Eilat', 'Israel'];

const allCities = [
  'New York', 'London', 'Paris', 'Cairo', 'Tokyo', 'Istanbul', 'Dubai',
  'Doha', 'Lahore', 'Toronto', 'Los Angeles', 'Chicago', 'Madrid',
  'Rome', 'Bangkok', 'Kuala Lumpur', 'Jakarta', 'Amman', 'Johannesburg', 'Nairobi'
]; // ✅ Israel already excluded

const cityOptions = allCities.map(city => ({ value: city, label: city }));

function FlightSearch() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [flights, setFlights] = useState([]);

  const searchFlights = async () => {
    if (!origin || !destination || !departureDate) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/flights/search`, {
        headers: {
          'Authorization': `Bearer ${API_KEYS.flightOfferSearch.key}`
        },
        params: {
          origin: origin.value,
          destination: destination.value,
          departureDate,
          adults
        }
      });

      const filteredFlights = response.data.filter(flight => {
        const depCity = flight.itineraries?.[0]?.segments?.[0]?.departure?.iataCode || '';
        const arrCity = flight.itineraries?.[0]?.segments?.[0]?.arrival?.iataCode || '';
        return !excludedCities.some(ex => depCity.includes(ex) || arrCity.includes(ex));
      });

      setFlights(filteredFlights);
    } catch (error) {
      console.error(error);
      alert('Error fetching flight offers');
    }
  };

  return (
    <div className="flight-search">
      <h2>Find Your Flight</h2>

      <div className="form-group">
        <label>From</label>
        <Select
          options={cityOptions}
          onChange={setOrigin}
          value={origin}
          placeholder="Type a city..."
          isSearchable
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      <div className="form-group">
        <label>To</label>
        <Select
          options={cityOptions}
          onChange={setDestination}
          value={destination}
          placeholder="Type a city..."
          isSearchable
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      <div className="form-group">
        <label>Travel Date</label>
        <DatePicker
          selected={departureDate}
          onChange={date => setDepartureDate(date)}
          placeholderText="Select date"
          className="date-picker"
        />
      </div>

      <div className="form-group">
        <label>Adults</label>
        <input
          type="number"
          value={adults}
          onChange={e => setAdults(parseInt(e.target.value))}
          min="1"
        />
      </div>

      <button className="search-button" onClick={searchFlights}>Search</button>

      <ul className="flight-list">
        {flights.length === 0 && <li>No results or all results excluded.</li>}
        {flights.map((flight, index) => (
          <li key={index} className="flight-item">
            <p>Flight ID: {flight.id}</p>
            <button
              onClick={() => {
                localStorage.setItem('selectedFlight', JSON.stringify(flight));
                window.location.href = '/book-flight';
              }}
            >
              Book
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlightSearch;
