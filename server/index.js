// File: server/index.js
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Match these exactly with Render environment variable names!
const SERVICE_KEYS = {
  hotelSearch: {
    key: process.env.hotelsearchAMADEUS_API_KEY,
    secret: process.env.hotelsearchAMADEUS_API_SECRET,
  },
};

const getAmadeusToken = async (service) => {
  const creds = SERVICE_KEYS[service];
  if (!creds) throw new Error("Invalid service");

  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: creds.key,
      client_secret: creds.secret,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  return response.data.access_token;
};

// Unified endpoint: used by hotels, flights, cars
app.get("/api/locations", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing query param" });

    const token = await getAmadeusToken("hotelSearch");
    const amadeusResponse = await axios.get("https://test.api.amadeus.com/v1/reference-data/locations", {
      params: { keyword: q, subType: "CITY" },
      headers: { Authorization: `Bearer ${token}` },
    });

    const cities = amadeusResponse.data.data
      .filter(city => city.address?.countryCode !== "IL")
      .map(city => ({
        name: city.name,
        country: city.address?.countryCode,
        iataCode: city.iataCode
      }));

    res.json(cities);
  } catch (err) {
    console.error("City fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
