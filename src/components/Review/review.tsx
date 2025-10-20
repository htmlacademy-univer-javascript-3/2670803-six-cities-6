import { FC } from 'react';

export type ReviewType = {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  text: string;
  date: string;
};

const Review: FC<{ review: ReviewType }> = ({ review }) => {
  const widthPercent = (review.rating / 5) * 100;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.userAvatar} width="54" height="54" alt="Reviews avatar" />
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
          {new Date(review.date).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </time>
      </div>
    </li>
  );
};

export default Review;
