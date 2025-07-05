// src/components/FlightSearch.js
import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { BookingContext } from './BookingContext';
import 'react-datepicker/dist/react-datepicker.css';
import './FlightSearch.css';

function FlightSearch() {
  const [tripType, setTripType] = useState('round-trip');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [departure, setDeparture] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const [results, setResults] = useState([]);

  const { addBooking } = useContext(BookingContext);

  // fetch cities with debounce
  useEffect(() => {
    const handle = setTimeout(() => {
      if (fromInput.length < 2) return setFromOptions([]);
      axios.get(`/api/locations?q=${encodeURIComponent(fromInput)}`)
        .then(r => setFromOptions(
          r.data.map(c => ({ value: c.iataCode, label: `${c.name}, ${c.country}` }))
        ))
        .catch(console.error);
    }, 250);
    return () => clearTimeout(handle);
  }, [fromInput]);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (toInput.length < 2) return setToOptions([]);
      axios.get(`/api/locations?q=${encodeURIComponent(toInput)}`)
        .then(r => setToOptions(
          r.data.map(c => ({ value: c.iataCode, label: `${c.name}, ${c.country}` }))
        ))
        .catch(console.error);
    }, 250);
    return () => clearTimeout(handle);
  }, [toInput]);

  const handleSearch = async () => {
    if (!from || !to || !departure || (tripType === 'round-trip' && !returnDate)) {
      return alert('Please complete all fields');
    }
    try {
      const res = await axios.post('/api/flight-search', {
        origin: from.value,
        destination: to.value,
        departureDate: departure.toISOString().split('T')[0],
        returnDate: tripType === 'round-trip' ? returnDate.toISOString().split('T')[0] : undefined,
        adults
      });
      setResults(res.data.data || []);
    } catch (err) {
      console.error('Flight search error:', err);
      alert('Flight search failed—see console');
    }
  };

  return (
    <div className="flight-search-container">
      <h2>Search Flights</h2>
      <div className="trip-toggle">
        <label><input type="radio" checked={tripType === 'round-trip'} onChange={() => setTripType('round-trip')} /> Round-trip</label>
        <label><input type="radio" checked={tripType === 'one-way'} onChange={() => setTripType('one-way')} /> One-way</label>
      </div>
      <div className="form-group">
        <label>From</label>
        <Select options={fromOptions} value={from} onChange={setFrom} onInputChange={setFromInput} placeholder="Departure city…" />
      </div>
      <div className="form-group">
        <label>To</label>
        <Select options={toOptions} value={to} onChange={setTo} onInputChange={setToInput} placeholder="Destination city…" />
      </div>
      <div className="date-row">
        <div className="form-group"><label>Departure</label><DatePicker selected={departure} onChange={setDeparture} minDate={new Date()} /></div>
        {tripType === 'round-trip' && (
          <div className="form-group"><label>Return</label><DatePicker selected={returnDate} onChange={setReturnDate} minDate={departure} /></div>
        )}
      </div>
      <div className="form-group"><label>Passengers</label><input type="number" min={1} value={adults} onChange={e => setAdults(Number(e.target.value))} /></div>
      <button className="search-btn" onClick={handleSearch}>Find Flights</button>

      {results.length > 0 && <div className="results-section">
        {results.map((f, i) => (
          <div className="result-card" key={i}>
            <h4>{f.itineraries[0].segments[0].carrierCode}{f.itineraries[0].segments[0].number}</h4>
            <p>{from.label} → {to.label}</p>
            <p>{departure.toDateString()}</p>
            {tripType === 'round-trip' && returnDate && <p>Return: {returnDate.toDateString()}</p>}
            <p className="price">${f.price.total} {f.price.currency}</p>
            <button onClick={() => addBooking({ type: 'flight', ...f })}>Add to Itinerary</button>
          </div>
        ))}
      </div>}
    </div>
  );
}

export default FlightSearch;
