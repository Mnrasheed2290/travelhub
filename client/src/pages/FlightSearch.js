import React, { useState } from 'react';
import axios from 'axios';

function FlightSearch() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [flights, setFlights] = useState([]);

  const searchFlights = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/flights/search`, {
        params: { origin, destination, departureDate, adults }
      });
      setFlights(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching flight offers');
    }
  };

  return (
    <div>
      <h2>Search Flights</h2>
      <input placeholder="Origin" value={origin} onChange={e => setOrigin(e.target.value)} />
      <input placeholder="Destination" value={destination} onChange={e => setDestination(e.target.value)} />
      <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} />
      <input type="number" value={adults} onChange={e => setAdults(e.target.value)} min="1" />
      <button onClick={searchFlights}>Search</button>

      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            <p>Flight ID: {flight.id}</p>
            <button onClick={() => {
              localStorage.setItem('selectedFlight', JSON.stringify(flight));
              window.location.href = '/book-flight';
            }}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlightSearch;
