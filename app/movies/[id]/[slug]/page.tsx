import slugify from "slugify";
import Image from "next/image";
import tmdbLogo from "@assets/tmdb-logo.png";
import Link from 'next/link';
import LanguageIcon from '@mui/icons-material/Language';
import { CardCarousel } from "@components/home/CardCarousel";
import styles from '../../../page.module.css';

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
  const rating = parseFloat(movie.vote_average).toFixed(1);

  return (
    <div>
      <div className={styles.movieHeader} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
        <div className={styles.moviePoster}>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            title={movie.title}
          />
        </div>
        <div className={styles.moviePageInfo}>
          <h1>{movie.title}</h1>
          <div className={styles.genresContainer}>
            <p>{movie.release_date.split("-")[0]}</p>
            <p>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</p>
            {movie.genres.map((genre: { id: number; name: string }, index: number) => (
              <span key={genre.id}>
                <a className={styles.genreLink} href={`/categories/${slugify(genre.name, { lower: true })}`}>{genre.name}</a>
                {index < movie.genres.length - 1 && ", "}
              </span>
            ))}
          </div>
          <div className={styles.movieRating}>
            <Image src={tmdbLogo} alt="TMDB Logo" width={20} height={20} title={`${rating} audience rating on TMDB`}/>
            <p className={styles.voteAverage}>{rating}</p>
          </div>
          <p className={``}>{movie.overview}</p>
          <div className={styles.externalLinks}>
            <h1>External Links:</h1>
            <Link className={`${styles.homePageIcon}`} href={movie.homepage} target="_blank" title="Official Site">
              <LanguageIcon />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.movieRecommendations}>
        <CardCarousel title="Recommendations" movieId={movie.id}/>
      </div>
    </div>
  )
}