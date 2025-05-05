// File: client/src/utils/amadeusAPI.js

const getAccessToken = async () => {
  const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.REACT_APP_flightAMADEUS_API_KEY, // or the specific one you want
      client_secret: process.env.REACT_APP_flightAMADEUS_API_SECRET,
    }),
  });
  const data = await response.json();
  return data.access_token;
};

export const fetchCitiesExcludingIsrael = async (keyword) => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data.data.filter((city) => city.address.countryCode !== "IL");
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
