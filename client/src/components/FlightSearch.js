import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BookingContext } from "./BookingContext";
import "react-datepicker/dist/react-datepicker.css";
import "./FlightSearch.css";

function FlightSearch() {
  const [tripType, setTripType] = useState("round-trip");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [departure, setDeparture] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [results, setResults] = useState([]);

  const { addBooking } = useContext(BookingContext);
  const navigate = useNavigate();

  const fetchCities = async (query, setOptions) => {
    if (query.length < 2) {
      setOptions([]);
      return;
    }

    try {
      const res = await axios.get(`/api/locations?q=${encodeURIComponent(query)}`);
      const formatted = res.data.map(city => ({
        value: city.iataCode,
        label: `${city.name}, ${city.country}`
      }));
      setOptions(formatted);
    } catch (err) {
      console.error("City fetch failed:", err.message);
      setOptions([]);
    }
  };

  useEffect(() => {
    fetchCities(fromInput, setFromOptions);
  }, [fromInput]);

  useEffect(() => {
    fetchCities(toInput, setToOptions);
  }, [toInput]);

  const handleFromInput = (input, { action }) => {
    if (action === 'input-change') {
      setFromInput(input);
    }
  };

  const handleToInput = (input, { action }) => {
    if (action === 'input-change') {
      setToInput(input);
    }
  };

  const handleSearch = async () => {
    if (!from || !to || !departure || (tripType === "round-trip" && !returnDate)) {
      alert("Please complete all fields.");
      return;
    }

    try {
      const res = await axios.post("/api/flight-search", {
        origin: from.value,
        destination: to.value,
        departureDate: departure.toISOString().split("T")[0],
        returnDate: tripType === "round-trip" ? returnDate?.toISOString().split("T")[0] : undefined,
        adults
      });
      setResults(res.data.data || []);
    } catch (err) {
      console.error("Flight search failed:", err.message);
      alert("Flight search failed. Check console for details.");
    }
  };

  return (
    <div className="flight-search-container">
      <h2>Search Flights</h2>
      <div className="trip-toggle">
        <label>
          <input type="radio" value="round-trip" checked={tripType === "round-trip"} onChange={() => setTripType("round-trip")} /> Round-trip
        </label>
        <label>
          <input type="radio" value="one-way" checked={tripType === "one-way"} onChange={() => setTripType("one-way")} /> One-way
        </label>
      </div>

      <div className="form-group">
        <label>From</label>
        <Select options={fromOptions} value={from} onChange={setFrom} onInputChange={handleFromInput} placeholder="Type departure city..." />
      </div>
      <div className="form-group">
        <label>To</label>
        <Select options={toOptions} value={to} onChange={setTo} onInputChange={handleToInput} placeholder="Type destination city..." />
      </div>

      <div className="date-row">
        <div className="form-group">
          <label>Departure</label>
          <DatePicker selected={departure} onChange={setDeparture} minDate={new Date()} />
        </div>
        {tripType === "round-trip" && (
          <div className="form-group">
            <label>Return</label>
            <DatePicker selected={returnDate} onChange={setReturnDate} minDate={departure} />
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Passengers</label>
        <input type="number" min={1} value={adults} onChange={(e) => setAdults(Number(e.target.value))} />
      </div>

      <button className="search-btn" onClick={handleSearch}>Find Flights</button>

      {results.length > 0 && (
        <div className="results-section">
          {results.map((flight, i) => (
            <div className="result-card" key={i}>
              <h4>{flight.itineraries?.[0]?.segments[0]?.carrierCode} {flight.itineraries?.[0]?.segments[0]?.number}</h4>
              <p>{from.label} → {to.label}</p>
              <p>{departure.toDateString()}</p>
              {tripType === "round-trip" && <p>Return: {returnDate.toDateString()}</p>}
              <p className="price">${flight.price?.total} {flight.price?.currency}</p>
              <button onClick={() => addBooking({ type: "flight", ...flight })}>Add to Itinerary</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FlightSearch;
