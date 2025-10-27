import { FC } from 'react';

type CityListProps = {
  cities: string[];
  currentCity: string;
  onCityChange: (city: string) => void;
};

const CityList: FC<CityListProps> = ({ cities, currentCity, onCityChange }) => (
  <section className="locations container">
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <button
            className={`locations__item-link tabs__item ${
              city === currentCity ? 'tabs__item--active' : ''
            }`}
            onClick={() => onCityChange(city)}
          >
            <span>{city}</span>
          </button>
        </li>
      ))}
    </ul>
  </section>
);

export default CityList;
