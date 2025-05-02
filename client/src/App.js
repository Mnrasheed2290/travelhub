import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightSearch from './pages/FlightSearch';
import FlightBook from './pages/FlightBook';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightSearch />} />
        <Route path="/book-flight" element={<FlightBook />} />
      </Routes>
    </Router>
  );
}

export default App;
