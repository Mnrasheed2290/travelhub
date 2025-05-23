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
const AMADEUS_CLIENT_ID = process.env.hotelsearchAMADEUS_API_KEY;
const AMADEUS_CLIENT_SECRET = process.env.hotelsearchAMADEUS_API_SECRET;

// === Function to Get Access Token ===
const getAmadeusToken = async () => {
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

  return response.data.access_token;
};

// === /api/locations endpoint with pagination support ===
app.get("/api/locations", async (req, res) => {
  const keyword = req.query.q || "a";
  try {
    const token = await getAmadeusToken();
    let allResults = [];
    let offset = 0;
    const limit = 20;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get("https://test.api.amadeus.com/v1/reference-data/locations", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          keyword,
          subType: "CITY,AIRPORT",
          "page[limit]": limit,
          "page[offset]": offset
        }
      });

      const results = response.data.data;
      allResults.push(...results);

      // Check if there is a next page
      const nextLink = response.data.meta?.links?.next;
      hasMore = !!nextLink;
      offset += limit;
    }

    // Filter out cities from Israel
    const filtered = allResults.filter(
      (city) =>
        city.address?.countryCode !== "IL" &&
        !["Tel Aviv", "Jerusalem", "Eilat", "Haifa"].includes(city.name)
    );

    // Format final response
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

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Proxy server running on port ${PORT}`)
);
