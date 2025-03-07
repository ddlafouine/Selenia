import React, { useContext } from 'react';
import { MoviesContext } from './MoviesContext';
import './Watchlist.css';

const Watchlist = () => {
  const { wantToWatchMovies } = useContext(MoviesContext);

  // Ajouter un log pour vérifier la valeur de wantToWatchMovies
  console.log(wantToWatchMovies);

  const handleCardClick = (event) => {
    const titleElement = event.currentTarget.querySelector('.movie-title-watched');
    if (titleElement) {
      titleElement.classList.toggle('visible');
    }
  };

  return (
    <div className="watched-container">
      <h2>Watchlist</h2>
      
      {/* Afficher le message seulement s'il n'y a pas de films */}
      {wantToWatchMovies.length === 0 ? (
        <p className="no-movies-message">Aucun film dans votre Watchlist.</p>
      ) : (
        <div className="movie-container-watchlist">
          {wantToWatchMovies.map((movie) => (
            <div key={movie.id} className="movie-card-watched" onClick={handleCardClick}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster-watched"
              />
              <h3 className="movie-title-watched">{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
