import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import CitiesList from '../components/CitiesList/cititesList';

export default {
  title: 'Components/CitiesList',
  component: CitiesList,
};

export const Default = () => {
  const [currentCity, setCurrentCity] = useState('Paris');

  return (
    <MemoryRouter>
      <CitiesList currentCity={currentCity} onCityChange={setCurrentCity} />
    </MemoryRouter>
  );
};
