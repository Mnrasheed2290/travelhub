// File: client/src/pages/CarRentals.js
import React, { useState } from 'react';
import axios from 'axios';
import './CarRentals.css';

const excludedCities = ['Tel Aviv', 'Jerusalem', 'Haifa', 'Eilat', 'Israel'];

function CarRentals() {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [cars, setCars] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/cars/search`, {
        params: {
          location,
          pickupDate,
          dropoffDate,
        },
      });

      const filteredCars = response.data.filter((car) =>
        !excludedCities.some((city) => car.location.includes(city))
      );

      setCars(filteredCars);
    } catch (error) {
      console.error("Error fetching car rentals:", error);
      alert("Error fetching car rental options.");
    }
  };

  return (
    <div className="car-rental">
      <h2>Car Rentals</h2>
      <form onSubmit={handleSearch}>
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or Airport"
          required
        />
        <label>Pick-Up Date</label>
        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          required
        />
        <label>Drop-Off Date</label>
        <input
          type="date"
          value={dropoffDate}
          onChange={(e) => setDropoffDate(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      {cars.length > 0 && (
        <ul className="car-list">
          {cars.map((car, index) => (
            <li key={index}>
              <p>{car.make} {car.model} - {car.price}</p>
              <p>Location: {car.location}</p>
              <button>Book Now</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CarRentals;
