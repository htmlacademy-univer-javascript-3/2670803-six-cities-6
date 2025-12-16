import { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../components/Store';
import ErrorMessage from '../../components/error-message/error-message';
import {
  MemoizedCitiesList,
  MemoizedMainEmpty,
  MemoizedOfferMap,
  MemoizedOfferList,
  MemoizedSortOptions,
  MemoizedSpinner,
} from '../../hocs/memoized-component/memoized-component';
import { SortType } from '../../components/types';
import { setCity } from '../../components/Store/offers/offer-slice';
import { fetchOffers } from '../../components/Store/offers/offer-thunks';
import { logout } from '../../components/Store/user/user-thunks';
import { AuthorizationStatus } from '../../api/types/auth';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../components/Store';

const selectMainPageData = createSelector(
  (state: RootState) => state.offer,
  (state: RootState) => state.user,
  (offer, user) => ({
    selectedCity: offer.city,
    offers: offer.offers,
    error: offer.error,
    user: user.user,
    authorizationStatus: user.authorizationStatus,
  })
);

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedCity, offers, error, user, authorizationStatus } = useAppSelector(selectMainPageData);

  const [currentSort, setCurrentSort] = useState<SortType>('Popular');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const favoriteCount = useMemo(() => offers.filter((o) => o.isFavorite).length, [offers]);

  const filteredOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === selectedCity),
    [offers, selectedCity]
  );

  const memoizedSortedOffers = useMemo(
    () => [...filteredOffers].sort((a, b) => {
      switch (currentSort) {
        case 'Price: low to high': return a.price - b.price;
        case 'Price: high to low': return b.price - a.price;
        case 'Top rated first': return b.rating - a.rating;
        default: return 0;
      }
    }),
    [filteredOffers, currentSort]
  );

  const filteredOfferCount = memoizedSortedOffers.length;

  useEffect(() => {
    const loadOffers = async () => {
      try {
        await dispatch(fetchOffers());
      } finally {
        setIsLoading(false);
      }
    };

    loadOffers();
  }, [dispatch]);

  const handleCityChange = useCallback((city: string) => {
    dispatch(setCity(city));
  }, [dispatch]);

  const handleSortChange = useCallback((sortType: SortType) => {
    setCurrentSort(sortType);
  }, []);

  const handleOfferHover = useCallback((offerId: string | null) => {
    setActiveOfferId(offerId);
  }, []);

  const handleLogout = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logout()).then(() => navigate('/login'));
  }, [dispatch, navigate]);

  if (isLoading) {
    return <MemoizedSpinner text="Loading offers..." />;
  }

  return (
    <div className="page page--gray page--main">
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
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          {user && (
                            <img
                              className="header__avatar user__avatar"
                              src={user.avatarUrl}
                              alt={user.name}
                              width="20"
                              height="20"
                            />
                          )}
                        </div>
                        <span className="header__user-name user__name">
                          {user ? user.email : 'Loading...'}
                        </span>
                        <span className="header__favorite-count">{favoriteCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/login">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <MemoizedCitiesList
            currentCity={selectedCity}
            onCityChange={handleCityChange}
          />
        </div>
        {filteredOfferCount === 0 ? (
          <MemoizedMainEmpty city={selectedCity} />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOfferCount} places to stay in {selectedCity}</b>
                <MemoizedSortOptions
                  currentSort={currentSort}
                  onSortChange={handleSortChange}
                />
                <MemoizedOfferList
                  offers={memoizedSortedOffers}
                  onOfferHover={handleOfferHover}
                />
              </section>
              <div className="cities__right-section">
                <MemoizedOfferMap
                  offers={memoizedSortedOffers}
                  activeOfferId={activeOfferId}
                  mode="default"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
