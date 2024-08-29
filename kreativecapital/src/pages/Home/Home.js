import React, { useEffect } from 'react';
import * as THREE from 'three';
import './Home.css';
import ethLogo from '../../assets/images/ethereum-symbol.png';
import CampaignCard from './CampaignCard/CampaignCard';

const Home = ({ campaigns = [] }) => {

  useEffect(() => {
    const canvas = document.getElementById('globe');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
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

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <div className="home">
      <div id="text-container">
        <h1>Welcome to Kreative Capital</h1>
        <h2>Your Future, Our Mission</h2>
      </div>
      <div id="globe-container">
        <canvas id="globe"></canvas>
      </div>
      <div id="campaigns-container">
        {campaigns.length === 0 ? (
          <p>No campaigns available.</p>
        ) : (
          <div className="campaigns-grid">
            {campaigns.map((campaign, index) => (
              <CampaignCard key={index} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;