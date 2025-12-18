import { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../components/Store';
import ErrorMessage from '../../components/error-message/error-message';
import {
  MemoizedCitiesList,
  MemoizedOfferMap,
  MemoizedOfferList,
  MemoizedSortOptions,
  MemoizedHeader
} from '../../hocs/memoized-component/memoized-component';
import { SortType } from '../../components/types/types';
import { setCity } from '../../components/Store/offers/offer-slice';
import { fetchOffers } from '../../components/Store/offers/offer-thunks';
import { logout } from '../../components/Store/user/user-thunks';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../components/Store';
import Spinner from '../../components/spinner/spinner';
import MainEmpty from '../../components/main-empty/main-empty';
import { Sort } from '../../components/types/types';

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

  const [currentSort, setCurrentSort] = useState<SortType>(Sort.Popular);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const favoriteCount = useMemo(() => offers.filter((o) => o.isFavorite).length, [offers]);

  const filteredOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === selectedCity),
    [offers, selectedCity]
  );

  const memoizedSortedOffers = useMemo(
    () => [...filteredOffers].sort((a, b) => {
      switch(currentSort) {
        case Sort.PriceLowToHigh: return a.price - b.price;
        case Sort.PriceHighToLow: return b.price - a.price;
        case Sort.TopRated: return b.rating - a.rating;
        default: return 0;
      }
    }),
    [filteredOffers, currentSort]
  );

  const filteredOfferCount = memoizedSortedOffers.length;

  useEffect(() => {
    let isMounted = true;

    const loadOffers = async () => {
      try {
        await dispatch(fetchOffers());
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    loadOffers();

    return () => {
      isMounted = false;
    };
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

  const handleLogout = useCallback(() => {
    dispatch(logout()).then(() => navigate('/login'));
  }, [dispatch, navigate]);

  return (
    <div className="page page--gray page--main">
      <Spinner
        isLoading={isLoading}
        minDuration={1500}
        text="Loading offers..."
      />
      {error && <ErrorMessage message={error} />}
      <MemoizedHeader
        authorizationStatus={authorizationStatus}
        user={user}
        favoriteCount={favoriteCount}
        onSignOut={handleLogout}
      />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <MemoizedCitiesList
            currentCity={selectedCity}
            onCityChange={handleCityChange}
          />
        </div>
        {filteredOfferCount === 0 ? (
          <MainEmpty city={selectedCity} />
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
