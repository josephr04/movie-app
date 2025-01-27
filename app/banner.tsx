type Movie = {
  id: string;
  title: string;
  backdrop_path: string;
};

async function getMovies(): Promise<Movie[]> {

  const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();
  return data.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    backdrop_path: movie.backdrop_path,
  }));
}

import React, { useEffect, useState } from "react";

const MovieBanners: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovies()
      .then((movies) => setMovies(movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ display: "flex", overflowX: "scroll", gap: "1rem" }}>
      {movies.map((movie) => (
        <div key={movie.id} style={{ minWidth: "300px" }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3 style={{ textAlign: "center" }}>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MovieBanners;
