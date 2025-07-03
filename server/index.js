// File: server/index.js

import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// === Token Cache Function ===
const tokenCache = {};
const getAmadeusToken = async (key, secret) => {
  const cacheKey = key;
  const now = Date.now();
  if (tokenCache[cacheKey] && tokenCache[cacheKey].expiry > now) {
    return tokenCache[cacheKey].token;
  }
  const resp = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: key,
      client_secret: secret
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  const token = resp.data.access_token;
  tokenCache[cacheKey] = { token, expiry: now + 28 * 60 * 1000 };
  return token;
};

// === City / Airport Lookup ===
app.get("/api/locations", async (req, res) => {
  const kw = (req.query.q || "").trim();
  if (kw.length < 2) return res.json([]);

  try {
    const token = await getAmadeusToken(
      process.env.flightAMADEUS_API_KEY,
      process.env.flightAMADEUS_API_SECRET
    );
    const r = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${encodeURIComponent(
        kw
      )}&subType=CITY,AIRPORT`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const filtered = r.data.data.filter(
      (c) =>
        c.address?.countryCode !== "IL" &&
        !["Tel Aviv", "Jerusalem", "Eilat", "Haifa"].includes(c.name)
    );
    res.json(
      filtered.map((c) => ({
        name: c.name,
        country: c.address?.countryCode,
        iataCode: c.iataCode
      }))
    );
  } catch (err) {
    console.error("❌ Location error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

// === Flight Search ===
app.post("/api/flight-search", async (req, res) => {
  const { origin, destination, departureDate, returnDate, adults } = req.body;
  if (!origin || !destination || !departureDate || !adults)
    return res.status(400).json({ error: "Missing params" });

  try {
    const token = await getAmadeusToken(
      process.env.flightoffersearchAMADEUS_API_KEY,
      process.env.flightoffersearchAMADEUS_API_SECRET
    );
    const payload = {
      currencyCode: "USD",
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
      ...(returnDate ? { returnDate } : {})
    };
    const r = await axios.post(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      payload,
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
    );
    res.json(r.data);
  } catch (err) {
    console.error("❌ Flight search error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: err.response?.data || err.message });
  }
});

// === Hotel Search ===
app.post("/api/hotel-search", async (req, res) => {
  const { cityCode, checkInDate, checkOutDate, adults, rooms } = req.body;
  if (!cityCode || !checkInDate || !checkOutDate || !adults || !rooms)
    return res.status(400).json({ error: "Missing params" });

  try {
    const token = await getAmadeusToken(
      process.env.hotelsearchAMADEUS_API_KEY,
      process.env.hotelsearchAMADEUS_API_SECRET
    );
    const r = await axios.get("https://test.api.amadeus.com/v2/shopping/hotel-offers", {
      headers: { Authorization: `Bearer ${token}` },
      params: { cityCode, checkInDate, checkOutDate, adults, roomQuantity: rooms }
    });
    res.json(r.data);
  } catch (err) {
    console.error("❌ Hotel search error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: err.response?.data || err.message });
  }
});

// === Car Rental Search ===
app.post("/api/car-rentals", async (req, res) => {
  const { locationCode, pickupDate, returnDate, driverAge } = req.body;
  if (!locationCode || !pickupDate || !returnDate || !driverAge)
    return res.status(400).json({ error: "Missing params" });

  try {
    const token = await getAmadeusToken(
      process.env.carrentalsearchAMADEUS_API_KEY,
      process.env.carrentalsearchAMADEUS_API_SECRET
    );
    const r = await axios.get(
      "https://test.api.amadeus.com/v1/shopping/availability/car-rental-offers",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { pickupLocationCode: locationCode, dropOffLocationCode: locationCode, pickupDate, returnDate, driverAge }
      }
    );
    res.json(r.data);
  } catch (err) {
    console.error("❌ Car rentals error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: err.response?.data || err.message });
  }
});

// === Start server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
