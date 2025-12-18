import { FC, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../components/store';
import Spinner from '../../components/spinner/spinner';
import { MemoizedOfferList } from '../../hocs/memoized-component/memoized-component';
import { logout } from '../../components/store/user/user-thunks';
import { fetchFavoriteOffers } from '../../components/store/favorites/favorites-thunks';
import { AuthorizationStatus } from '../../api/types/types';
import FavoritesEmpty from '../../components/favorite-empty/favorite-empty';
import ErrorMessage from '../../components/error-message/error-message';
import { MemoizedHeader } from '../../hocs/memoized-component/memoized-component';
import Footer from '../../components/footer/footer';

const FavoritesPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { favoriteOffers, isFavoriteLoading } = useAppSelector((state) => state.favorites);
  const { user, authorizationStatus } = useAppSelector((state) => state.user);
  const error = useAppSelector((state) => state.offer.error);

  useEffect(() => {
    let isMounted = true;

    if (authorizationStatus === AuthorizationStatus.Auth && isMounted) {
      dispatch(fetchFavoriteOffers());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, authorizationStatus]);

  const handleLogout = useCallback(() => {
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  }, [dispatch, navigate]);

  return (
    <div className="page">
      <Spinner
        isLoading={isFavoriteLoading}
        minDuration={1500}
        text="Loading favorites"
      />
      {error && <ErrorMessage message={error} />}
      <MemoizedHeader
        authorizationStatus={authorizationStatus}
        user={user}
        favoriteCount={favoriteOffers.length}
        onSignOut={handleLogout}
      />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {favoriteOffers.length > 0 ? (
              <MemoizedOfferList offers={favoriteOffers} />
            ) : (
              <FavoritesEmpty />
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
