import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => {
    // Restauration des films depuis localStorage
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [watchedMovies, setWatchedMovies] = useState(() => {
    const savedWatchedMovies = localStorage.getItem('watchedMovies');
    return savedWatchedMovies ? JSON.parse(savedWatchedMovies) : [];
  });

  const [unwatchedMovies, setUnwatchedMovies] = useState([]);
  const [wantToWatchMovies, setWantToWatchMovies] = useState(() => {
    const savedWantToWatchMovies = localStorage.getItem('wantToWatchMovies');
    return savedWantToWatchMovies ? JSON.parse(savedWantToWatchMovies) : [];
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedCurrentIndex = localStorage.getItem('currentIndex');
    return savedCurrentIndex ? JSON.parse(savedCurrentIndex) : 0;
  });

  const [isFetching, setIsFetching] = useState(false);
  const apiKey = 'ee26be6e3a19be503fec63f89f19097f'; // Votre clé API

  // Fonction pour récupérer les films
  const fetchMovies = useCallback(async (page) => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=fr-FR&page=${page}`
      );

      setMovies((prevMovies) => {
        const newMovies = response.data.results.filter(
          (movie) => !prevMovies.some((prevMovie) => prevMovie.id === movie.id)
        );
        return [...prevMovies, ...newMovies];
      });

      setIsFetching(false);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
    }
  }, []);

  // Charger plus de films si nécessaire
  const loadMoreMovies = () => {
    if (!isFetching) {
      const nextPage = Math.floor(movies.length / 20) + 1; // Calcul de la prochaine page
      fetchMovies(nextPage);
    }
  };

  // Sauvegarder les films dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  // Sauvegarder les listes et l'index courant
  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  useEffect(() => {
    localStorage.setItem('wantToWatchMovies', JSON.stringify(wantToWatchMovies));
  }, [wantToWatchMovies]);

  useEffect(() => {
    localStorage.setItem('currentIndex', JSON.stringify(currentIndex));
  }, [currentIndex]);

  // Charger dynamiquement des pages supplémentaires en fonction de l'index courant
  useEffect(() => {
    if (currentIndex >= movies.length - 5) {
      loadMoreMovies();
    }
  }, [currentIndex, movies.length, loadMoreMovies]);

  // Gestion des actions de swipe
  const handleSwipe = (index, action) => {
    if (action === 'left') {
      setUnwatchedMovies((prev) => [...prev, movies[index]]);
    } else if (action === 'right') {
      setWatchedMovies((prev) => [...prev, movies[index]]);
    } else if (action === 'top') {
      setWantToWatchMovies((prev) => [...prev, movies[index]]);
    }

    // Avancer à l'élément suivant
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        watchedMovies,
        unwatchedMovies,
        wantToWatchMovies,
        currentIndex,
        setCurrentIndex,
        handleSwipe,
        loadMoreMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
