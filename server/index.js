// File: server/index.js
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// === Load Amadeus Credentials from Environment Variables ===
const AMADEUS_CLIENT_ID = process.env.hotelsearchAMADEUS_API_KEY;
const AMADEUS_CLIENT_SECRET = process.env.hotelsearchAMADEUS_API_SECRET;

// === Get Access Token from Amadeus ===
const getAmadeusToken = async () => {
  try {
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

    const token = response.data.access_token;
    console.log("✅ Token received:", token?.slice(0, 10) + "..."); // Debug log
    return token;
  } catch (err) {
    console.error("❌ Failed to fetch token:", err.response?.data || err.message);
    throw err;
  }
};

// === /api/locations ===
app.get("/api/locations", async (req, res) => {
  const keyword = req.query.q || "a";

  try {
    const token = await getAmadeusToken();

    const response = await axios.get(
      "https://test.api.amadeus.com/v1/reference-data/locations",
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          keyword,
          subType: "CITY,AIRPORT"
        }
      }
    );

    const filtered = response.data.data.filter(
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

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Proxy server running on port ${PORT}`)
);
