import { FC } from 'react';
import CityItem from '../city-item/city-item';

export interface CitiesListProps {
  currentCity: string;
  onCityChange: (city: string) => void;
}

const CITIES_LIST = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

const CitiesList: FC<CitiesListProps> = ({ currentCity, onCityChange }) => (
  <section className="locations container">
    <ul className="locations__list tabs__list">
      {CITIES_LIST.map((city) => (
        <CityItem
          key={city}
          city={city}
          currentCity={currentCity}
          onCityChange={onCityChange}
        />
      ))}
    </ul>
  </section>
);

export default CitiesList;
