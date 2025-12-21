import { FC, useMemo } from 'react';
import { MemoizedReview } from '../../hocs/memoized-component/memoized-component';
import { ReviewType } from '../types/types';

interface ReviewListProps {
  reviews: ReviewType[];
}

const MAX_REVIEWS = 10;

const ReviewList: FC<ReviewListProps> = ({ reviews }) => {
  const sortedReviews = useMemo(() =>
    [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, MAX_REVIEWS),
  [reviews]
  );

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <MemoizedReview
            key={review.id}
            review={review}
            data-testid="memoized-review"
            data-review-id={review.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default ReviewList;
