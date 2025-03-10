import styles from '../../../page.module.css';

interface PageProps {
  params : {
    id: string;
    slug: string,
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
  const movieData = await getMovieData(params.id);

  return (
    <div>
      <div className={styles.movieHeader}>
        <h1>{movieData.title}</h1>
      </div>
    </div>
  )
}