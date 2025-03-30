import Head from 'next/head';
import slugify from 'slugify';
import Image from 'next/image';
import tmdbLogo from '@assets/tmdb-logo.png';
import Link from 'next/link';
import { TbWorld } from 'react-icons/tb';
import { CardCarousel } from '@components/home/CardCarousel';
import { FadeInOnScroll } from '@components/Animations';
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

async function getMovieVideo(movieId: string) {
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

async function getMovieReviews(movieId: string) {
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
  const [movie, videos, reviews] = await Promise.all([
    getMovieData(id),
    getMovieVideo(id),
    getMovieReviews(id)
  ]);
  const rating = parseFloat(movie.vote_average).toFixed(1);
  const trailer = videos.results.find((v: { type: string}) => v.type === "Trailer") || videos.results[0] || null;

  return (
    <>
      <Head>
        <title>{`${movie.title} - Movie Details`}</title>
        <meta name="description" content={movie.overview || "Movie details and reviews"} />
        <meta property="og:title" content={movie.title} />
        <meta property="og:description" content={movie.overview} />
        <meta property="og:image" content={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
      </Head>

      <div>
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
        <div className={styles.movieDetails}>
          <div>
            <h1>Movie Details</h1>
            <FadeInOnScroll>
              <div className={styles.movieSubDetails}>
                <div className={styles.video}>
                  <h2>Trailer:</h2>
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
                  <div>
                    <h2>Languages:</h2>
                    <div>
                      {movie.spoken_languages.length > 0 ? (
                        movie.spoken_languages.map((lang: {english_name: string}, index: number) => (
                          <span key={index}>
                            <span>{lang.english_name}</span>
                            {index < movie.spoken_languages.length - 1 && ", "}
                          </span>
                        ))
                      ) : (
                        <div>Not available</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2>Production Companies:</h2>
                    <div>
                      {movie.production_companies.length > 0 ? (
                        movie.production_companies.map((company: {name: string}, index: number) => (
                          <span key={index}>
                            <span>{company.name}</span>
                            {index < movie.production_companies.length - 1 && ", "}
                          </span>
                        ))
                      ) : (
                        <div>Not available</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2>Production Countries:</h2>
                    <div>
                      {movie.production_countries.length > 0 ? (
                        movie.production_countries.map((country: {name: string}, index: number) => (
                          <span key={index}>
                            <span>{country.name}</span>
                            {index < movie.production_countries.length - 1 && ", "}
                          </span>
                        ))
                      ) : (
                        <div>Not available</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2>Release Date:</h2>
                    <div>
                      {movie.release_date ? (
                        <p>{movie.release_date}</p>
                      ) : (
                        <div>Not available</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
          <div className={styles.reviewCarousel}>
            <h1>{`${movie.title} Ratings & Reviews`}</h1>
            {reviews.results.length > 0 ? (
              <FadeInOnScroll>
                <ReviewCarousel reviews={reviews} />
              </FadeInOnScroll>
            ) : (
              <p>No reviews available yet.</p>
            )}
          </div>
        </div>
        <div className={styles.movieRecommendations}>
          <CardCarousel title="Recommendations" movieId={movie.id}/>
        </div>
      </div>
    </>
  )
}