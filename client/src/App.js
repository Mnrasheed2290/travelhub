// File: client/src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./pages/HomePage.css";
import HomePage from "./pages/HomePage";
import FlightSearch from "./pages/FlightSearch";
import FlightBook from "./pages/FlightBook";
import Hotels from "./pages/Hotels";
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
          <Route path="/hotels" element={<Hotels />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
