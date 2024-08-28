import React, { useEffect } from 'react';
import * as THREE from 'three';
import './Home.css';
import ethLogo from '../../assets/images/ethereum-symbol.png';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import CampaignCard from './CampaignCard/CampaignCard';

const Home = ({ campaigns = [] }) => {
  const navigate = useNavigate();

  console.log('Campaigns received in Home:', campaigns);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('globe'), antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
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

    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load(ethLogo);
    const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true });
    const logoGeometry = new THREE.PlaneGeometry(50, 50);
    const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);

    logoMesh.position.set(0, 0, 0);
    scene.add(logoMesh);

    camera.position.z = 300;

    function animate() {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      renderer.render(scene, camera);
    }

    animate();

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize, false);

    return () => {
      window.removeEventListener('resize', onWindowResize, false);
    };
  }, []);

  const handleSingleClick = () => {
    navigate('/pin-input');
  };

  return (
    <div className="home">
      <div id="text-container" onClick={handleSingleClick}>
        <h1>Welcome to Kreative Capital</h1>
        <h2>Your Future, Our Mission</h2>
      </div>
      <div id="globe-container">
        <canvas id="globe"></canvas>
      </div>
      <div id="campaigns-container"> {/* Container for the campaign cards */}
        {campaigns.length === 0 && (
          <p>No campaigns available.</p>
        )}
        <div className="campaigns-grid"> {/* Grid container for better card alignment */}
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              campaign={campaign}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;