"use client";

import React, { useState, useCallback } from "react";
import { LoadingItems } from "../Loading";
import { MovieCard } from "../movies/MovieCard";
import { UseInfiniteScroll } from "../../hooks/UseScroll";
import styles from "../../page.module.css";

interface Movie {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: string;
  vote_count: string;
}

interface MovieListProps {
  initialMovies: Movie[];
  category: string;
}

export default function MovieList({ initialMovies, category }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const movieIds = new Set(movies.map((movie) => movie.id));

  const fetchMoreMovies = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;
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

      const data = await res.json();

      const newMovies = data.results.filter((movie: Movie) => !movieIds.has(movie.id));

      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [loading, page, movieIds]);

  UseInfiniteScroll(fetchMoreMovies);

  return (
    <div>
      <div className={styles.movieList}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie}/>
        ))}
      </div>
      {loading && (
        <div className={styles.loaderContainer}>
          <LoadingItems />
        </div>
      )}
    </div>
  );
}
