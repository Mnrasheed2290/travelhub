// File: travelhub/client/src/context/BookingContext.js

import React, { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [itinerary, setItinerary] = useState([]);

  const addBooking = (booking) => {
    setItinerary((prev) => [...prev, booking]);
  };

  const clearItinerary = () => {
    setItinerary([]);
  };

  return (
    <BookingContext.Provider value={{ itinerary, addBooking, clearItinerary }}>
      {children}
    </BookingContext.Provider>
  );
};
