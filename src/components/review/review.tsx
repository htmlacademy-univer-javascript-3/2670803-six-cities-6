import { FC, useMemo } from 'react';
import { ReviewType } from '../types/types';

interface ReviewProps {
  review: ReviewType;
}

const MAX_RATING = 5;

const Review: FC<ReviewProps> = ({ review }) => {
  const widthPercent = (review.rating / MAX_RATING) * 100;

  const formattedDate = useMemo(
    () =>
      new Date(review.date).toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
    [review.date]
  );

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.userAvatar}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.userName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${widthPercent}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.text}</p>
        <time className="reviews__time" dateTime={review.date}>
          {formattedDate}
        </time>
      </div>
    </li>
  );
};

export default Review;
