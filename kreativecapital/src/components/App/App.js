import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as THREE from 'three';
import './App.css';
import AppRoutes from './AppRoutes';
import Footer from './components/Footer/Footer';

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
  ]);  // Adding back the dummy campaigns

  useEffect(() => {
    console.log('App component mounted');
    initGlobe();
  }, []);

  useEffect(() => {
    console.log('Current campaigns:', campaigns);
  }, [campaigns]);

  const initGlobe = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('globe'), antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const globeGeometry = new THREE.SphereGeometry(100, 64, 64);
    const globeMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 2,
      transparent: true,
      opacity: 0.8,
    });
    const globe = new THREE.Points(globeGeometry, globeMaterial);
    scene.add(globe);

    camera.position.z = 300;

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();
  };

  const handleNewCampaign = (campaign) => {
    console.log('New campaign received in App:', campaign);
    setCampaigns((prevCampaigns) => [campaign, ...prevCampaigns]);
  };

  return (
    <Router>
      <div className="app-container">
        <main className="content-container">
          <AppRoutes onNewCampaign={handleNewCampaign} campaigns={campaigns} />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;