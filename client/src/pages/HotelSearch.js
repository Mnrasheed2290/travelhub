// File: client/src/pages/HotelSearch.js

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import API_KEYS from '../apiKeys';
import './HotelSearch.css';
import { FaHotel, FaPlane, FaCar, FaSuitcase } from 'react-icons/fa';

const excludedCities = ['Tel Aviv', 'Jerusalem', 'Haifa', 'Eilat', 'Israel', 'IL'];

function HotelSearch() {
  const [tab, setTab] = useState('hotels');
  const [city, setCity] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [bundleCar, setBundleCar] = useState(false);
  const [bundleFlight, setBundleFlight] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/hotels/cities`, {
          headers: {
            Authorization: `Bearer ${API_KEYS.hotelSearch.key}`,
          },
        });
        const filtered = res.data.filter(c =>
          !excludedCities.some(ex =>
            c.name.toLowerCase().includes(ex.toLowerCase()) || c.countryCode === 'IL'
          )
        );
        const formatted = filtered.map(c => ({
          value: c.name,
          label: `${c.name}, ${c.countryCode}`,
        }));
        setOptions(formatted);
      } catch (err) {
        console.error('Error loading hotel cities:', err);
      }
    };
    fetchCities();
  }, []);

  const handleSearch = () => {
    if (!city || !checkInDate || !checkOutDate) {
      alert('Please fill all required fields.');
      return;
    }
    alert(`Searching hotels in ${city.label}, ${adults} Adults, ${rooms} Room${rooms > 1 ? 's' : ''}`);
  };

  return (
    <div className="hotel-search-card">
      <div className="tab-header">
        <button className={tab === 'hotels' ? 'active' : ''} onClick={() => setTab('hotels')}>
          <FaHotel /> Hotels
        </button>
        <button className={tab === 'flights'} disabled>
          <FaPlane /> Flights
        </button>
        <button className={tab === 'cars'} disabled>
          <FaCar /> Cars
        </button>
      </div>

      <div className="tab-body">
        <div className="input-group">
          <label>Where to?</label>
          <Select
            options={options}
            value={city}
            onChange={setCity}
            placeholder="e.g. Paris or Dubai"
            isSearchable
          />
        </div>

        <div className="date-row">
          <div className="input-group">
            <label>Check-in</label>
            <input type="date" value={checkInDate} onChange={e => setCheckInDate(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Check-out</label>
            <input type="date" value={checkOutDate} onChange={e => setCheckOutDate(e.target.value)} />
          </div>
        </div>

        <div className="input-group row">
          <label>Guests</label>
          <div className="room-selectors">
            <input
              type="number"
              value={adults}
              min={1}
              onChange={e => setAdults(Number(e.target.value))}
              placeholder="Adults"
            />
            <input
              type="number"
              value={rooms}
              min={1}
              onChange={e => setRooms(Number(e.target.value))}
              placeholder="Rooms"
            />
          </div>
        </div>

        <div className="bundle-row">
          <span className="bundle-label"><FaSuitcase /> Bundle + Save</span>
          <label>
            <input type="checkbox" checked={bundleCar} onChange={() => setBundleCar(!bundleCar)} />
            Add a car
          </label>
          <label>
            <input type="checkbox" checked={bundleFlight} onChange={() => setBundleFlight(!bundleFlight)} />
            Add a flight
          </label>
        </div>

        <button className="search-btn" onClick={handleSearch}>Find Your Hotel</button>
      </div>
    </div>
  );
}

export default HotelSearch;
