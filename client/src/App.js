import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import FlightSearch from './components/FlightSearch';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <FlightSearch />
            </>
          }
        />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
      </Routes>
    </Router>
  );
}

export default App;
