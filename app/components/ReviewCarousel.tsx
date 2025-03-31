"use client";

import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import { ReviewItem } from "@components/ReviewItem";

interface AuthorDetails {
  username?: string;
  name?: string;
  avatar_path?: string;
}

interface Review {
  id: string;
  username: string;
  name: string;
  avatar_path: string;
  content: string;
}

interface ReviewsResponse {
  results: {
    id: string;
    author_details: AuthorDetails;
    name: string;
    content: string;
  }[];
}

interface ReviewCarouselProps {
  reviews: ReviewsResponse;
}

export function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const responsiveOptions: CarouselResponsiveOption[] = [
    { breakpoint: "1400px", numVisible: 2, numScroll: 1 },
    { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
    { breakpoint: "767px", numVisible: 2, numScroll: 1 },
    { breakpoint: "575px", numVisible: 1, numScroll: 1 },
  ];

  const formattedReviews: Review[] = reviews.results.map((review) => ({
    id: review.id,
    username: review.author_details.username || "Anonymous",
    name: review.author_details.name || "Anonymous",
    avatar_path: review.author_details.avatar_path || "",
    content: review.content,
  }));

  return (
    <Carousel
      value={formattedReviews}
      numVisible={3}
      numScroll={3}
      responsiveOptions={responsiveOptions}
      itemTemplate={(review: Review) => <ReviewItem review={review} />}
    />
  );
}
