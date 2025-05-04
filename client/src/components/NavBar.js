import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const countries = [
  'United States', 'Canada', 'United Kingdom', 'France', 'Germany', 'Australia', 'Japan', 'Turkey',
  'Malaysia', 'Indonesia', 'United Arab Emirates', 'Morocco', 'South Africa'
  // NOTE: Israel is excluded.
];

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">SmartTravelHub</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/flights">Flights</Link></li>
        <li><Link to="/hotels">Hotels</Link></li>
        <li>
          <select>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
