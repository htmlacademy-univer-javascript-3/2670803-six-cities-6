import { FC } from 'react';
import { Link } from 'react-router-dom';

interface CitiesListProps {
  currentCity: string;
  onCityChange: (city: string) => void;
}

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const CitiesList: FC<CitiesListProps> = ({ currentCity, onCityChange }) => (
  <section className="locations container">
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city} className="locations__item">
          <Link
            className={`locations__item-link tabs__item ${
              currentCity === city ? 'tabs__item--active' : ''
            }`}
            to="/"
            onClick={() => {
              onCityChange(city);
            }}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default CitiesList;
