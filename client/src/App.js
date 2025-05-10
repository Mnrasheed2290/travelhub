// File: client/src/App.js

// File: client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FlightSearch from "./components/FlightSearch";
import FlightBook from "./pages/FlightBook";
import CarRental from "./pages/CarRental";
import HotelSearch from "./pages/HotelSearch";
import BookingHistory from "./pages/BookingHistory";
import ChatSupport from "./pages/ChatSupport";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Confirmation from "./pages/Confirmation";  // ✅ Added import
import Checkout from "./pages/Checkout";          // ✅ Added import
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flights" element={<FlightSearch />} />
          <Route path="/book-flight" element={<FlightBook />} />
          <Route path="/cars" element={<CarRental />} />
          <Route path="/hotels" element={<HotelSearch />} />
          <Route path="/bookings" element={<BookingHistory />} />
          <Route path="/chat" element={<ChatSupport />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirmation" element={<Confirmation />} />   {/* ✅ Added */}
          <Route path="/checkout" element={<Checkout />} />           {/* ✅ Added */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
