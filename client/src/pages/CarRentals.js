// File: client/src/pages/CarRental.js

import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './CarRentals.css';

const CarRental = () => {
  const [city, setCity] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [driverAge, setDriverAge] = useState(25);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!city || !pickupDate || !returnDate || !driverAge) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.get(
        `https://test.api.amadeus.com/v1/reference-data/locations`,
        {
          params: {
            keyword: city.label,
            subType: "CITY",
          },
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_CARRENTALSEARCH_AMADEUS_API_KEY}`
          }
        }
      );

      const cityData = response.data?.data || [];
      const filtered = cityData.filter(loc => loc.address?.countryCode !== "IL");
      setLocations(filtered);
    } catch (err) {
      console.error("Car rental fetch error:", err);
      alert("Error fetching car rentals.");
    }
  };

  const handleBook = (loc) => {
    navigate('/confirmation', {
      state: {
        bookingDetails: {
          rentalLocation: loc.name,
          city: city.label,
          pickup: pickupDate.toDateString(),
          return: returnDate.toDateString(),
          driverAge
        }
      }
    });
  };

  const cityOptions = [
    "New York", "Los Angeles", "London", "Paris", "Rome", "Dubai", "Istanbul", "Doha", "Cairo", "Toronto", "Chicago"
  ].map(city => ({ value: city, label: city }));

  return (
    <div className="car-rental-container">
      <h2>Find Rental Cars</h2>
      <div className="form-group"><label>Pickup City</label><Select options={cityOptions} value={city} onChange={setCity} /></div>
      <div className="form-row">
        <div className="form-group"><label>Pickup Date</label><DatePicker selected={pickupDate} onChange={setPickupDate} /></div>
        <div className="form-group"><label>Return Date</label><DatePicker selected={returnDate} onChange={setReturnDate} /></div>
      </div>
      <div className="form-group"><label>Driver Age</label><input type="number" min="18" value={driverAge} onChange={(e) => setDriverAge(Number(e.target.value))} /></div>
      <button className="search-btn" onClick={handleSearch}>Search Cars</button>
      {locations.length > 0 && (
        <div className="results-section">
          <h3>Available Locations</h3>
          <ul>
            {locations.map((loc, index) => (
              <li key={index}>
                <strong>{loc.name}</strong> — {loc.iataCode}
                <button className="book-btn" onClick={() => handleBook(loc)}>Book This Car</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarRental;
