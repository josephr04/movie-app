import MovieList from "../components/MovieList";
import styles from "../page.module.css";

async function getMovies(page: number) {
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
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
  return data.results;
}

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
