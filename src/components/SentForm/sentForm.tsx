import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store';
import { postComment } from '../Store/api-actions';

type ReviewFormProps = {
  offerId: string;
};

const ReviewForm: FC<ReviewFormProps> = ({ offerId }) => {
  const dispatch: AppDispatch = useDispatch();

  const [formData, setFormData] = useState({
    rating: 0,
    reviewText: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'rating' ? Number(value) : value });
  };

  const isValid = formData.rating > 0 && formData.reviewText.length >= 50 && formData.reviewText.length <= 300;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    (async () => {
      try {
        await dispatch(postComment({
          offerId,
          commentData: {
            rating: formData.rating,
            comment: formData.reviewText,
          },
        }));
        setFormData({ rating: 0, reviewText: '' });
      } catch (err) {
        setError('Failed to send review. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5,4,3,2,1].map((num) => (
          <span key={num}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={num}
              id={`${num}-stars`}
              type="radio"
              checked={formData.rating === num}
              onChange={handleFieldChange}
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
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
