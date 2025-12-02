import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OfferList from '../../components/OfferList/offerList';
import OfferMap from '../../components/Map/map';
import { RootState, AppDispatch } from '../../components/Store';
import { useSelector, useDispatch } from 'react-redux';
import { setCity } from '../../components/Store/action';
import CitiesList from '../../components/CitiesList/cititesList';
import SortOptions, { SortType } from '../../components/SortOptions/sortOptions';
import { fetchOffers, logout } from '../../components/Store/api-actions';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/errorMessage';
import { useAppSelector } from '../../components/Store';

const MainPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedCity = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const error = useSelector((state: RootState) => state.error);

  const [currentSort, setCurrentSort] = useState<SortType>('Popular');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useSelector((state: RootState) => state.user);
  const favoriteCount = offers.filter((offer) => offer.isFavorite).length;

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

  if (isLoading) {
    return (
      <Spinner />
    );
  }

  const filteredOffers = offers.filter((offer) => offer.city.name === selectedCity);
  const sortedOffers = [...filteredOffers].sort((a,b) => {
    switch (currentSort) {
      case 'Price: low to high':
        return a.price - b.price;
      case 'Price: high to low':
        return b.price - a.price;
      case 'Top rated first':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  const filteredOfferCount = sortedOffers.length;

  const handleCitychange = (city: string) => {
    dispatch(setCity(city));
  };

  const handleSortChange = (sortType: SortType) => {
    setCurrentSort(sortType);
  };

  const handleOfferHover = (offerId: string | null) => {
    setActiveOfferId(offerId);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
  };

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
                {authorizationStatus === 'AUTH' ? (
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
          <CitiesList
            currentCity={selectedCity}
            onCityChange={handleCitychange}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOfferCount} places to stay in {selectedCity}</b>
              <SortOptions
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />
              <OfferList
                offers={sortedOffers}
                onOfferHover={handleOfferHover}
              />
            </section>
            <div className="cities__right-section">
              <OfferMap
                offers={sortedOffers}
                activeOfferId={activeOfferId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
