import React from 'react';
import { FadeInOnScroll } from '../Animations';
import { MovieCard } from '@components/movies/MovieCard';
import styles from '@styles/page.module.css';

interface CardCarouselProps {
  title: React.ReactNode;
  category?: string;
  genreId?: number;
  movieId?: number;
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

async function getMoviesByGenre(category: string, genreId: number): Promise<Movie> {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=${category}.desc&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return (await res.json()) as Movie;
}

async function getMoviesRecommendations(movieId: number): Promise<Movie> {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return (await res.json()) as Movie;
}

export async function CardCarousel({ title, category = "popular", genreId, movieId }: CardCarouselProps) {
  let posts = null;

  try {
    if (genreId !== undefined) {
      posts = await getMoviesByGenre(category, genreId);
    } else if (movieId !== undefined) {
      posts = await getMoviesRecommendations(movieId);
    } else {
      posts = await getMovies(category);
    }
  } catch (error) {
    console.error(error);
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
      {posts.results.length > 0 ? (
        <FadeInOnScroll>
        <div className={styles.MovieCarousel}>
          <div id={`${category}`} className="carousel slide" data-bs-ride="false" data-bs-interval="false">
            <div className="carousel-inner">
              {movieChunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex} className={`carousel-item ${chunkIndex === 0 ? "active" : ""}`}>
                  <div className="d-flex justify-content-center" style={{marginInline: 26}}>
                    {chunk.map((movie) => (
                      <MovieCard key={movie.id} movie={movie}/>
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
        </FadeInOnScroll>
      ) : (
        <div className={styles.emptyRecommendations}>No recommendations available yet.</div>
      )}
    </div>
  );
}
