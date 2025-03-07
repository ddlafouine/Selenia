import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaFilm, FaClipboardList } from 'react-icons/fa'; // Nouvelles icônes

import './BottomNavBar.css';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('/'); // Pour suivre l'onglet actif
  const [iconStates, setIconStates] = useState({
    watchlist: false,
    home: true,
    watched: false,
  });

  // Fonction pour changer d'onglet
  const handleTabChange = (path) => {
    if (path && navigate) {
      setActiveTab(path); // Met à jour l'onglet actif
      navigate(path); // Navigue vers le chemin

      setIconStates((prevState) => {
        const newState = { watchlist: false, home: false, watched: false };
        if (path === '/watchlist') {
          newState.watchlist = !prevState.watchlist;
        } else if (path === '/') {
          newState.home = !prevState.home;
        } else if (path === '/watched') {
          newState.watched = !prevState.watched;
        }
        return newState;
      });
    }
  };

  return (
    <div className="bottom-nav-bar">
      <button 
        onClick={() => handleTabChange('/watchlist')} 
        className={`nav-button ${activeTab === '/watchlist' ? 'active' : ''}`}
      >
        <FaEye className={iconStates.watchlist ? 'active' : ''} />
        <span>Watchlist</span>
      </button>

      <button 
        onClick={() => handleTabChange('/')} 
        className={`nav-button ${activeTab === '/' ? 'active' : ''}`}
      >
        <FaFilm className={iconStates.home ? 'active' : ''} />
        <span>Accueil</span>
      </button>

      <button 
        onClick={() => handleTabChange('/watched')} 
        className={`nav-button ${activeTab === '/watched' ? 'active' : ''}`}
      >
        <FaClipboardList className={iconStates.watched ? 'active' : ''} />
        <span>Watched</span>
      </button>
    </div>
  );
};

export default BottomNavBar;
