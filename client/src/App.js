import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FlightSearch from "./components/FlightSearch";
import FlightBook from "./pages/FlightBook";
import CarRental from "./pages/CarRentals";
import HotelSearch from "./pages/HotelSearch";
import BookingHistory from "./pages/BookingHistory";
import ChatSupport from "./pages/ChatSupport";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Confirmation from "./pages/Confirmation";
import Checkout from "./pages/Checkout";
import NavBar from "./components/NavBar";
import { BookingProvider } from "./components/BookingContext";
import "./App.css";

function App() {
  return (
    <BookingProvider>
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
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route
              path="*"
              element={
                <div className="not-found">
                  <h2>404 – Page Not Found</h2>
                  <p>The page you’re looking for doesn’t exist.</p>
                </div>
              }
            />
          </Routes>

          {/* Floating chat button */}
          <a href="/chat" className="chat-float" title="Live Chat">
            💬
          </a>
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;
