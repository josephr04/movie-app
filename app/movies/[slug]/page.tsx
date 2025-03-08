import styles from '../../page.module.css';

interface PageProps {
  params : {
    slug: string,
  };
}

export default function page({ params }: PageProps) {
  const movieTitle = params.slug;

  return (
    <div className={styles.movieHeader}>
      <h1>{movieTitle}</h1>
    </div>
  )
}