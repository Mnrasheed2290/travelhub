import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FlightSearch from "./components/FlightSearch";
import FlightBook from "./components/FlightBook";
import NavBar from "./components/NavBar"; // Optional if you have a NavBar component

function App() {
  return (
    <Router>
      <div className="app">
        {/* Optional NavBar */}
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
