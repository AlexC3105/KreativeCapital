import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import CreateCampaign from './pages/CreateCampaign/CreateCampaign';
import Dashboard from './pages/Dashboard/Dashboard';
import MyAccount from './pages/MyAccount/MyAccount';
import './assets/styles/index.css';

const App = () => {
  const [campaigns, setCampaigns] = useState([
    // Your dummy campaigns can be added here if needed
  ]);

  const handleNewCampaign = (campaign) => {
    console.log('New campaign added:', campaign);
    setCampaigns((prevCampaigns) => [campaign, ...prevCampaigns]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home campaigns={campaigns} />} />
        <Route path="/create-campaign" element={<CreateCampaign onNewCampaign={handleNewCampaign} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));