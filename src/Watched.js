import React, { useContext } from 'react';
import { MoviesContext } from './MoviesContext';
import './Watched.css';

const Watched = () => {
  const { watchedMovies } = useContext(MoviesContext);

  const handleCardClick = (event) => {
    const titleElement = event.currentTarget.querySelector('.movie-title-watched');
    if (titleElement) {
      titleElement.classList.toggle('visible');
    }
  };

  return (
    <div className="watched-container">
      <h2>Watched</h2>
      <p className="no-movies-message">Aucun film dans votre Watched list.</p>
      
      <div className="movie-container-watched">
        {watchedMovies.length > 0 ? (
          watchedMovies.map((movie) => (
            <div key={movie.id} className="movie-card-watched" onClick={handleCardClick}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster-watched"
              />
              <h3 className="movie-title-watched">{movie.title}</h3>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default Watched;
