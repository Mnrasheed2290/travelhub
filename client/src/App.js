// File: client/src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./HomePage.css"; // ✅ FIXED: Relative to src/
import HomePage from "./pages/HomePage";
import FlightSearch from "./components/FlightSearch";
import FlightBook from "./pages/FlightBook";
import NavBar from "./components/NavBar";

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
