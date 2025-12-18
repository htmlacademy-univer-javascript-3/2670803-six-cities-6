import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface CityItemProps {
  city: string;
  currentCity: string;
  onCityChange: (city: string) => void;
}

const CityItem: FC<CityItemProps> = ({ city, currentCity, onCityChange }) => {
  const handleCityClick = useCallback(() => {
    onCityChange(city);
  }, [city, onCityChange]);

  return (
    <li className="locations__item">
      <Link
        className={`locations__item-link tabs__item ${
          currentCity === city ? 'tabs__item--active' : ''
        }`}
        to="/"
        onClick={handleCityClick}
      >
        <span>{city}</span>
      </Link>
    </li>
  );
};

export default CityItem;
