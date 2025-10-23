import { FC } from 'react';
import Review from '../Review/review';
import { ReviewType } from '../Review/review';

const ReviewList: FC<{ reviews: ReviewType[] }> = ({ reviews }) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  </section>
);

export default ReviewList;
