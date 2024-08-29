import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    if (clickCount === 1) {
      timer = setTimeout(() => setClickCount(0), 1000); // Reset after 1000ms if no further clicks
    }

    if (clickCount === 3) {
      console.log("Triple click detected, navigating to /admin"); // Updated log
      navigate('/admin'); // Navigate directly to the AdminControl page after triple-click
      setClickCount(0); // Reset click count
    }

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [clickCount, navigate]);

  const handleTripleClick = () => {
    setClickCount(prevCount => prevCount + 1);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="glow-text">KreativeCapital</Link>
        {/* Visible Pink Button for Debugging */}
        <button id="hidden-trigger-logo" onClick={handleTripleClick}>Admin</button>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="glow-text">Home</Link>
        </li>
        <li>
          <Link to="/create-campaign" className="glow-text">Create Campaign</Link>
        </li>
        <li>
          <Link to="/dashboard" className="glow-text">Dashboard</Link>
        </li>
        <li>
          <Link to="/my-account" className="glow-text">My Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;