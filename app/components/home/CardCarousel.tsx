import React from "react";
import { Star } from 'lucide-react';
import { AnimateOnScroll } from "../AnimateOnScroll";  // Import the client component
import styles from '../../page.module.css';

interface CardCarouselProps {
  title: string;
  category: string;
}

interface response {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: string;
  vote_count: string;
  genre_ids: number[];
}

type Movie = {
  results: Array<response>;
};

async function getMovies(category: string): Promise<Movie> {
  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return (await res.json()) as Movie;
}

export async function CardCarousel({ title, category }: CardCarouselProps) {
  let posts = null;

  try {
    posts = await getMovies(category);
  } catch (error) {
    console.log(error);
  }

  if (!posts) {
    return <div className={styles.errorMessage}>Error loading movies... Please try again later.</div>;
  }

  // This function splits the movies into chunks for better rendering
  const chunkMovies = (arr: Array<response>, chunkSize: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const movieChunks = chunkMovies(posts.results, 5);

  return (
    <div className={styles.movieCards}>
      <div className={styles.cardSectionTitle}>
        <h2>{title}</h2>
      </div>
      <AnimateOnScroll>
        <div className={styles.MovieCarousel}>
          <div id={`${category}`} className="carousel slide" data-bs-ride="false" data-bs-interval="false">
            <div className="carousel-inner">
              {movieChunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex} className={`carousel-item ${chunkIndex === 0 ? "active" : ""}`}>
                  <div className="d-flex justify-content-center">
                    {chunk.map((movie, index) => (
                      <div key={index} className={`text-center mx-3 ${styles.movieCard}`}>
                        <a className={styles.movieOverlay}>
                          <p className={styles.movieTitle}>{movie.title}</p>
                          <div className={styles.movieRating}>
                            <p className={styles.voteAverage}>{parseFloat(movie.vote_average).toFixed(1)}</p>
                            <Star size={17} />
                            <p>({movie.vote_count})</p>
                          </div>
                          <p className={styles.movieDescription}>{movie.overview}</p>
                        </a>
                        <div className={styles.movieBanner}>
                          <img 
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                            className="d-block w-100" 
                            alt={movie.title} 
                          />
                        </div>
                        <p className={styles.movieTitle}>{movie.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className={`carousel-control-prev ${styles.movieCarouselButton}`} type="button" data-bs-target={`#${category}`} data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className={`carousel-control-next ${styles.movieCarouselButton}`} type="button" data-bs-target={`#${category}`} data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
}
