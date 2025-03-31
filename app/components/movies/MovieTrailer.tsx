import styles from '@styles/page.module.css';

interface Video {
  type: string;
  key: string;
}

interface VideosProp {
  id: number;
  results: Video[];
}

export function MovieTrailer({ videos } : { videos: VideosProp }) {
  const trailer = videos.results.find((v: { type: string}) => v.type === "Trailer") || videos.results[0] || null;

  return (
    <>
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
    </>
  )
}