import slugify from 'slugify';
import Image from 'next/image';
import tmdbLogo from '@assets/tmdb-logo.png';
import Link from 'next/link';
import { TbWorld } from 'react-icons/tb';
import { FadeInOnScroll } from '@components/Animations';
import styles from '@styles/page.module.css';

interface Movie {
  title: string;
  backdrop_path: string;
  poster_path: string;
  genres: { id: number; name: string }[];
  vote_average: string;
  overview: string;
  release_date: string;
  runtime: number;
  homepage: string;
}

export function MovieBanner({ movie } : { movie: Movie }) {
  const rating = parseFloat(movie.vote_average).toFixed(1);

  return (
    <div className={styles.movieHeader} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
      <FadeInOnScroll>
        {movie.poster_path ? (
          <div className={styles.moviePoster}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              title={movie.title}
            />
          </div>
        ) : (
          <div className={styles.emptyPoster}>No poster available</div>
        )}
      </FadeInOnScroll>
      <div className={styles.moviePageInfo}>
        <FadeInOnScroll>
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
              <TbWorld size={25} />
            </Link>
          </div>
        </FadeInOnScroll>
      </div>
    </div>
  )
}