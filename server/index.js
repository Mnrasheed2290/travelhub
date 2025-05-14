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

app.get("/api/hotel-cities", async (req, res) => {
  try {
    const { keyword } = req.query;
    const token = await getAmadeusToken("hotelSearch");

    const result = await axios.get("https://test.api.amadeus.com/v1/reference-data/locations", {
      params: { keyword, subType: "CITY" },
      headers: { Authorization: `Bearer ${token}` },
    });

    const filtered = result.data.data.filter(
      city =>
        city.address?.countryCode !== "IL" &&
        !["Tel Aviv", "Jerusalem", "Eilat", "Haifa"].includes(city.name)
    );

    const mapped = filtered.map(city => ({
      name: city.name,
      country: city.address?.countryCode,
    }));

    res.json(mapped);
  } catch (err) {
    console.error("City fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
