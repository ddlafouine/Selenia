import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClipboardOutline, IoClipboard, IoEye, IoEyeOutline, IoFilm, IoFilmOutline} from "react-icons/io5";

import './BottomNavBar.css';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('/');

  const handleTabChange = (path) => {
    if (path && navigate) {
      setActiveTab(path);
      navigate(path);
    }
  };

  return (
    <div className="bottom-nav-bar">
      <button 
        onClick={() => handleTabChange('/watchlist')} 
        className={`nav-button ${activeTab === '/watchlist' ? 'active' : ''}`}
      >
        {activeTab === '/watched' ? <IoEye /> : <IoEyeOutline />}
        <span>Watchlist</span>
      </button>

      <button 
        onClick={() => handleTabChange('/')} 
        className={`nav-button ${activeTab === '/' ? 'active' : ''}`}
      >
        {activeTab === '/watched' ? <IoFilm /> : <IoFilmOutline />}
        <span>Accueil</span>
      </button>

      <button 
        onClick={() => handleTabChange('/watched')} 
        className={`nav-button ${activeTab === '/watched' ? 'active' : ''}`}
      >
        {activeTab === '/watched' ? <IoClipboard /> : <IoClipboardOutline />}
        <span>Watched</span>
      </button>
    </div>
  );
};

export default BottomNavBar;
