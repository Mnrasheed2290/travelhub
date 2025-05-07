// File: client/src/apiKeys.js

const API_KEYS = {
  flight: {
    key: process.env.REACT_APP_flightAMADEUS_API_KEY,
    secret: process.env.REACT_APP_flightAMADEUS_API_SECRET,
  },
  hotelSearch: {
    key: process.env.REACT_APP_hotelsearchAMADEUS_API_KEY,
    secret: process.env.REACT_APP_hotelsearchAMADEUS_API_SECRET,
  },
  hotelBooking: {
    key: process.env.REACT_APP_hotelbookingAMADEUS_API_KEY,
    secret: process.env.REACT_APP_hotelbookingAMADEUS_API_SECRET,
  },
  flightOfferSearch: {
    key: process.env.REACT_APP_flightoffersearchAMADEUS_API_KEY,
    secret: process.env.REACT_APP_flightoffersearchAMADEUS_API_SECRET,
  },
  flightOfferPrice: {
    key: process.env.REACT_APP_flightofferpriceAMADEUS_API_KEY,
    secret: process.env.REACT_APP_flightofferpriceAMADEUS_API_SECRET,
  },
  flightCreateOrder: {
    key: process.env.REACT_APP_flightcreateorderAMADEUS_API_KEY,
    secret: process.env.REACT_APP_flightcreateorderAMADEUS_API_SECRET,
  },
  carRentalSearch: {
    key: process.env.REACT_APP_carrentalsearchAMADEUS_API_KEY,
    secret: process.env.REACT_APP_carrentalsearchAMADEUS_API_SECRET,
  },
  carRentalBooking: {
    key: process.env.REACT_APP_carrentalbookingAMADEUS_API_KEY,
    secret: process.env.REACT_APP_carrentalbookingAMADEUS_API_SECRET,
  }
};

export default API_KEYS;
