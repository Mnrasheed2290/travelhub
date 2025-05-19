// File: netlify/functions/fetchCities.js

const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const token = tokenResponse.data.access_token;

    const citiesResponse = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        keyword: 'a',   // pulls many results
        subType: 'CITY'
      }
    });

    const filtered = citiesResponse.data.data
      .filter(city => city.address.countryCode !== 'IL')
      .map(city => ({
        value: city.iataCode,
        label: `${city.name} (${city.iataCode})`
      }));

    return {
      statusCode: 200,
      body: JSON.stringify(filtered)
    };
  } catch (err) {
    console.error("City fetch error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch cities." })
    };
  }
};
