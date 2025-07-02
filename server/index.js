// File: server/index.js

import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// === Load Amadeus Credentials from Environment ===
const AMADEUS_CLIENT_ID = process.env.AMADEUS_API_KEY;
const AMADEUS_CLIENT_SECRET = process.env.AMADEUS_API_SECRET;

// === Token Caching Logic ===
let cachedToken = null;
let tokenExpiresAt = null;

const getAmadeusToken = async () => {
  if (cachedToken && tokenExpiresAt && new Date() < tokenExpiresAt) {
    return cachedToken;
  }

  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: AMADEUS_CLIENT_ID,
      client_secret: AMADEUS_CLIENT_SECRET
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );

  cachedToken = response.data.access_token;
  tokenExpiresAt = new Date(Date.now() + 29 * 60 * 1000); // Expires in 29 minutes

  return cachedToken;
};

// === /api/locations endpoint with pagination & filtering ===
app.get("/api/locations", async (req, res) => {
  const keyword = req.query.q || "";

  if (keyword.length < 2) {
    return res.json([]); // Return nothing for short inputs
  }

  try {
    const token = await getAmadeusToken();
    let allResults = [];

    let nextUrl = `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${encodeURIComponent(keyword)}&subType=CITY,AIRPORT`;

    while (nextUrl) {
      const response = await axios.get(nextUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });

      allResults.push(...response.data.data);
      nextUrl = response.data.meta?.links?.next || null;
    }

    // Exclude Israeli cities
    const filtered = allResults.filter(
      (city) =>
        city.address?.countryCode !== "IL" &&
        !["Tel Aviv", "Jerusalem", "Eilat", "Haifa"].includes(city.name)
    );

    const formatted = filtered.map((city) => ({
      name: city.name,
      country: city.address?.countryCode || "",
      iataCode: city.iataCode
    }));

    res.json(formatted);
  } catch (error) {
    console.error("❌ Location fetch error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

// === Start the Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
});
