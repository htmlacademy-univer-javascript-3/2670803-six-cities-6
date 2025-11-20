import { Meta, StoryObj } from '@storybook/react';
import NearPlacesList from '../components/NearPlacesList/nearPlacesList';
import { Offer } from '../mocks/types/offer';
import { MemoryRouter } from 'react-router-dom';

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful Apartment',
    type: 'apartment',
    price: 120,
    city: 'Paris',
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
    previewImage: 'img/apartment-01.jpg',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
  },
  {
    id: '2',
    title: 'Cozy Studio',
    type: 'studio',
    price: 80,
    city: 'Paris',
    isFavorite: true,
    isPremium: true,
    rating: 4.5,
    previewImage: 'img/studio-01.jpg',
    location: { latitude: 48.8584, longitude: 2.2945, zoom: 12 },
  },
];

export default {
  title: 'Components/NearPlacesList',
  component: NearPlacesList,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: '800px', padding: '20px', background: '#f0f0f0' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} as Meta;

export const Default: StoryObj = {
  args: {
    offers: mockOffers,
  },
};
