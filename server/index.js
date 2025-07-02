// File: server/index.js

import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const AMADEUS_CLIENT_ID = process.env.flightAMADEUS_API_KEY;
const AMADEUS_CLIENT_SECRET = process.env.flightAMADEUS_API_SECRET;

if (!AMADEUS_CLIENT_ID || !AMADEUS_CLIENT_SECRET) {
  throw new Error("Amadeus API credentials are missing in environment variables.");
}

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
  tokenExpiresAt = new Date(Date.now() + 28 * 60 * 1000);

  return cachedToken;
};

app.get("/api/locations", async (req, res) => {
  const keyword = (req.query.q || "").trim();

  if (keyword.length < 2) {
    return res.json([]);
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

app.post("/api/flight-search", async (req, res) => {
  const { origin, destination, departureDate, returnDate, adults } = req.body;

  if (!origin || !destination || !departureDate || !adults) {
    return res.status(400).json({ error: "Missing required flight search parameters." });
  }

  try {
    const token = await getAmadeusToken();

    const searchPayload = {
      currencyCode: "USD",
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
      ...(returnDate ? { returnDate } : {})
    };

    const response = await axios.post(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      searchPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ Flight search error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
});
