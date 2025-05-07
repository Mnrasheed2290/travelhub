import React, { useState } from 'react';

// A shared list of cities for autocomplete (excluding any cities in Israel)
const CITIES = [
  "New York, USA",
  "Los Angeles, USA",
  "London, UK",
  "Paris, France",
  "Dubai, UAE",
  "Tokyo, Japan",
  "Sydney, Australia",
  "Toronto, Canada",
  "Berlin, Germany",
  "Mumbai, India",
  "Cairo, Egypt",
  "Cape Town, South Africa",
  "São Paulo, Brazil",
  "Singapore, Singapore",
  "Tel Aviv, Israel",       // Israeli cities (to be filtered out)
  "Jerusalem, Israel",
  "Haifa, Israel"
];

function CityInput({ id, placeholder, value, onChange }) {
  const [open, setOpen] = useState(false);

  // Filter city options based on input, excluding Israeli cities
  const filteredCities = value ? CITIES.filter(city =>
    city.toLowerCase().includes(value.toLowerCase()) &&
    !city.toLowerCase().includes('israel')
  ) : [];

  const handleSelectCity = (city) => {
    onChange(city);
    setOpen(false);
  };

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          // Show suggestions when focusing (if any input value exists)
          if (value) setOpen(true);
        }}
        onBlur={() => {
          // Delay closing to allow click on suggestion
          setTimeout(() => setOpen(false), 100);
        }}
        required
      />
      {/* Autocomplete Suggestions */}
      {open && filteredCities.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto z-20">
          {filteredCities.map(city => (
            <li 
              key={city} 
              onMouseDown={() => handleSelectCity(city)} 
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
      {open && value && filteredCities.length === 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 z-20">
          <li className="px-3 py-2 text-gray-500">No results found</li>
        </ul>
      )}
    </div>
  );
}

export default CityInput;
