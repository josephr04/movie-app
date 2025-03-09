import React from 'react'
import Link from 'next/link';
import { Star } from "lucide-react";
import { Ripple } from 'primereact/ripple';
import slugify from "slugify";
import styles from '../../page.module.css';

interface Movie {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: string;
  vote_count: string;
}

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const slug = slugify(movie.title, { lower: true });
  const movieId = movie.id;

  return (
    <Link href={`/movies/${movieId}/${slug}`} className={`text-center mx-3 w-100 ${styles.movieCard} p-ripple`}>
        <div className={styles.movieOverlay}>
          <p className={styles.movieTitleOverlay}>{movie.title}</p>
          <div className={styles.movieRating}>
              <p className={styles.voteAverage}>{parseFloat(movie.vote_average).toFixed(1)}</p>
              <Star size={17} />
              <p>({movie.vote_count})</p>
          </div>
          <p className={styles.movieDescription}>{movie.overview}</p>
        </div>
        <div className={styles.movieBanner}>
          <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              className="d-block w-100"
              alt={movie.title}
          />
        </div>
        <p className={styles.movieTitle}>{movie.title}</p>
        <Ripple />
    </Link>
  )
}