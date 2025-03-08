import React, { useContext } from 'react';
import { MoviesContext } from './MoviesContext';
import { useSwipeable } from 'react-swipeable';
import './TopRatedMovies.css';

const TopRatedMovies = () => {
  const {
	movies,
	currentIndex,
	setCurrentIndex,
	handleSwipe,
  } = useContext(MoviesContext);

  const swipeHandlers = useSwipeable({
	onSwipedLeft: () => {
  	if (movies && currentIndex !== undefined) {
    	handleSwipe(currentIndex, 'left');
    	setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, movies.length - 1));
  	}
	},
	onSwipedRight: () => {
  	if (movies && currentIndex !== undefined) {
    	handleSwipe(currentIndex, 'right');
    	setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, movies.length - 1));
  	}
	},
	onSwipedUp: () => {
  	if (movies && currentIndex !== undefined) {
    	handleSwipe(currentIndex, 'top'); // Ajout à la watchlist
    	setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, movies.length - 1));
  	}
	},
	preventDefaultTouchmoveEvent: true,
	trackMouse: true,
  });

  return (
	<div className="movies-container">
  	<div className="cards-container">
    	{movies.length > 0 && currentIndex < movies.length && (
      	<div
        	className="movie-card"
        	key={movies[currentIndex].id}
        	{...swipeHandlers}
      	>
        	<img
          	src={https://image.tmdb.org/t/p/original${movies[currentIndex].poster_path}}
          	alt={movies[currentIndex].title}
          	className="movie-poster"
        	/>
      	</div>
    	)}
  	</div>
	</div>
  );
};

export default TopRatedMovies;
