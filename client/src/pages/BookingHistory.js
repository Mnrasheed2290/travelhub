// File: client/src/pages/BookingHistory.js

import React, { useEffect, useState } from "react";
import "./BookingHistory.css";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Simulated static fetch — replace with backend/localStorage later
    const dummyData = [
      {
        id: "FL123",
        type: "Flight",
        icon: "✈️",
        details: "Flight from New York to Cairo on June 12",
      },
      {
        id: "HT456",
        type: "Hotel",
        icon: "🏨",
        details: "3 nights at Royal Istanbul Hotel (June 13–16)",
      },
      {
        id: "CR789",
        type: "Car Rental",
        icon: "🚗",
        details: "Toyota Corolla in Dubai (June 15–18)",
      },
    ];
    setBookings(dummyData);
  }, []);

  return (
    <div className="booking-history">
      <h2>📋 Your Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-item">
              <div className="booking-icon">{booking.icon}</div>
              <div className="booking-info">
                <strong>{booking.type}</strong>
                <p>{booking.details}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingHistory;
