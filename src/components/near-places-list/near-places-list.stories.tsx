// NearPlacesList.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { MemoizedNearPlacesList } from '../memoized-component/memoized-component';
import { Offer } from '../../api/types/types';

interface FavoritesState {
  offers: string[];
}

interface OffersState {
  offers: Offer[];
}

interface UserState {
  authorizationStatus: string;
}

const mockStore = configureStore({
  reducer: {
    favorites: (state: FavoritesState = { offers: [] }): FavoritesState => state,
    offers: (state: OffersState = { offers: [] }): OffersState => state,
    user: (state: UserState = { authorizationStatus: 'NO_AUTH' }): UserState => state,
  },
  preloadedState: {
    favorites: { offers: [] },
    offers: { offers: [] },
    user: { authorizationStatus: 'NO_AUTH' },
  },
});

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Luxurious apartment at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
    previewImage: '../../../markup/img/studio-01.jpg',
    bedrooms: 2,
    description: 'Beautiful apartment',
    goods: ['Wi-Fi', 'Kitchen'],
    host: {
      name: 'John',
      avatarUrl: 'avatar.jpg',
      isPro: true
    },
    images: ['../../../markup/img/aprtment-01.jpg'],
    maxAdults: 3
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'house',
    price: 80,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.2,
    previewImage: '../../../markup/img/apartment-03.jpg',
    bedrooms: 1,
    description: 'Cozy house',
    goods: ['Wi-Fi', 'Parking'],
    host: {
      name: 'Jane',
      avatarUrl: 'avatar.jpg',
      isPro: false
    },
    images: ['../../../markup/img/apartment-03.jpg'],
    maxAdults: 2
  },
];

const meta: Meta<typeof MemoizedNearPlacesList> = {
  title: 'Components/NearPlacesList',
  component: MemoizedNearPlacesList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Provider store={mockStore}>
          <Story />
        </Provider>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    offers: { control: 'object' },
    onOfferHover: { action: 'hovered' },
  },
};

export default meta;
type Story = StoryObj<typeof MemoizedNearPlacesList>;

export const Default: Story = {
  args: { offers: mockOffers },
};

export const Empty: Story = {
  args: { offers: [] },
};

export const Single: Story = {
  args: { offers: [mockOffers[0]] },
};
