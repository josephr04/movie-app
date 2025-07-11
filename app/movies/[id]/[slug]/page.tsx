import Head from 'next/head';
import { CardCarousel } from '@components/home/CardCarousel';
import { FadeInOnScroll } from '@components/Animations';
import { ReviewCarousel } from '@components/ReviewCarousel';
import { MovieBanner } from '@components/movies/MovieBanner';
import { MovieTrailer } from '@components/movies/MovieTrailer';
import styles from '@styles/page.module.css';

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

export default async function page({ params }: { params: Promise<{ id: string; slug?: string }> }) {
  const { id } = await params;

  const [movie, videos, reviews] = await Promise.all([
    getMovieData(id),
    getMovieVideo(id),
    getMovieReviews(id)
  ]);

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
        <MovieBanner movie={movie}/>
        <div className={styles.movieDetails}>
          <div>
            <h1>Movie Details</h1>
            <FadeInOnScroll>
              <div className={styles.movieSubDetails}>
                <div className={styles.video}>
                  <h2>Trailer:</h2>
                  <div className={styles.videoContainer}>
                    <MovieTrailer videos={videos}/>
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