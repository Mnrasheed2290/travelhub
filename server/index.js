import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Service credentials for Amadeus APIs (from .env)
const SERVICE_KEYS = {
  flightOfferSearch: {
    key: process.env.FLIGHTOFFERSEARCH_AMADEUS_API_KEY,
    secret: process.env.FLIGHTOFFERSEARCH_AMADEUS_API_SECRET
  },
  hotelSearch: {
    key: process.env.HOTELSEARCH_AMADEUS_API_KEY,
    secret: process.env.HOTELSEARCH_AMADEUS_API_SECRET
  },
  carRentalSearch: {
    key: process.env.CARRENTALSEARCH_AMADEUS_API_KEY,
    secret: process.env.CARRENTALSEARCH_AMADEUS_API_SECRET
  }
};

// Helper to obtain an Amadeus OAuth token for a given service  
const getAmadeusToken = async (service) => {
  const creds = SERVICE_KEYS[service];
  if (!creds) {
    throw new Error("Invalid service");
  }
  // Request OAuth2 token from Amadeus
  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: creds.key,
      client_secret: creds.secret
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  return response.data.access_token;
};

// Endpoint to get an Amadeus token (used by client for other API calls if needed)
app.get("/api/amadeus-token", async (req, res) => {
  const service = req.query.service;
  try {
    const accessToken = await getAmadeusToken(service);
    return res.json({ access_token: accessToken });
  } catch (err) {
    console.error("Token request error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Token request failed" });
  }
});

// Endpoint to retrieve city suggestions for hotels (and other searches)
app.get("/api/hotel-cities", async (req, res) => {
  const { keyword } = req.query;
  // If no search keyword provided, return empty list
  if (!keyword || keyword.length < 1) {
    return res.json([]);
  }
  try {
    // Get a token using the Hotel Search API credentials
    const token = await getAmadeusToken("hotelSearch");
    // Call Amadeus locations API for city suggestions (increasing page limit for more results)
    const response = await axios.get("https://test.api.amadeus.com/v1/reference-data/locations", {
      headers: { Authorization: `Bearer ${token}` },
      params: { 
        keyword: keyword, 
        subType: "CITY", 
        "page[limit]": 20  // request up to 20 results instead of default 10
      }
    });
    // Filter out any cities in Israel (countryCode "IL") or specific Israeli city names
    const filtered = response.data.data.filter(city =>
      city.address?.countryCode !== "IL" &&
      !["Tel Aviv", "Jerusalem", "Eilat", "Haifa"].includes(city.name)
    );
    // Format the results for the frontend (name and country code for display)
    const results = filtered.map(city => ({
      value: city.name,
      label: `${city.name}, ${city.address?.countryCode}`
    }));
    return res.json(results);
  } catch (err) {
    console.error("City fetch error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to fetch cities" });
  }
});

// ... (other endpoints for flights, hotels, car rentals search could be here) ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
