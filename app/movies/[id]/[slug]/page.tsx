import slugify from 'slugify';
import Image from 'next/image';
import tmdbLogo from '@assets/tmdb-logo.png';
import Link from 'next/link';
import { TbWorld } from 'react-icons/tb';
import { CardCarousel } from '@components/home/CardCarousel';
import ReviewCarousel from '@components/ReviewCarousel';
import styles from '@styles/page.module.css';

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
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    }
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Error fetching movie");
  }

  return res.json();
}

async function getMovieVideo(movieId: number) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    }
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Error fetching video");
  }

  return res.json();
}

async function getMovieReviews(movieId: number) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    }
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Error fetching reviews");
  }

  return res.json();
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovieData(id);
  const rating = parseFloat(movie.vote_average).toFixed(1);
  const videos = await getMovieVideo(movie.id);
  const trailer = videos.results.find((v: { type: string}) => v.type === "Trailer") || videos.results[0] || null;
  const reviews = await getMovieReviews(movie.id);

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
              <TbWorld size={25} />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.movieDetails}>
        <div className={styles.video}>
          <h1>Trailer:</h1>
          <div className={styles.videoContainer}>
            {trailer ? (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className={styles.noTrailer}>
                <p>No trailer available.</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.details}>
          <h1>Languages</h1>
          <div className={styles.languages}>
            {movie.spoken_languages.map((lang: {english_name: string}, index: number) => (
              <p key={index}>{lang.english_name}</p>
            ))}
          </div>
        </div>
        <div className={styles.reviewCarousel}>
          <ReviewCarousel reviews={reviews} />
        </div>
      </div>
      <div className={styles.movieRecommendations}>
        <CardCarousel title="Recommendations" movieId={movie.id}/>
      </div>
    </div>
  )
}