import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { MemoizedOfferList } from '../memoized-component/memoized-component';
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
});

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
    },
    location: { latitude: 48.85761, longitude: 2.352499, zoom: 16 },
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
    previewImage: '/img/apartment-01.jpg',
    bedrooms: 2,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Cable TV'],
    host: {
      name: 'Angelina',
      avatarUrl: '/img/avatar-angelina.jpg',
      isPro: true
    },
    images: ['/img/apartment-01.jpg', '/img/apartment-02.jpg'],
    maxAdults: 3
  },
  {
    id: '2',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'room',
    price: 80,
    city: {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
    },
    location: { latitude: 48.85861, longitude: 2.353499, zoom: 16 },
    isFavorite: true,
    isPremium: false,
    rating: 4.2,
    previewImage: '/img/room.jpg',
    bedrooms: 1,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Wi-Fi', 'Heating', 'Kitchen'],
    host: {
      name: 'Oliver',
      avatarUrl: '/img/avatar.jpg',
      isPro: false
    },
    images: ['/img/room.jpg', '/img/apartment-03.jpg'],
    maxAdults: 2
  },
  {
    id: '3',
    title: 'Wood and stone place',
    type: 'house',
    price: 200,
    city: {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
    },
    location: { latitude: 48.85961, longitude: 2.354499, zoom: 16 },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    previewImage: '/img/apartment-02.jpg',
    bedrooms: 4,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Parking', 'Pool'],
    host: {
      name: 'Max',
      avatarUrl: '/img/avatar-max.jpg',
      isPro: true
    },
    images: ['/img/apartment-02.jpg', '/img/apartment-01.jpg'],
    maxAdults: 6
  },
  {
    id: '4',
    title: 'Canal View Prinsengracht',
    type: 'hotel',
    price: 180,
    city: {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
    },
    location: { latitude: 48.86061, longitude: 2.355499, zoom: 16 },
    isFavorite: true,
    isPremium: false,
    rating: 4.0,
    previewImage: '/img/apartment-03.jpg',
    bedrooms: 3,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Breakfast'],
    host: {
      name: 'Sophie',
      avatarUrl: '/img/avatar-angelina.jpg',
      isPro: true
    },
    images: ['/img/apartment-03.jpg', '/img/room.jpg'],
    maxAdults: 4
  },
];

const meta: Meta<typeof MemoizedOfferList> = {
  title: 'Components/OfferList',
  component: MemoizedOfferList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Provider store={mockStore}>
          <div style={{ width: '1144px', padding: '20px', backgroundColor: '#f5f5f5' }}>
            <Story />
          </div>
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
type Story = StoryObj<typeof MemoizedOfferList>;

export const Default: Story = {
  args: {
    offers: mockOffers,
  },
};

export const Empty: Story = {
  args: {
    offers: [],
  },
};

export const Single: Story = {
  args: {
    offers: [mockOffers[0]],
  },
};

export const ManyOffers: Story = {
  args: {
    offers: Array(8).fill(null).map((_, index) => ({
      ...mockOffers[index % 4],
      id: `${index + 1}`,
      title: `Offer ${index + 1} - ${mockOffers[index % 4].type}`,
      price: 100 + index * 25,
    })),
  },
};
