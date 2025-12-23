import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import MainPage from './main-page';

import * as storeHooks from '../../components/store';
import * as offerThunks from '../../components/store/offers/offer-thunks';
import { AuthorizationStatus } from '../../api/types/types';
import { RootState } from '../../components/store';

vi.mock('../../components/memoized-component/memoized-component', () => ({
  MemoizedHeader: () => <div data-testid="header" />,
  MemoizedCitiesList: () => <div />,
  MemoizedOfferList: () => <div data-testid="offer-list" />,
  MemoizedOfferMap: () => <div />,
  MemoizedSortOptions: () => <div />,
}));

vi.mock('../../components/spinner/spinner', () => ({
  default: () => <div data-testid="spinner" />,
}));

vi.mock('../../components/main-empty/main-empty', () => ({
  default: ({ city }: { city: string }) => (
    <div data-testid="empty">No places in {city}</div>
  ),
}));

const createMockState = (overrides?: Partial<RootState>): RootState => ({
  offer: {
    city: 'Paris',
    offers: [],
    error: null,
  },
  user: {
    authorizationStatus: AuthorizationStatus.Auth,
    user: { email: 'test@test.com', name: 'Test', avatarUrl: '', isPro: false },
  },
  ...overrides,
}) as RootState;

/* -------------------------------- setup -------------------------------- */

describe('MainPage', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    mockDispatch.mockReset();

    vi.spyOn(storeHooks, 'useAppDispatch').mockReturnValue(
      mockDispatch as unknown as storeHooks.AppDispatch
    );

    vi.spyOn(storeHooks, 'useAppSelector').mockImplementation(
      (selector: (state: RootState) => unknown) =>
        selector(createMockState())
    );

    vi.spyOn(offerThunks, 'fetchOffers').mockReturnValue(
      Promise.resolve() as never
    );
  });

  it('dispatches fetchOffers on mount', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('renders header', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders empty state when no offers', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('empty')).toHaveTextContent('Paris');
  });

  it('renders offer list when offers exist', () => {
    vi.spyOn(storeHooks, 'useAppSelector').mockImplementation(
      (selector: (state: RootState) => unknown) =>
        selector(
          createMockState({
            offer: {
              city: 'Paris',
              error: null,
              offers: [
                {
                  id: '1',
                  title: 'Nice place',
                  type: 'apartment',
                  city: {
                    name: 'Paris',
                    location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 }
                  },
                  location: { latitude: 48.857, longitude: 2.353, zoom: 16 },
                  price: 100,
                  rating: 4.5,
                  isPremium: false,
                  isFavorite: false,
                },
                {
                  id: '2',
                  title: 'Cozy apartment',
                  type: 'apartment',
                  city: {
                    name: 'Paris',
                    location: { latitude: 48.857, longitude: 2.351, zoom: 12 }
                  },
                  location: { latitude: 48.858, longitude: 2.350, zoom: 16 },
                  price: 150,
                  rating: 4.8,
                  isPremium: true,
                  isFavorite: true,
                },
              ],
              offerDetails: null,
              nearbyOffers: [],
            },
          })
        )
    );

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('offer-list')).toBeInTheDocument();
  });
});
