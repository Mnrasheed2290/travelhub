// File: server/index.js

import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// === Token Cache ===
let tokenCache = {};

const getAmadeusToken = async (key, secret) => {
  const cacheKey = `${key}_token`;
  const now = Date.now();

  if (tokenCache[cacheKey] && tokenCache[cacheKey].expiresAt > now) {
    return tokenCache[cacheKey].token;
  }

  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: key,
      client_secret: secret
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );

  const token = response.data.access_token;
  tokenCache[cacheKey] = {
    token,
    expiresAt: now + 28 * 60 * 1000 // cache for 28 minutes
  };

  return token;
};

// === /api/locations (City/Airport Search) ===
app.get("/api/locations", async (req, res) => {
  const keyword = (req.query.q || "").trim();
  if (keyword.length < 2) return res.json([]);

  try {
    const token = await getAmadeusToken(
      process.env.flightAMADEUS_API_KEY,
      process.env.flightAMADEUS_API_SECRET
    );

    const response = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${encodeURIComponent(keyword)}&subType=CITY,AIRPORT`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const filtered = response.data.data.filter(
      (city) =>
        city.address?.countryCode !== "IL" &&
        !["Tel Aviv", "Jerusalem", "Eilat", "Haifa"].includes(city.name)
    );

    res.json(
      filtered.map((c) => ({
        name: c.name,
        country: c.address?.countryCode,
        iataCode: c.iataCode
      }))
    );
  } catch (error) {
    console.error("Location fetch error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

// === Server Start ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`\u{1F680} Server running on port ${PORT}`));
