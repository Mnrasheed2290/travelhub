// File: client/src/pages/Checkout.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please fill out all payment details.");
      return;
    }

    alert("Payment successful!");

    const bookingDetails = {
      id: "ORDER-" + Math.floor(Math.random() * 90000 + 10000),
      travelerName: "John Doe",
      flightNumber: "SKY789",
      date: new Date().toDateString(),
      departure: "New York",
      arrival: "London",
    };

    navigate("/confirmation", { state: { bookingDetails } });
  };

  return (
    <div className="checkout-page">
      <div className="checkout-box">
        <h2>Secure Checkout</h2>
        <p>Enter your payment details to confirm your booking</p>

        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
          />
        </div>

        <div className="form-group">
          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
          />
        </div>

        <button onClick={handlePayment} className="pay-btn">
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Checkout;
