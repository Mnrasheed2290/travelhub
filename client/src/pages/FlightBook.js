import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FlightBook() {
  const [flightOffer, setFlightOffer] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const storedFlight = localStorage.getItem('selectedFlight');
    if (storedFlight) {
      setFlightOffer(JSON.parse(storedFlight));
    }
  }, []);

  const bookFlight = async () => {
    try {
      const traveler = {
        id: '1',
        dateOfBirth: '1990-01-01',
        name: {
          firstName,
          lastName
        },
        gender: 'MALE',
        contact: {
          emailAddress: 'test@example.com',
          phones: [{
            deviceType: 'MOBILE',
            countryCallingCode: '1',
            number: '1234567890'
          }]
        },
        documents: [{
          documentType: 'PASSPORT',
          number: '123456789',
          expiryDate: '2025-01-01',
          issuanceCountry: 'US',
          nationality: 'US',
          holder: true
        }]
      };

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/flights/book`, {
        flightOffer,
        traveler
      });

      alert('Booking successful!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Error booking flight');
    }
  };

  if (!flightOffer) {
    return <p>No flight selected.</p>;
  }

  return (
    <div>
      <h2>Book Flight</h2>
      <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
      <button onClick={bookFlight}>Confirm Booking</button>
    </div>
  );
}

export default FlightBook;
