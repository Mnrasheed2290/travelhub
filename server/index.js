// File: server/index.js

const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// Map services to key/secret pairs from .env
const SERVICE_KEYS = {
  flightOfferSearch: {
    key: process.env.FLIGHTOFFERSEARCH_AMADEUS_API_KEY,
    secret: process.env.FLIGHTOFFERSEARCH_AMADEUS_API_SECRET,
  },
  hotelSearch: {
    key: process.env.HOTELSEARCH_AMADEUS_API_KEY,
    secret: process.env.HOTELSEARCH_AMADEUS_API_SECRET,
  },
  carRentalSearch: {
    key: process.env.CARRENTALSEARCH_AMADEUS_API_KEY,
    secret: process.env.CARRENTALSEARCH_AMADEUS_API_SECRET,
  }
};

app.get("/api/amadeus-token", async (req, res) => {
  const service = req.query.service;
  const creds = SERVICE_KEYS[service];

  if (!creds || !creds.key || !creds.secret) {
    return res.status(400).json({ error: "Invalid or missing service" });
  }

  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: creds.key,
        client_secret: creds.secret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.json(response.data);
  } catch (err) {
    console.error("Amadeus token error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Token request failed" });
  }
});

app.get("/", (req, res) => {
  res.send("Amadeus Token Server Running ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
