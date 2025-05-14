// File: client/src/pages/Confirmation.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
  const { state } = useLocation();
  const booking = state?.bookingDetails || {};
  const navigate = useNavigate();

  const handleAddAnother = () => navigate('/');
  const handleCheckout = () => navigate('/checkout', { state: { bookingDetails: booking } });

  return (
    <div className="confirmation-page">
      <div className="confirmation-box">
        <h2>Booking Confirmation</h2>
        {Object.keys(booking).length === 0 ? (
          <p>No booking information available.</p>
        ) : (
          <div className="details">
            {booking.flightNumber && (
              <>
                <h4>✈️ Flight Booking</h4>
                <p><strong>Flight:</strong> {booking.flightNumber}</p>
                <p><strong>From:</strong> {booking.departure}</p>
                <p><strong>To:</strong> {booking.arrival}</p>
                <p><strong>Date:</strong> {booking.date}</p>
              </>
            )}

            {booking.hotelName && (
              <>
                <h4>🏨 Hotel Booking</h4>
                <p><strong>Hotel:</strong> {booking.hotelName}</p>
                <p><strong>City:</strong> {booking.city}</p>
                <p><strong>Check-in:</strong> {booking.checkIn}</p>
                <p><strong>Check-out:</strong> {booking.checkOut}</p>
                <p><strong>Guests:</strong> {booking.adults} Adults, {booking.rooms} Room(s)</p>
              </>
            )}

            {booking.rentalLocation && (
              <>
                <h4>🚗 Car Rental</h4>
                <p><strong>Location:</strong> {booking.rentalLocation}</p>
                <p><strong>City:</strong> {booking.city}</p>
                <p><strong>Pickup:</strong> {booking.pickup}</p>
                <p><strong>Return:</strong> {booking.return}</p>
                <p><strong>Driver Age:</strong> {booking.driverAge}</p>
              </>
            )}
          </div>
        )}

        <div className="button-group">
          <button onClick={handleAddAnother} className="alt-btn">Add Another Reservation</button>
          <button onClick={handleCheckout} className="confirm-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
