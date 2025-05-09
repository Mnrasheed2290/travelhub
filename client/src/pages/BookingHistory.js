import React, { useState, useEffect } from 'react';
import './BookingHistory.css';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = localStorage.getItem('bookingHistory');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  return (
    <div className="booking-history">
      <h2>Your Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <p>Booking ID: {booking.id}</p>
              <p>From: {booking.from}</p>
              <p>To: {booking.to}</p>
              <p>Date: {booking.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingHistory;
