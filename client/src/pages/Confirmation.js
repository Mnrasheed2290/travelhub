// File: client/src/pages/Confirmation.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;

  if (!bookingDetails) {
    return <p className="confirmation-empty">No booking information available.</p>;
  }

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation-box">
        <h2>Booking Confirmed!</h2>
        <p className="thank-you-msg">Thank you for your booking with SmartTravelHub.</p>

        <div className="confirmation-details">
          <p><strong>Booking ID:</strong> {bookingDetails.id}</p>
          <p><strong>Traveler Name:</strong> {bookingDetails.travelerName}</p>
          <p><strong>Flight Number:</strong> {bookingDetails.flightNumber}</p>
          <p><strong>Date:</strong> {bookingDetails.date}</p>
          <p><strong>Departure:</strong> {bookingDetails.departure}</p>
          <p><strong>Arrival:</strong> {bookingDetails.arrival}</p>
        </div>

        <button onClick={handleBackToHome} className="back-home-btn">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
