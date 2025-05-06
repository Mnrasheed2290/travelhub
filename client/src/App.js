// File: client/src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components and pages
import HomePage from "./pages/HomePage";               // Main landing page
import FlightSearch from "./components/FlightSearch";   // Flight search UI
import FlightBook from "./pages/FlightBook";            // Booking confirmation form
import NavBar from "./components/NavBar";               // Optional navigation bar

// Optional global styles (if using global styles like App.css or HomePage.css)
import "./pages/HomePage.css";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Optional site-wide navigation */}
        <NavBar />

        {/* App Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flights" element={<FlightSearch />} />
          <Route path="/book-flight" element={<FlightBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
