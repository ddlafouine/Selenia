import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaFilm, FaClipboardList } from 'react-icons/fa'; // Nouvelles icônes

import './BottomNavBar.css';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('/'); // Pour suivre l'onglet actif

  // Fonction pour changer d'onglet
  const handleTabChange = (path) => {
    setActiveTab(path); // Met à jour l'onglet actif
    navigate(path); // Navigue vers le chemin
  };

  return (
    <div className="bottom-nav-bar">
      <button 
        onClick={() => handleTabChange('/watchlist')} 
        className={`nav-button ${activeTab === '/watchlist' ? 'active' : ''}`}
      >
        <FaEye />
        <span>Watchlist</span>
      </button>

      <button 
        onClick={() => handleTabChange('/')} 
        className={`nav-button ${activeTab === '/' ? 'active' : ''}`}
      >
        <FaFilm />
        <span>Accueil</span>
      </button>

      <button 
        onClick={() => handleTabChange('/watched')} 
        className={`nav-button ${activeTab === '/watched' ? 'active' : ''}`}
      >
        <FaClipboardList />
        <span>Watched</span>
      </button>
    </div>
  );
};

export default BottomNavBar;