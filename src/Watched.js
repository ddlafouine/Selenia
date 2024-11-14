// Watched.js
import React, { useContext } from 'react';
import { MoviesContext } from './MoviesContext';
import './Watched.css';

const Watched = () => {
  const { watchedMovies } = useContext(MoviesContext);

  return (
    <div className="watched-container">
      <h2>Watched</h2>
      
      <div className="movie-container-watched">
        {watchedMovies.length > 0 ? (
          watchedMovies.map((movie) => (
            <div key={movie.id} className="movie-card-watched">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster-watched"
              />
              <h3 className="movie-title-watched">{movie.title}</h3>
            </div>
          ))
        ) : (
          <p className="no-movies-message">Aucun film dans votre Watched list.</p>
        )}
      </div>
    </div>
  );
};

export default Watched;

