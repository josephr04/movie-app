import React from "react";
import styles from './page.module.css';

type Movie = {
  results: Array<response>;
};

interface response {
  id: string;
  title: string;
  backdrop_path: string;
  overview: string;
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

export default async function Banner() {
  let posts = null;

  try {
    posts = await getMovies();
  } catch (error) {
    console.log(error);
  }

  if (!posts) {
    return <div className={styles.errorMessage}>Error loading movies... Please try again later.</div>;
  }

  return (
    <div className={styles.banner}>
      <div className={styles.movie}>
        <div id="movieCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className={`carousel-indicators ${styles.carouselIndicators}`}>
            {posts.results.slice(0, 6).map((_, index) => (
              <button key={index} type="button" data-bs-target="#movieCarousel" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current="true" aria-label={`Slide ${index + 1}`}></button>
            ))}
          </div>
          <div className="carousel-inner">
            {posts.results.slice(0, 6).map((movie, index) => (
              <div key={movie.id} className={`carousel-item ${index === 0 ? "active" : ""}`} data-bs-interval={index === 0 ? 10000 : 2000}>
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="d-block w-100" alt={movie.title} />
                <div className={`carousel-caption d-none d-md-block ${styles.movieInfo}`}>
                  <h5>{movie.title}</h5>
                  <p>{movie.overview}</p>
                  <button type="button" className="btn btn-warning">Watch more</button>
                </div>
              </div>
            ))}
          </div>
          <button className={`carousel-control-prev ${styles.carouselButton}`} type="button" data-bs-target="#movieCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className={`carousel-control-next ${styles.carouselButton}`} type="button" data-bs-target="#movieCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}
