import React from "react";
import styles from './page.module.css';

type Movie = {
  results: Array<response>;
};

interface response {
  id: string;
  title: string;
  backdrop_path: string;
}

async function getMovies(): Promise<Movie> {
  const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2ZiZTYyNGNhODExOWIxNzAxZTUyMGEwOWQ5ZjM2MSIsIm5iZiI6MTczNzk1MTQzOC4wOTIsInN1YiI6IjY3OTcwOGNlMGUxZTA0ODZkNjJiMmU1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WMOdLcTEtcLaeYQ2bbyaAm88sCVzJsAlSERPUF87C7U",
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return (await res.json()) as Movie;
}

export default async function Banner() {
  const posts = await getMovies();
  const movieId = 1;
  return (
    <div className={styles.banner}>
      <div className={styles.movie}>
          <img
            key={posts.results[movieId].id}
            src={`https://image.tmdb.org/t/p/original${posts.results[movieId].backdrop_path}`}
            alt={posts.results[movieId].title}
            className={styles.bgImg}
          />
          <div className={styles.MovieContent}>
          <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <img src="..." className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>Some representative placeholder content for the first slide.</p>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img src="..." className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>Some representative placeholder content for the second slide.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="..." className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>Some representative placeholder content for the third slide.</p>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          </div>
      </div>
    </div>
  );
}
