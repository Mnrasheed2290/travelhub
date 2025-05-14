// File: client/src/components/FlightSearch.js

import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FlightSearch.css";

const allCities = [
  "New York (JFK)", "Los Angeles (LAX)", "London (LHR)", "Paris (CDG)",
  "Dubai (DXB)", "Istanbul (IST)", "Cairo (CAI)", "Toronto (YYZ)", "Doha (DOH)"
];
const excluded = ["Tel Aviv", "Jerusalem", "Haifa", "Eilat", "Israel"];
const cityOptions = allCities
  .filter(city => !excluded.some(ex => city.toLowerCase().includes(ex.toLowerCase())))
  .map(city => ({ value: city, label: city }));

function FlightSearch() {
  const [tripType, setTripType] = useState("round-trip");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [adults, setAdults] = useState(1);

  const handleSearch = () => {
    if (!from || !to || !departure || (tripType === "round-trip" && !returnDate)) {
      alert("Please fill in all fields.");
      return;
    }
    alert(`Searching flights from ${from.label} to ${to.label}`);
  };

  return (
    <div className="flight-search-container">
      <h2>Search Flights</h2>

      <div className="trip-toggle">
        <label>
          <input
            type="radio"
            name="tripType"
            value="round-trip"
            checked={tripType === "round-trip"}
            onChange={() => setTripType("round-trip")}
          />
          Round-trip
        </label>
        <label>
          <input
            type="radio"
            name="tripType"
            value="one-way"
            checked={tripType === "one-way"}
            onChange={() => setTripType("one-way")}
          />
          One-way
        </label>
      </div>

      <div className="form-group">
        <label>From</label>
        <Select options={cityOptions} value={from} onChange={setFrom} placeholder="Departure city" />
      </div>

      <div className="form-group">
        <label>To</label>
        <Select options={cityOptions} value={to} onChange={setTo} placeholder="Destination city" />
      </div>

      <div className="date-row">
        <div className="form-group">
          <label>Departure Date</label>
          <DatePicker selected={departure} onChange={setDeparture} placeholderText="Choose date" />
        </div>
        {tripType === "round-trip" && (
          <div className="form-group">
            <label>Return Date</label>
            <DatePicker selected={returnDate} onChange={setReturnDate} placeholderText="Choose return" />
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Passengers</label>
        <input
          type="number"
          min={1}
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
        />
      </div>

      <button className="search-btn" onClick={handleSearch}>Find Flights</button>
    </div>
  );
}

export default FlightSearch;
