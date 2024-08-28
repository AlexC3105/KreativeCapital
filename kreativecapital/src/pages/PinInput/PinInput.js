import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PinInput.css';

const PinInput = () => {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();
  const correctPinHash = '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'; // Hashed value of "1234"

  useEffect(() => {
    console.log('PinInput component mounted');
  }, []);

  const handlePinChange = (e) => {
    setPin(e.target.value);
    console.log('PIN input changed:', e.target.value);
  };

  const hashPin = async (inputPin) => {
    console.log('Hashing PIN...');
    try {
      const msgUint8 = new TextEncoder().encode(inputPin); // Encode as (utf-8) Uint8Array
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // Hash the message
      const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // Convert bytes to hex string
      console.log('Hashed PIN:', hashHex);
      return hashHex;
    } catch (error) {
      console.error('Error hashing PIN:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked, PIN entered:', pin);
    const hashedPin = await hashPin(pin);
    if (!hashedPin) {
      alert('There was an error processing your PIN. Please try again.');
      return;
    }
    console.log('Submitted Hashed PIN:', hashedPin);
    if (hashedPin === correctPinHash) {
      console.log('PIN correct, navigating to /admin');
      navigate('/admin'); // Redirect to the admin control page if the PIN is correct
    } else {
      console.log('Incorrect PIN entered');
      alert('Incorrect PIN');
      setPin(''); // Clear the input if the PIN is incorrect
    }
  };

  return (
    <div className="pin-input-container">
      <h2>Enter PIN</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={pin}
          onChange={handlePinChange}
          placeholder="Enter PIN"
          maxLength="6"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PinInput;