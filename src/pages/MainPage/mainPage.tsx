import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OfferList from '../../components/OfferList/offerList';
import OfferMap from '../../components/Map/map';
import { RootState, AppDispatch } from '../../components/Store';
import { useSelector, useDispatch } from 'react-redux';
import { setCity } from '../../components/Store/action';
import CitiesList from '../../components/CitiesList/cititesList';
import SortOptions, { SortType } from '../../components/SortOptions/sortOptions';
import { fetchOffers } from '../../components/Store/api-actions';

const MainPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedCity = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const [currentSort, setCurrentSort] = useState<SortType>('Popular');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

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

  return (
    <div className="page page--gray page--main">
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
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
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
