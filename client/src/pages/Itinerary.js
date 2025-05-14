// File: travelhub/client/src/pages/Itinerary.js

import React, { useContext } from "react";
import { BookingContext } from "../components/BookingContext";
import { useNavigate } from "react-router-dom";
import "./Itinerary.css";

const Itinerary = () => {
  const { itinerary, clearItinerary } = useContext(BookingContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (itinerary.length === 0) return alert("No bookings yet.");
    navigate("/checkout", { state: { bookingDetails: itinerary } });
  };

  return (
    <div className="itinerary-page">
      <h2>Your Itinerary</h2>
      {itinerary.length === 0 ? (
        <p>No bookings added yet.</p>
      ) : (
        itinerary.map((item, i) => (
          <div className="result-card" key={i}>
            <h4>{item.type === "flight" ? "\u2708\uFE0F Flight" : item.type === "hotel" ? "\ud83c\udfe8 Hotel" : "\ud83d\ude97 Car"}</h4>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        ))
      )}

      <div className="itinerary-actions">
        <button onClick={handleCheckout}>Proceed to Checkout</button>
        <button onClick={clearItinerary}>Clear Itinerary</button>
      </div>
    </div>
  );
};

export default Itinerary;
