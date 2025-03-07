import React, { useContext } from 'react';
import TinderCard from 'react-tinder-card';
import { MoviesContext } from './MoviesContext';
import './TopRatedMovies.css';

const TopRatedMovies = () => {
  const { movies, handleSwipe } = useContext(MoviesContext);

  return (
    <div className="movies-container">
      {movies.length > 0 &&
        movies.map((movie, index) => (
          <TinderCard
            key={movie.id}
            onSwipe={(direction) => handleSwipe(index, direction)}
            className="movie-card"
            preventSwipe={['down']}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
          </TinderCard>
        ))}
    </div>
  );
};

export default TopRatedMovies;
