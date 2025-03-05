"use client";

import React, { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";
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
    setLoading: (loading: boolean) => void;
}

export function SearchMovies({ name, setLoading }: SearchListProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState("");
    const [loadingLocal, setLoadingLocal] = useState(true);

    useEffect(() => {
        if (!name) return;

        const fetchMovies = async () => {
            setMovies([]); 
            setError("");
            setLoading(true);
            setLoadingLocal(true);

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
                setLoadingLocal(false);
            }
        };

        fetchMovies();
    }, [name, setLoading]);

    if (error) {
        return <div className={styles.errorMessage}>{error}</div>;
    }

    return (
        <>
            {!loadingLocal && movies.length === 0 && (
                <h3 className={styles.searchLoading}>No results found. Try another search.</h3>
            )}
            <div className={styles.movieList}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </>
    );
}