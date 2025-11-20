import { Meta, StoryObj } from '@storybook/react';
import OfferMap from '../components/Map/map';
import { Offer } from '../mocks/types/offer';
import 'leaflet/dist/leaflet.css';

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
  title: 'Components/OfferMap',
  component: OfferMap,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '500px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default: StoryObj = {
  args: {
    offers: mockOffers,
    activeOfferId: '1',
  },
};
