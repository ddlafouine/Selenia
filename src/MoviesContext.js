import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => {
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

  const fetchMovies = useCallback(async (page) => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=fr-FR&page=${page}`
      );
      setMovies((prevMovies) => {
        // Éviter les doublons
        const newMovies = response.data.results.filter(
          movie => !prevMovies.some(prevMovie => prevMovie.id === movie.id)
        );
        const updatedMovies = [...prevMovies, ...newMovies];
        
        // Sauvegarder les films mis à jour dans localStorage
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        
        return updatedMovies;
      });
      setIsFetching(false);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    // Si les films ne sont pas encore dans l'état (comme au démarrage), les charger
    if (movies.length === 0) {
      fetchMovies(1);
    }
  }, [fetchMovies, movies]);

  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  useEffect(() => {
    localStorage.setItem('wantToWatchMovies', JSON.stringify(wantToWatchMovies));
  }, [wantToWatchMovies]);

  useEffect(() => {
    localStorage.setItem('currentIndex', JSON.stringify(currentIndex));
  }, [currentIndex]);

  const loadMoreMovies = () => {
    if (!isFetching) {
      fetchMovies(Math.floor((movies.length + 5) / 20) + 1); // Chargement des films suivants
    }
  };

  const handleSwipe = (index, action) => {
    if (action === 'left') {
      setUnwatchedMovies((prev) => [...prev, movies[index]]);
    } else if (action === 'right') {
      setWatchedMovies((prev) => [...prev, movies[index]]);
    } else if (action === 'top') {
      setWantToWatchMovies((prev) => [...prev, movies[index]]);
    }

    // Charger plus de films lorsque nous avons moins de 5 films restants non classés
    if (
      unwatchedMovies.length + watchedMovies.length + wantToWatchMovies.length >=
      movies.length - 5
    ) {
      loadMoreMovies();
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        watchedMovies,
        unwatchedMovies,
        wantToWatchMovies,
        currentIndex,   // L'état de l'index est maintenant partagé
        setCurrentIndex, // Fonction pour modifier l'index
        handleSwipe,
        loadMoreMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};