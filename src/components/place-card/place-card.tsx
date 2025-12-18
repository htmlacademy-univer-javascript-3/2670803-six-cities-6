import { FC, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offer } from '../../api/types/types';
import { useAppDispatch, useAppSelector } from '../Store';
import { toggleFavoriteOffer } from '../Store/favorites/favorites-thunks';
import { AuthorizationStatus } from '../../api/types/types';

type PlaceCardProps = {
  offer: Offer;
  isActive?: boolean;
  className?: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const PlaceCard: FC<PlaceCardProps> = ({ offer, onMouseEnter, onMouseLeave, isActive, className = 'cities__card'}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  const handleFavoriteClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    dispatch(
      toggleFavoriteOffer({
        offerId: offer.id,
        isFavorite: offer.isFavorite,
      })
    );
  }, [authorizationStatus, dispatch, navigate, offer.id, offer.isFavorite]);

  return (
    <article
      className={`${className} place-card ${isActive ? 'place-card--active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={handleFavoriteClick}
            aria-pressed={offer.isFavorite}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
