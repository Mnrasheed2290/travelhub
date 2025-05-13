// File: client/src/CityInput.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const CityInput = ({ value, onChange, placeholder }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const tokenRes = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', {
          grant_type: 'client_credentials',
          client_id: process.env.REACT_APP_AMADEUS_API_KEY,
          client_secret: process.env.REACT_APP_AMADEUS_API_SECRET
        });

        const token = tokenRes.data.access_token;

        const res = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            keyword: 'a', // fetches a wide list
            subType: 'CITY'
          }
        });

        const filtered = res.data.data
          .filter(city => city.address.countryCode !== 'IL') // Exclude Israel
          .map(city => ({
            value: city.iataCode,
            label: `${city.name} (${city.iataCode})`
          }));

        setOptions(filtered);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isSearchable
    />
  );
};

export default CityInput;
