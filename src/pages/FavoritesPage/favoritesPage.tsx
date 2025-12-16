import { FC, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../components/Store';
import Spinner from '../../components/spinner/spinner';
import { MemoizedOfferList } from '../../hocs/memoized-component/memoized-component';
import { logout } from '../../components/Store/user/user-thunks';
import { fetchFavoriteOffers } from '../../components/Store/favorites/favorites-thunks';
import { AuthorizationStatus } from '../../api/types/auth';
import FavoritesEmpty from '../../components/favorite-empty/favorite-empty';
import ErrorMessage from '../../components/error-message/error-message';

const FavoritesPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { favoriteOffers, isFavoriteLoading } = useAppSelector((state) => state.favorites);
  const { user, authorizationStatus } = useAppSelector((state) => state.user);
  const error = useAppSelector((state) => state.offer.error);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, authorizationStatus]);

  const handleLogout = useCallback(async () => {
    await dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  if (isFavoriteLoading) {
    return <Spinner />;
  }

  return (
    <div className="page">
      {error && <ErrorMessage message={error} />}
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>

            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      {user?.avatarUrl && (
                        <img className="user__avatar" src={user.avatarUrl} alt={user.name} width="20" height="20" />
                      )}
                    </div>
                    <span className="header__user-name user__name">{user?.email}</span>
                    <span className="header__favorite-count">{favoriteOffers.length}</span>
                  </Link>
                </li>

                <li className="header__nav-item">
                  <span className="header__nav-link" onClick={() => {
                    void handleLogout();
                  }}
                  >
                    <span className="header__signout">Sign out</span>
                  </span>
                </li>
              </ul>
            </nav>

          </div>
        </div>
      </header>

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

      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

export default FavoritesPage;
