// File: server/index.js
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Define supported services and credentials
const SERVICE_KEYS = {
  hotelSearch: {
    key: process.env.hotelsearchAMADEUS_API_KEY,
    secret: process.env.hotelsearchAMADEUS_API_SECRET
  }
};

// Token fetcher for Amadeus
const getAmadeusToken = async (service) => {
  const creds = SERVICE_KEYS[service];
  if (!creds) throw new Error("Invalid service name.");

  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: creds.key,
      client_secret: creds.secret
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );

  return response.data.access_token;
};

// Proxy route to fetch cities (excluding Israel)
app.get("/api/hotel-cities", async (req, res) => {
  try {
    const { keyword = "a" } = req.query;
    const token = await getAmadeusToken("hotelSearch");

    const response = await axios.get("https://test.api.amadeus.com/v1/reference-data/locations", {
      headers: { Authorization: `Bearer ${token}` },
      params: { keyword, subType: "CITY" }
    });

    const filtered = response.data.data.filter(
      (city) =>
        city.address?.countryCode !== "IL" &&
        !["Tel Aviv", "Jerusalem", "Eilat", "Haifa"].includes(city.name)
    );

    const formatted = filtered.map((city) => ({
      name: city.name,
      country: city.address?.countryCode
    }));

    res.json(formatted);
  } catch (error) {
    console.error("City fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
