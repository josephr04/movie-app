import React from 'react';
import slugify from 'slugify';
import { ScrollDown } from '@components/ScrollDown';
import styles from '@styles/page.module.css';

type Movie = {
  results: Array<response>;
};

type Genre = {
  id: number;
  name: string;
};

interface response {
  id: string;
  title: string;
  backdrop_path: string;
  overview: string;
  genre_ids: number[];
}

interface BannerProps {
  genreId?: number;
}

async function getMovies(): Promise<Movie> {
  const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
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

async function getMoviesByGenre(genreId: number): Promise<Movie> {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`;
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

async function getGenres(): Promise<Genre[]> {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }

  return (await res.json()).genres as Genre[];
}

export async function Banner({ genreId } : BannerProps) {
  let posts = null;
  let genres: Genre[] = [];

  try {
    if (genreId !== undefined) {
      [posts, genres] = await Promise.all([getMoviesByGenre(genreId), getGenres()]);
    } else {
      [posts, genres] = await Promise.all([getMovies(), getGenres()]);
    }
  } catch (error) {
    console.log(error);
  }

  if (!posts) {
    return <div className={styles.errorMessage}>Error loading movies... Please try again later.</div>;
  }

  const genreMap = Object.fromEntries(genres.map((genre) => [genre.id, genre.name]));

  return (
    <div>
      <div className={styles.banner}>
        <div id="BannerCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className={`carousel-indicators ${styles.carouselIndicators}`}>
            {posts.results.slice(0, 6).map((_, index) => (
              <button key={index} type="button" data-bs-target="#BannerCarousel" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current="true" aria-label={`Slide ${index + 1}`}></button>
            ))}
          </div>
          <div className="carousel-inner">
            {posts.results.slice(0, 6).map((movie, index) => {
              const slug = slugify(movie.title, { lower: true });
              const movieId = movie.id;
              return (
                <div key={movieId} className={`carousel-item ${index === 0 ? "active" : ""}`} data-bs-interval={index === 0 ? 10000 : 2000}>
                  <div className={styles.imgOverlay}></div>  
                  <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="d-block w-100" alt={movie.title} />
                  <div className={`carousel-caption d-none d-md-block ${styles.movieInfo}`}>
                    <h3>{movie.title}</h3>
                    <p className={styles.movieGenres}>{movie.genre_ids.map((id) => genreMap[id]).join(", ")}</p>
                    <p>{movie.overview}</p>
                    <a href={`/movies/${movieId}/${slug}`} className="btn btn-warning">Watch more</a>
                  </div>
                </div>
              );
            })}
          </div>
          <button className={`carousel-control-prev ${styles.carouselButton}`} type="button" data-bs-target="#BannerCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className={`carousel-control-next ${styles.carouselButton}`} type="button" data-bs-target="#BannerCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <ScrollDown />
    </div>
  );
}
