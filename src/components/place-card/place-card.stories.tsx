import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { MemoizedPlaceCard } from '../memoized-component/memoized-component';
import { Offer, AuthorizationStatus } from '../../api/types/types';
import { fn } from '@storybook/test';

interface UserState {
  authorizationStatus: AuthorizationStatus;
}

interface FavoritesState {
  offers: string[];
}

interface RootState {
  user: UserState;
  favorites: FavoritesState;
}

const createMockStore = (authorizationStatus: AuthorizationStatus = AuthorizationStatus.NoAuth): Store<RootState> =>
  configureStore({
    reducer: {
      user: () => ({ authorizationStatus }),
      favorites: () => ({ offers: [] }),
    },
  }) as Store<RootState>;

const mockOffer: Offer = {
  id: '1',
  title: 'Beautiful & luxurious apartment at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 }
  },
  location: { latitude: 52.3909553943508, longitude: 4.85309666406198, zoom: 16 },
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
};

interface StoryContext {
  authorizationStatus?: AuthorizationStatus;
}

const WithProviders = (
  Story: React.ComponentType,
  context: { parameters: StoryContext }
) => {
  const store = createMockStore(context.parameters.authorizationStatus);

  return (
    <MemoryRouter>
      <Provider store={store}>
        <div style={{
          width: '260px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          display: 'inline-block'
        }}
        >
          <Story />
        </div>
      </Provider>
    </MemoryRouter>
  );
};

const meta: Meta<typeof MemoizedPlaceCard> = {
  title: 'Components/PlaceCard',
  component: MemoizedPlaceCard,
  tags: ['autodocs'],
  argTypes: {
    offer: { control: 'object' },
    isActive: { control: 'boolean' },
    className: { control: 'text' },
    onMouseEnter: { action: 'mouse enter' },
    onMouseLeave: { action: 'mouse leave' },
  },
  args: {
    onMouseEnter: fn(),
    onMouseLeave: fn(),
    isActive: false,
  },
} satisfies Meta<typeof MemoizedPlaceCard>;

export default meta;
type Story = StoryObj<typeof MemoizedPlaceCard>;

export const PremiumOffer: Story = {
  decorators: [WithProviders],
  args: {
    offer: mockOffer,
  },
  parameters: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
};

export const StandardOffer: Story = {
  decorators: [WithProviders],
  args: {
    offer: { ...mockOffer, isPremium: false },
  },
  parameters: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
};

export const FavoriteOffer: Story = {
  decorators: [WithProviders],
  args: {
    offer: { ...mockOffer, isFavorite: true },
  },
  parameters: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
};

export const ActiveState: Story = {
  decorators: [WithProviders],
  args: {
    offer: mockOffer,
    isActive: true,
  },
  parameters: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
};
