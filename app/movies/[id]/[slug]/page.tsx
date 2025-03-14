import styles from '../../../page.module.css';
import slugify from "slugify";

interface PageProps {
  params : {
    id: string;
    slug?: string;
  };
}

async function getMovieData(slug: string) {
  const url = `https://api.themoviedb.org/3/movie/${slug}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2ZiZTYyNGNhODExOWIxNzAxZTUyMGEwOWQ5ZjM2MSIsIm5iZiI6MTczNzk1MTQzOC4wOTIsInN1YiI6IjY3OTcwOGNlMGUxZTA0ODZkNjJiMmU1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WMOdLcTEtcLaeYQ2bbyaAm88sCVzJsAlSERPUF87C7U'
    }
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Error fetching movie");
  }

  return res.json();
}

export default async function page({ params }: PageProps) {
  const movie = await getMovieData(params.id);

  return (
    <div>
      <div className={styles.movieHeader}>
        <div className={styles.moviePageInfo}>
          <div className={styles.moviePoster}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div>
            <h1>{movie.title}</h1>
            <div className={styles.genresContainer}>
              <p>{movie.release_date.split("-")[0]}</p>
              <p>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</p>
              {movie.genres.map((genre: { id: number; name: string }) => (
                <a className={styles.genreLink} key={genre.id} href={`/categories/${slugify(genre.name, { lower: true })}`}>{genre.name}</a>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.movieBackgroundImg}>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
          />
        </div>
      </div>
    </div>
  )
}