import MovieList from '@components/movies/MovieList';
import { getMovies } from '@components/movies/GetMovies'
import styles from '@styles/page.module.css';

export default async function Page() {
  const initialMovies = await getMovies(1);

  return (
    <div className={styles.upcomingContainer}>
      <div className={styles.upcomingHeader}>
        <h1>Upcoming Movies</h1>
      </div>
      <MovieList initialMovies={initialMovies} category="upcoming" />
    </div>
  );
}
