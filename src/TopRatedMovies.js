import React, { useContext, useState } from 'react';
import { MoviesContext } from './MoviesContext';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import './TopRatedMovies.css';

const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 });
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const TopRatedMovies = () => {
  const { movies, currentIndex, setCurrentIndex, handleSwipe } = useContext(MoviesContext);
  const [gone] = useState(() => new Set());
  const [props, set] = useSprings(movies.length, i => ({ ...to(i), from: from(i) }));

  const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2;
    const dir = xDir < 0 ? -1 : 1;
    if (!down && trigger) gone.add(index);
    set(i => {
      if (index !== i) return;
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
      const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
      const scale = down ? 1.1 : 1;
      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } };
    });
    if (!down && gone.size === movies.length) setTimeout(() => gone.clear() || set(i => to(i)), 600);
    if (!down && trigger) {
      handleSwipe(index, dir === 1 ? 'right' : 'left');
      setCurrentIndex(prevIndex => Math.min(prevIndex + 1, movies.length - 1));
    }
  });

  return (
    <div className="movies-container">
      <div className="cards-container">
        {props.map(({ x, y, rot, scale }, i) => (
          <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
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
