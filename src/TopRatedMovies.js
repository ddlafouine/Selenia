import React, { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { MoviesContext } from './MoviesContext';

const TopRatedMovies = () => {
  const { movies, handleSwipe } = useContext(MoviesContext);

  return (
    <View style={styles.container}>
      {movies.length > 0 && (
        <Swiper
          cards={movies}
          renderCard={(movie) => (
            <View style={styles.card}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }}
                style={styles.poster}
              />
            </View>
          )}
          onSwipedLeft={(index) => handleSwipe(index, 'left')}
          onSwipedRight={(index) => handleSwipe(index, 'right')}
          onSwipedTop={(index) => handleSwipe(index, 'top')}
          backgroundColor={'transparent'}
          cardIndex={0}
          stackSize={3}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 300,
    height: 450,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default TopRatedMovies;
