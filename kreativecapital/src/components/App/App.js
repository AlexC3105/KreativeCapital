import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from '../Navbar/Navbar';
import AppRoutes from '../../AppRoutes';
import Footer from '../Footer/Footer';

const App = () => {
  const [campaigns, setCampaigns] = useState([
    {
      name: 'CryptoBridge',
      description: 'Building a seamless connection between traditional finance and the blockchain world...',
      goal: '1000 KT',
      percentage: '75% Funded',
      timeLeft: '10 Days Left',
    },
    {
      name: 'Smart Contract Solutions',
      description: 'Pioneering the future of digital agreements...',
      goal: '5000 KT',
      percentage: '60% Funded',
      timeLeft: '5 Days Left',
    },
    {
      name: 'Blockchain Ventures',
      description: 'Empowering the next generation of decentralized applications...',
      goal: '2000 KT',
      percentage: '85% Funded',
      timeLeft: '15 Days Left',
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('App component mounted');

    let clickCount = 0;

    const handleTripleClick = () => {
      clickCount++;
      if (clickCount === 3) {
        navigate('/admin'); // Navigate directly to the AdminControl page
        clickCount = 0;
      }
      setTimeout(() => {
        clickCount = 0;
      }, 500); // Reset click count after 500ms
    };

    document.addEventListener('click', handleTripleClick);

    return () => {
      document.removeEventListener('click', handleTripleClick);
    };
  }, [navigate]);

  const handleNewCampaign = (campaign) => {
    console.log('New campaign received in App:', campaign);
    setCampaigns((prevCampaigns) => [campaign, ...prevCampaigns]);
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="content-container">
        <AppRoutes onNewCampaign={handleNewCampaign} campaigns={campaigns} />
      </main>
      <Footer />
    </div>
  );
};

export default App;