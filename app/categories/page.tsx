import React from 'react'
import styles from '@styles/page.module.css';
import Link from 'next/link'
import slugify from "slugify";
import { Ripple } from 'primereact/ripple';

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  backdrop_path: string;
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

async function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`;
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

  return (await res.json()).results as Movie[];
}

export default async function page() {
  let genres = null;
  let genreImages: { [key: number]: string } = {};

  try {
    genres = await getGenres();

    const moviesByGenre = await Promise.all(
      genres.map(async (genre) => {
        const movies = await getMoviesByGenre(genre.id);
        return { genreId: genre.id, image: movies.length > 0 ? movies[1].backdrop_path : null};
      })
    );

    moviesByGenre.forEach(({genreId, image}) => {
      if (image) {
        genreImages[genreId] = `https://image.tmdb.org/t/p/w500${image}`;
      }
    });
  } catch (error) {
    console.log(error);
  }

  if (!genres) {
    return <div className={styles.errorMessage}>Error loading categories... Please try again later.</div>;
  }

  return (
    <div className={styles.categoriesContainer}>
      <div className={styles.categoriesHeader}>
        <h1>Categories</h1>
      </div>
      <div className={styles.categoryList}>
      {genres.map((genre) => {
        const slug = slugify(genre.name, { lower: true });
        return (
          <Link key={genre.id} href={`/categories/${slug}`}>
            <div className={`${styles.categoryCard} p-ripple`}>
              <div className={styles.categoryImgOverlay}></div>  
              <img 
                src={genreImages[genre.id]} 
                className={styles.categoryImg} 
                alt={genre.name}
              />
              <h3>{genre.name}</h3>
              <Ripple />
            </div>
          </Link>
        );
      })}
      </div>
    </div>
  );
}
