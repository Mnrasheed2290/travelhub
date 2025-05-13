// File: client/src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">SkyNest</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/flights">Flights</Link></li>
        <li><Link to="/hotels">Hotels</Link></li>
        <li><Link to="/cars">Cars</Link></li>
        <li><Link to="/bookings">My Trips</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
