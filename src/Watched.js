import React, { useContext, useEffect } from 'react';
import { MoviesContext } from './MoviesContext';
import './Watched.css';

const Watched = () => {
  const { watchedMovies } = useContext(MoviesContext);

  // Ajouter un log pour vérifier la valeur de watchedMovies
  console.log(watchedMovies);

  // Utiliser useEffect pour empêcher le pull-to-refresh
  useEffect(() => {
    // Fonction qui empêche le pull-to-refresh
    const preventPullToRefresh = (e) => {
      if (window.scrollY === 0 && e.touches[0].clientY > 50) {
        e.preventDefault(); // Empêche le rechargement de la page
      }
    };

    // Attacher l'événement de touch
    document.addEventListener('touchmove', preventPullToRefresh, { passive: false });

    // Nettoyage lors du démontage du composant
    return () => {
      document.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, []); // Le tableau vide signifie que l'effet ne se déclenche qu'une seule fois (au montage)

  return (
    <div className="watched-container">
      <h2>Watched</h2>
      
      {/* Le message disparaît quand watchedMovies contient des films */}
      {watchedMovies.length === 0 ? (
        <p className="no-movies-message">Aucun film dans votre Watched list.</p>
      ) : (
        <div className="movie-container-watched">
          {watchedMovies.map((movie) => (
            <div key={movie.id} className="movie-card-watched">
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

export default Watched;
