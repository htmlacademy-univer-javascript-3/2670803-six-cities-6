import { FC, useState, ChangeEvent, FormEvent, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { postComment } from '../store/comments/comment-thunks';

type ReviewFormProps = {
  offerId: string;
};

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

type ReviewFormData = { rating: number; reviewText: string };

const ReviewForm: FC<ReviewFormProps> = ({ offerId }) => {
  const dispatch = useAppDispatch();
  const commentsLoading = useAppSelector((state) => state.comments.commentsLoading);

  const [formData, setFormData] = useState<ReviewFormData>({ rating: 0, reviewText: '',});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ratingOptions = useMemo(() => [5, 4, 3, 2, 1], []);

  const isValid = useMemo(
    () =>
      formData.rating > 0 &&
      formData.reviewText.length >= MIN_REVIEW_LENGTH &&
      formData.reviewText.length <= MAX_REVIEW_LENGTH,
    [formData]
  );

  const handleFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'rating' ? Number(value) : value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!isValid || isSubmitting) {
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        await dispatch(
          postComment({
            offerId,
            commentData: {
              rating: formData.rating,
              comment: formData.reviewText,
            },
          })
        ).unwrap();

        setFormData({ rating: 0, reviewText: '' });
      } catch {
        setError('Failed to send review. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [dispatch, offerId, formData, isValid, isSubmitting]
  );

  return (
    <form className="reviews__form form" onSubmit={(e) => {
      void handleSubmit(e);
    }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingOptions.map((num) => (
          <span key={num}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={num}
              id={`${num}-stars`}
              type="radio"
              checked={formData.rating === num}
              onChange={handleFieldChange}
              aria-label={`${num} stars`}
            />
            <label htmlFor={`${num}-stars`} className="reviews__rating-label form__rating-label">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </span>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="reviewText"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.reviewText}
        onChange={handleFieldChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        {error && <p className="reviews__error" style={{ color: 'red' }}>{error}</p>}
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isSubmitting || commentsLoading}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
