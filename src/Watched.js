import React, { useContext, useState } from 'react';
import { MoviesContext } from './MoviesContext';
import './Watched.css';

const Watched = () => {
  const { watchedMovies } = useContext(MoviesContext);

  // State pour gérer quel film est retourné
  const [flippedMovieId, setFlippedMovieId] = useState(null);

  const handleCardClick = (movieId) => {
    // Inverse l'état du film, si déjà retourné, remet à null, sinon le retourne
    setFlippedMovieId((prevId) => (prevId === movieId ? null : movieId));
  };

  return (
    <div className="watched-container">
      <h2>Watched</h2>
      
      {/* Le message disparaît quand watchedMovies contient des films */}
      {watchedMovies.length === 0 ? (
        <p className="no-movies-message">Aucun film dans votre Watched list.</p>
      ) : (
        <div className="movie-container-watched">
          {watchedMovies.map((movie) => (
            <div
              key={movie.id}
              className={`movie-card-watched ${flippedMovieId === movie.id ? 'flipped' : ''}`}
              onClick={() => handleCardClick(movie.id)}
            >
              <div className="movie-card-inner">
                <div className="movie-card-front">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster-watched"
                  />
                </div>
                <div className="movie-card-back">
                  <h3 className="movie-title-watched">{movie.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watched;
