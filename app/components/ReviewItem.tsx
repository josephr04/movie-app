"use client";

interface Review {
  id: string;
  username: string;
  avatar_path: string;
  content: string;
}

export function ReviewItem({ review }: { review: Review }) {
  return (
    <div>
      <div>
        <img src={review.avatar_path ? `https://image.tmdb.org/t/p/w500/${review.avatar_path}` : "/default-avatar.png"} alt={review.username} />
      </div>
      <div>
        <h1>{review.username || "Anonymous"}</h1>
        <p>{review.content}</p>
      </div>
    </div>
  );
}
