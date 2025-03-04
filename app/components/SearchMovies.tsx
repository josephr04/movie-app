"use client";

import React, { useState, useEffect } from "react";
import { MovieCard } from "./movies/MovieCard";
import CircularProgress from '@mui/material/CircularProgress';
import styles from "../page.module.css";

interface Movie {
    id: string;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: string;
    vote_count: string;
}

interface SearchListProps {
    name: string;
}

export function SearchMovies({ name }: SearchListProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!name) return;

        const fetchMovies = async () => {
            setLoading(true);
            setMovies([]);
            setError("");

            await new Promise((resolve) => setTimeout(resolve, 1000));

            try {
                const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`;
                const options = {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                    },
                };

                const res = await fetch(url, options);
                if (!res.ok) throw new Error("Failed to fetch movies");

                const data = await res.json();

                setMovies(data.results);
            } catch (err) {
                setError("Failed to load movies. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [name]);

    if (error) {
        return <div className={styles.errorMessage}>{error}</div>;
    }

    return (
        <div>
            {movies.length === 0 && !loading && <div className={styles.notFoundMessage}>No results found. Try another search.</div>}

            <div className={styles.movieList}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {loading && (
                <div className={styles.searchLoading}>
                    <CircularProgress color="inherit" size={50}/>
                </div>
            )}
        </div>
    );
}