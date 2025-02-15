import React from 'react'
import styles from '../page.module.css';

type Genre = {
  id: number;
  name: string;
};

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

export default async function page() {
  let genres = null;

  try {
    genres = await getGenres();
  } catch (error) {
    console.log(error);
  }

  if (!genres) {
    return <div className={styles.errorMessage}>Error loading categories... Please try again later.</div>;
  }

  return (
    <div className={styles.categoriesContainer}>
      <div>Categories page</div>
      <div className={styles.categoryList}>
        {genres.map((genre) => (
          <div key={genre.id} className={styles.categoryCard}>
            <h3>{genre.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
