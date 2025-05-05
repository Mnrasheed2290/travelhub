import React, { useState } from 'react';
import Flights from '../pages/Flights';
import Hotels from '../pages/Hotels';
import './SearchTabs.css'; // Optional: for styling tabs

function SearchTabs() {
  const [activeTab, setActiveTab] = useState('flights');

  return (
    <div className="search-tabs-container">
      <div className="tab-buttons">
        <button
          className={activeTab === 'flights' ? 'active' : ''}
          onClick={() => setActiveTab('flights')}
        >
          Flights
        </button>
        <button
          className={activeTab === 'hotels' ? 'active' : ''}
          onClick={() => setActiveTab('hotels')}
        >
          Hotels
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'flights' ? <Flights /> : <Hotels />}
      </div>
    </div>
  );
}

export default SearchTabs;
