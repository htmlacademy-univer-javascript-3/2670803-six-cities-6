import { FC, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../components/Store';
import Spinner from '../../components/spinner/spinner';
import { MemoizedOfferMap, MemoizedReviewForm, MemoizedReviewList, MemoizedNearPlacesList, MemoizedHeader} from '../../hocs/memoized-component/memoized-component';
import { fetchOfferData } from '../../components/Store/offers/offer-thunks';
import { logout } from '../../components/Store/user/user-thunks';
import { toggleFavoriteOffer } from '../../components/Store/favorites/favorites-thunks';
import { AuthorizationStatus } from '../../api/types/types';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../components/Store';

const selectOfferPageData = createSelector(
  (state: RootState) => state.offer,
  (state: RootState) => state.user,
  (state: RootState) => state.favorites,
  (state: RootState) => state.comments,
  (offer, user, favorites, comments) => ({
    offerDetails: offer.offerDetails,
    nearbyOffers: offer.nearbyOffers,
    comments: comments.comments || [],
    commentsLoading: comments.commentsLoading,
    authorizationStatus: user.authorizationStatus,
    user: user.user,
    favoriteOffers: favorites.favoriteOffers,
  })
);

const OfferPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    offerDetails,
    nearbyOffers,
    comments,
    commentsLoading,
    authorizationStatus,
    user,
    favoriteOffers
  } = useAppSelector(selectOfferPageData);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferData(id));
    }
  }, [dispatch, id]);

  const isFavorite = useMemo(
    () =>
      authorizationStatus === AuthorizationStatus.Auth && offerDetails
        ? favoriteOffers.some((offer) => offer.id === offerDetails.id)
        : false,
    [favoriteOffers, offerDetails, authorizationStatus]
  );

  const handleFavoriteClick = useCallback(() => {
    if (!offerDetails) {
      return;
    }
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }
    dispatch(toggleFavoriteOffer({ offerId: offerDetails.id, isFavorite }));
  }, [authorizationStatus, dispatch, navigate, offerDetails, isFavorite]);

  const handleLogout = useCallback(() => {
    dispatch(logout()).then(() => navigate('/login'));
  }, [dispatch, navigate]);

  const reviews = useMemo(() => comments.map((comment) => ({
    id: comment.id,
    userName: comment.user.name,
    userAvatar: comment.user.avatarUrl,
    rating: comment.rating,
    text: comment.comment,
    date: comment.date,
    isPro: comment.user.isPro,
  })), [comments]);

  if (!offerDetails) {
    return (
      <Spinner isLoading minDuration={1500} text="Loading offer..." />
    );
  }

  const {
    title,
    images,
    previewImage,
    isPremium,
    type,
    rating,
    bedrooms,
    maxAdults,
    price,
    goods,
    description,
    host,
  } = offerDetails;

  return (
    <div className="page">
      <MemoizedHeader
        authorizationStatus={authorizationStatus}
        user={user}
        favoriteCount={favoriteOffers.length}
        onSignOut={handleLogout}
      />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {(images || [previewImage]).slice(0, 6).map((img) => (
                <div className="offer__image-wrapper" key={img}>
                  <img className="offer__image" src={img} alt={title} />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button
                  className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${Math.round(rating) / 5 * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} {maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods?.map((item) => (
                    <li className="offer__inside-item" key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                {host && (
                  <div className={`offer__host-user user ${host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                    <div className="offer__avatar-wrapper user__avatar-wrapper">
                      <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">{host.name}</span>
                    {host.isPro && <span className="offer__user-status">Pro</span>}
                  </div>
                )}

                <div className="offer__description">
                  {description?.split('\n').map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <section className="offer__reviews reviews">
                {commentsLoading ? (
                  <Spinner
                    isLoading
                    minDuration={1000}
                    text="Loading comments..."
                  />
                ) : (
                  <MemoizedReviewList reviews={reviews} />
                )}
                {authorizationStatus === AuthorizationStatus.Auth && offerDetails.id && (
                  <MemoizedReviewForm offerId={offerDetails.id} />
                )}
              </section>
            </div>
          </div>

          <section>
            <MemoizedOfferMap
              offers={[offerDetails, ...nearbyOffers]}
              mode="offer"
            />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <MemoizedNearPlacesList offers={nearbyOffers.slice(0, 3)} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
