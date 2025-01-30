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
  console.log(posts);

  return (
    <div className={styles.banner}>
      <div className={styles.movie}>
          <img
            key={posts.results[0].id}
            src={`https://image.tmdb.org/t/p/w500${posts.results[0].backdrop_path}`}
            alt={posts.results[0].title}
            className={styles.bgImg}
          />
      </div>
    </div>
  );
}
