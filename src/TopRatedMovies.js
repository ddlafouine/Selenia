import React, { useContext, useState } from 'react';
import { MoviesContext } from './MoviesContext';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import './TopRatedMovies.css';

const trans = (r, s) => `rotateZ(${r}deg) scale(${s})`;

const TopRatedMovies = () => {
  const { movies, setCurrentIndex, handleSwipe } = useContext(MoviesContext);
  const [gone] = useState(() => new Set());
  const [props, set] = useSprings(movies.length, () => ({ x: 0, rot: 0, scale: 1 }));

  const bind = useGesture(({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2;
    const dir = xDir < 0 ? -1 : 1;
    if (!down && trigger) gone.add(index);
    set(i => {
      if (index !== i) return;
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
      const rot = down ? xDelta / 10 : 0;
      const scale = down ? 1.1 : 1;
      return { x, rot, scale, config: { friction: 50, tension: down ? 800 : 500 } };
    });
    if (!down && trigger) {
      handleSwipe(index, dir === 1 ? 'right' : 'left');
      setCurrentIndex(prevIndex => Math.min(prevIndex + 1, movies.length - 1));
    }
  });

  return (
    <div className="movies-container">
      <div className="cards-container">
        {props.map(({ x, rot, scale }, i) => (
          <animated.div key={i} style={{ transform: x.interpolate(x => `translateX(${x}px)`) }}>
            <animated.div
              {...bind(i)}
              style={{
                transform: rot.interpolate(r => trans(r, scale)),
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[i].poster_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              className="movie-card"
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedMovies;
