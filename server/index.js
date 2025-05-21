app.get("/api/locations", async (req, res) => {
  const keyword = req.query.q || "a";
  try {
    const token = await getAmadeusToken();
    let allResults = [];
    let offset = 0;
    let limit = 20;
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

      // Pagination logic from API response
      const nextLink = response.data.meta?.links?.next;
      hasMore = !!nextLink;
      offset += limit;
    }

    // Filter out Israel
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
