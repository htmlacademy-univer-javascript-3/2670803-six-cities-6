import { FC, useMemo } from 'react';
import MemoizedReview from '../review/review';
import { ReviewType } from '../types';
import { withMemo } from '../../hocs/With-memo';

const ReviewList: FC<{ reviews: ReviewType[] }> = ({ reviews }) => {
  const sortedReviews = useMemo(() =>
    [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10),
  [reviews]
  );

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <MemoizedReview key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
};

const MemoizedReviewList = withMemo(ReviewList);

export default MemoizedReviewList;
