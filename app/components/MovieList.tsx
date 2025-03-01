"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Star } from "lucide-react";
import { LoadingItems } from "./Loading";
import styles from "../page.module.css";

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

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100;

      if (bottom) {
        fetchMoreMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMoreMovies]);

  return (
    <div>
      <div className={styles.popularList}>
        {movies.map((movie) => (
          <div key={movie.id} className={`text-center mx-3 ${styles.movieCard}`}>
            <a className={styles.movieOverlay}>
              <p className={styles.movieTitleOverlay}>{movie.title}</p>
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
      
      {loading && (
        <div className={styles.loaderContainer}>
          <LoadingItems />
        </div>
      )}
    </div>
  );
}
