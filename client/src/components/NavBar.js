// File: client/src/components/NavBar.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPlane, FaHotel, FaCar, FaUser, FaSuitcase } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="navbar-title">SkyNest</Link>
      </div>
      <ul className="navbar-links">
        <li className={isActive("/flights") ? "active" : ""}>
          <Link to="/flights"><FaPlane /> Flights</Link>
        </li>
        <li className={isActive("/hotels") ? "active" : ""}>
          <Link to="/hotels"><FaHotel /> Hotels</Link>
        </li>
        <li className={isActive("/cars") ? "active" : ""}>
          <Link to="/cars"><FaCar /> Cars</Link>
        </li>
        <li className={isActive("/bookings") ? "active" : ""}>
          <Link to="/bookings"><FaSuitcase /> My Trips</Link>
        </li>
        <li className={isActive("/login") ? "active" : ""}>
          <Link to="/login"><FaUser /> Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
