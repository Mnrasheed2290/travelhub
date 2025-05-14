// File: client/src/components/FlightSearch.js

import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./BookingContext";
import "react-datepicker/dist/react-datepicker.css";
import "./FlightSearch.css";

function FlightSearch() {
  const [tripType, setTripType] = useState("round-trip");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [results, setResults] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const { addBooking } = useContext(BookingContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `https://test.api.amadeus.com/v1/reference-data/locations`,
          {
            params: {
              keyword: "a",
              subType: "CITY",
            },
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_CARRENTALSEARCH_AMADEUS_API_KEY}`
            }
          }
        );
        const filtered = response.data.data.filter(
          city => city.address?.countryCode !== "IL"
        ).map(city => ({
          value: city.name,
          label: `${city.name}, ${city.address.countryCode}`
        }));
        setCityOptions(filtered);
      } catch (error) {
        console.error("Flight city list fetch error:", error);
      }
    };
    fetchCities();
  }, []);

  const handleSearch = () => {
    if (!from || !to || !departure || (tripType === "round-trip" && !returnDate)) {
      alert("Please fill in all fields.");
      return;
    }

    setResults([{
      flightNumber: "SKY789",
      departure: from.label,
      arrival: to.label,
      date: departure.toDateString(),
      price: "$480"
    }]);
  };

  return (
    <div className="flight-search-container">
      <h2>Search Flights</h2>

      <div className="trip-toggle">
        <label>
          <input type="radio" name="tripType" value="round-trip" checked={tripType === "round-trip"} onChange={() => setTripType("round-trip")} />
          Round-trip
        </label>
        <label>
          <input type="radio" name="tripType" value="one-way" checked={tripType === "one-way"} onChange={() => setTripType("one-way")} />
          One-way
        </label>
      </div>

      <div className="form-group"><label>From</label><Select options={cityOptions} value={from} onChange={setFrom} /></div>
      <div className="form-group"><label>To</label><Select options={cityOptions} value={to} onChange={setTo} /></div>

      <div className="date-row">
        <div className="form-group"><label>Departure</label><DatePicker selected={departure} onChange={setDeparture} /></div>
        {tripType === "round-trip" && (
          <div className="form-group"><label>Return</label><DatePicker selected={returnDate} onChange={setReturnDate} /></div>
        )}
      </div>

      <div className="form-group"><label>Passengers</label><input type="number" min={1} value={adults} onChange={(e) => setAdults(Number(e.target.value))} /></div>

      <button className="search-btn" onClick={handleSearch}>Find Flights</button>

      {results.length > 0 && (
        <div className="results-section">
          {results.map((flight, i) => (
            <div className="result-card" key={i}>
              <h4>{flight.flightNumber}</h4>
              <p>{flight.departure} → {flight.arrival}</p>
              <p>{flight.date}</p>
              <p className="price">{flight.price}</p>
              <button onClick={() => addBooking({ type: "flight", ...flight })}>
                Add to Itinerary
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FlightSearch;
