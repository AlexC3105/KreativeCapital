import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CreateCampaign from './pages/CreateCampaign/CreateCampaign';
import Dashboard from './pages/Dashboard/Dashboard';
import MyAccount from './pages/MyAccount/MyAccount';
import PinInput from './pages/PinInput/PinInput';
import AdminControl from './pages/AdminControl/AdminControl';

const AppRoutes = ({ onNewCampaign, campaigns }) => {
  console.log('Campaigns received in routes.js:', campaigns);

  return (
    <Routes>
      <Route path="/" element={<Home campaigns={campaigns} />} />
      <Route path="/create-campaign" element={<CreateCampaign onNewCampaign={onNewCampaign} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-account" element={<MyAccount />} />
      <Route path="/pin-input" element={<PinInput />} />
      <Route path="/admin" element={<AdminControl />} />
    </Routes>
  );
};

export default AppRoutes;