// File: client/src/components/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">SmartTravelHub</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/flights">Flights</Link></li>
        <li><Link to="/hotels">Hotels</Link></li>
        <li><Link to="/book-flight">My Bookings</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
