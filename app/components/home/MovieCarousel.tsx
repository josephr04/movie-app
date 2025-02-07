import React from "react";
import styles from '../../page.module.css';

interface MovieCarouselProps {
  title: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies }) => {
  return (
    <section>
      <h2>{title}</h2>
      <div className={styles.MovieCarousel}>
      </div>
    </section>
  );
};

export default MovieCarousel;
