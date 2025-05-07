// File: client/src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./pages/HomePage.css";      // Import the CSS file correctly
import HomePage from "./pages/HomePage";  // Import the HomePage component
import FlightSearch from "./components/FlightSearch";
import FlightBook from "./pages/FlightBook";
import NavBar from "./components/NavBar"; // Optional: Include NavBar if present

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
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
