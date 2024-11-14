import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Assurez-vous que 'react-router-dom' est bien importé
import { MoviesProvider } from './MoviesContext';
import TopRatedMovies from './TopRatedMovies';
import BottomNavBar from './BottomNavBar';
import Watchlist from './Watchlist'; // Nouveau composant pour Watchlist
import Watched from './Watched'; // Nouveau composant pour Watched

const App = () => {
  return (
    <Router> {/* Le Router doit entourer tout le code de l'application */}
      <MoviesProvider>
        <Routes>
          {/* Définir les différentes routes */}
          <Route path="/" element={<TopRatedMovies />} /> {/* Accueil, page de swipe */}
          <Route path="/watchlist" element={<Watchlist />} /> {/* Page de Watchlist */}
          <Route path="/watched" element={<Watched />} /> {/* Page des films vus */}
        </Routes>
        
        {/* La barre de navigation doit toujours être présente, en bas de chaque page */}
        <BottomNavBar />
      </MoviesProvider>
    </Router>
  );
};

export default App;

