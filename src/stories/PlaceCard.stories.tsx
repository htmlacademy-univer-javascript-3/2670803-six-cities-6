import { Meta, StoryFn } from '@storybook/react';
import PlaceCard from '../components/PlaceCard/placeCard';
import { Offer } from '../mocks/types/offer';
import { MemoryRouter } from 'react-router-dom';

const mockOffer: Offer = {
  id: '1',
  title: 'Beautiful Apartment',
  type: 'apartment',
  price: 120,
  city: 'Paris',
  isFavorite: false,
  isPremium: true,
  rating: 4.2,
  previewImage: 'img/apartment-01.jpg',
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
};

const meta: Meta<typeof PlaceCard> = {
  title: 'Components/PlaceCard',
  component: PlaceCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: '300px' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;

export const Default: StoryFn<typeof PlaceCard> = (args) => <PlaceCard {...args} />;
Default.args = {
  offer: mockOffer,
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

export const Active: StoryFn<typeof PlaceCard> = (args) => <PlaceCard {...args} />;
Active.args = {
  ...Default.args,
  isActive: true,
};

export const NonPremium: StoryFn<typeof PlaceCard> = (args) => <PlaceCard {...args} />;
NonPremium.args = {
  ...Default.args,
  offer: { ...mockOffer, isPremium: false },
};
