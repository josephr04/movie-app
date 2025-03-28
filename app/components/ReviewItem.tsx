"use client";

import styles from '@styles/page.module.css';

interface Review {
  id: string;
  username: string;
  avatar_path: string;
  content: string;
}

export function ReviewItem({ review }: { review: Review }) {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.userProfile}>
        <img  className={styles.avatar} src={review.avatar_path ? `https://image.tmdb.org/t/p/w500/${review.avatar_path}` : "/default-avatar.png"} alt={review.username} />
        <h1>{review.username || "Anonymous"}</h1>
      </div>
      <div className={styles.reviewContent}>
        <p>{review.content}</p>
      </div>
    </div>
  );
}
