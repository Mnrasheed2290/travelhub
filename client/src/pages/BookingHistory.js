// File: client/src/pages/BookingHistory.js
import React, { useEffect, useState } from 'react';
import './BookingHistory.css';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Simulated fetch (replace with real API call)
    const dummyData = [
      { id: 'FL123', type: 'Flight', details: 'New York to Cairo on June 12' },
      { id: 'HT456', type: 'Hotel', details: '3 nights in Istanbul' },
      { id: 'CR789', type: 'Car Rental', details: 'Toyota, Dubai, June 15–18' }
    ];
    setBookings(dummyData);
  }, []);

  return (
    <div className="booking-history">
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id} className="booking-item">
            <strong>{booking.type}</strong>: {booking.details}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingHistory;
