import React, { useContext } from 'react';
import { MoviesContext } from './MoviesContext';
import './Watchlist.css';

const Watchlist = () => {
  const { wantToWatchMovies } = useContext(MoviesContext);

  const handleCardClick = (event) => {
    const titleElement = event.currentTarget.querySelector('.movie-title-watched');
    if (titleElement) {
      titleElement.classList.toggle('visible');
    }
  };

  return (
    <div className="watched-container">
      <h2>Watchlist</h2>
      <div className="movie-container-watchlist">
        {wantToWatchMovies.length > 0 ? (
          wantToWatchMovies.map((movie) => (
            <div key={movie.id} className="movie-card-watched" onClick={handleCardClick}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster-watched"
              />
              <h3 className="movie-title-watched">{movie.title}</h3>
            </div>
          ))
        ) : (
          <p className="no-movies-message">Aucun film dans votre Watchlist.</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
