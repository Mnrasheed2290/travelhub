// File: client/src/pages/CarRental.js
import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import "./CarRental.css";

function CarRental() {
  const [location, setLocation] = useState(null);
  const [cars, setCars] = useState([]);

  const searchCars = async () => {
    try {
      const response = await axios.get(`/cars/search?location=${location}`);
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div className="car-rental">
      <h2>Find Your Rental Car</h2>
      <Select
        options={[{ value: "NYC", label: "New York" }, { value: "LA", label: "Los Angeles" }]}
        onChange={(selected) => setLocation(selected.value)}
        placeholder="Select location"
      />
      <button onClick={searchCars}>Search</button>
      <ul>
        {cars.map((car, index) => (
          <li key={index}>{car.name} - ${car.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default CarRental;
