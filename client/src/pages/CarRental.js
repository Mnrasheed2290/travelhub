import React, { useState } from "react";
import CityInput from "../CityInput";

const excludedCities = ["Tel Aviv", "Jerusalem", "Haifa", "Eilat", "Israel"];

function CarRentals() {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (excludedCities.some((city) => location.includes(city))) {
      alert("Location not allowed.");
      return;
    }
    alert(
      `Searching car rentals in ${location} from ${pickupDate} to ${dropoffDate}... (Feature coming soon)`
    );
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="car-location" className="block text-gray-700 text-sm mb-1">
            Location
          </label>
          <CityInput
            id="car-location"
            placeholder="City or airport"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="car-pickup" className="block text-gray-700 text-sm mb-1">
            Pick-Up Date
          </label>
          <input
            id="car-pickup"
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="car-dropoff" className="block text-gray-700 text-sm mb-1">
            Drop-Off Date
          </label>
          <input
            id="car-dropoff"
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
            required
          />
        </div>
        <div className="flex items-end justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Search Cars
          </button>
        </div>
      </div>
    </form>
  );
}

export default CarRentals;
