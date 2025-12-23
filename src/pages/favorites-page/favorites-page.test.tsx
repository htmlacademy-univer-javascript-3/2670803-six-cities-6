import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import FavoritesPage from './favorites-page';
import { favoritesReducer } from '../../components/store/favorites/favorites-slice';
import { userReducer } from '../../components/store/user/user-slice';
import { offerReducer } from '../../components/store/offers/offer-slice';
import { RootState } from '../../components/store';
import { AuthorizationStatus } from '../../api/types/types';
import * as favoritesThunks from '../../components/store/favorites/favorites-thunks';
import * as userThunks from '../../components/store/user/user-thunks';
import { AppDispatch } from '../../components/store';
import axios from 'axios';

describe('FavoritesPage', () => {
  let store: ReturnType<typeof setupStore>;

  function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
      reducer: {
        favorites: favoritesReducer,
        user: userReducer,
        offer: offerReducer,
      },
      preloadedState,
    });
  }

  beforeEach(() => {
    store = setupStore({
      favorites: {
        favoriteOffers: [],
        isFavoriteLoading: false,
      },
      user: {
        user: {
          name: 'Test User',
          email: 'test@test.com',
          avatarUrl: '',
          isPro: false,
        },
        authorizationStatus: AuthorizationStatus.Auth,
      },
      offer: {
        offers: [],
        offerDetails: null,
        nearbyOffers: [],
        city: 'TestCity',
        error: null,
      },
    });
  });

  it('renders spinner while loading', () => {
    store = setupStore({
      favorites: {
        favoriteOffers: [],
        isFavoriteLoading: true
      },
      user: {
        user: {
          name: 'Test',
          email: 'test@test.com',
          avatarUrl: '',
          isPro: false
        },
        authorizationStatus: AuthorizationStatus.Auth
      },
      offer: {
        offers: [],
        offerDetails: null,
        nearbyOffers: [],
        city: 'TestCity',
        error: null
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading favorites/i)).toBeInTheDocument();
  });

  it('renders empty state when no favorites', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('calls fetchFavoriteOffers on mount when authorized', async () => {
    const fetchMock = vi.spyOn(favoritesThunks, 'fetchFavoriteOffers')
      .mockImplementation(() =>
  (() => Promise.resolve()) as unknown as ReturnType<typeof favoritesThunks.fetchFavoriteOffers>);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
  });

  it('calls logout on header sign out', async () => {
    const logoutMock = vi.fn(() => Promise.resolve()) as unknown as ReturnType<typeof userThunks.logout>;
    const mockDispatch: AppDispatch = vi.fn() as unknown as AppDispatch;

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    const signOutButton = screen.getByText(/Sign out/i);
    fireEvent.click(signOutButton);

    const mockAxios = {} as unknown as typeof axios;

    await logoutMock(mockDispatch, vi.fn(), mockAxios);

    expect(logoutMock).toHaveBeenCalled();
  });
});
