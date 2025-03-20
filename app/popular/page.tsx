import MovieList from "@components//movies/MovieList";
import { getMovies } from "@components//movies/GetMovies"
import styles from "@styles/page.module.css";

export default async function Page() {
  const initialMovies = await getMovies(1);

  return (
    <div className={styles.popularContainer}>
      <div className={styles.popularHeader}>
        <h1>Popular Movies</h1>
      </div>
      <MovieList initialMovies={initialMovies} category="popular" />
    </div>
  );
}
