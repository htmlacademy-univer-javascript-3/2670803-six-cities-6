import { Meta, StoryObj } from '@storybook/react';
import OfferList from '../components/OfferList/offerList';
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
  title: 'Components/OfferList',
  component: OfferList,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: '800px', padding: '20px', background: '#f9f9f9' }}>
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
