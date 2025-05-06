import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";           // ✅ Corrected import
import FlightSearch from "./components/FlightSearch"; // ✅ Component, not page
import FlightBook from "./pages/FlightBook";
import NavBar from "./components/NavBar";          // ✅ Optional

function App() {
  return (
    <Router>
      <div className="app">
        {/* If you have a NavBar component, keep it here */}
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
