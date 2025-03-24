"use client";
 
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import { ReviewItem } from '@components/ReviewItem';

interface ReviewCarouselProps {
  reviews: any[];
}

export default function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const responsiveOptions: CarouselResponsiveOption[] = [
    { breakpoint: '1400px', numVisible: 2, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 },
  ];

  const formattedReviews = reviews.results.map((review) => ({
    id: review.id,
    username: review.author_details.username || "Anonymous",
    avatar_path: review.author_details.avatar_path,
    content: review.content,
  }));

  return (
    <Carousel
      value={reviews}
      numVisible={3}
      numScroll={3}
      responsiveOptions={responsiveOptions}
      itemTemplate={(review: any) => <ReviewItem review={review} />}
    />
  );
}
