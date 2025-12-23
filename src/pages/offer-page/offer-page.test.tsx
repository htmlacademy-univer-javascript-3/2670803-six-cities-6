import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import OfferPage from './offer-page';
import * as storeHooks from '../../components/store';
import * as offerThunks from '../../components/store/offers/offer-thunks';
import * as favoritesThunks from '../../components/store/favorites/favorites-thunks';
import * as userThunks from '../../components/store/user/user-thunks';
import { AuthorizationStatus } from '../../api/types/types';
import { Offer } from '../../api/types/types';
import type { AppDispatch, RootState } from '../../components/store';
import type { AnyAction } from '@reduxjs/toolkit';
import type { ThunkAction } from 'redux-thunk';
import axios, { AxiosInstance } from 'axios';
import type { AsyncThunk } from '@reduxjs/toolkit';

const mockAxios: AxiosInstance = axios.create();
type AppThunk<Return = void> = ThunkAction<Return, RootState, AxiosInstance, AnyAction>;

const mockOffer: Offer = {
  id: '1',
  title: 'Test Offer',
  images: ['img1.jpg', 'img2.jpg'],
  previewImage: 'preview.jpg',
  isPremium: true,
  type: 'apartment',
  rating: 4.5,
  bedrooms: 2,
  maxAdults: 4,
  price: 120,
  goods: ['Wi-Fi', 'Kitchen'],
  description: 'Test description',
  host: {
    name: 'Host Name',
    avatarUrl: 'avatar.jpg',
    isPro: true,
  },
  city: {
    name: 'Test City',
    location: { latitude: 52.52, longitude: 13.405, zoom: 10 },
  },
  location: { latitude: 52.52, longitude: 13.405, zoom: 10 },
  isFavorite: true,
};

const mockComments = [
  {
    id: 'c1',
    user: { name: 'User1', avatarUrl: 'u1.jpg', isPro: false },
    rating: 5,
    comment: 'Great!',
    date: '2025-12-23',
  },
];

interface TestAsyncThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  extra: AxiosInstance;
  rejectValue?: unknown;
}

describe('OfferPage', () => {
  const mockDispatch: AppDispatch = vi.fn().mockImplementation(
    (action: AnyAction | AppThunk) => {
      if (typeof action === 'function') {
        return action(mockDispatch, () => ({} as RootState), mockAxios);
      }
      return action;
    }
  );

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(storeHooks, 'useAppSelector').mockImplementation((selector) =>
      selector({
        offer: {
          city: 'Test City',
          offers: [mockOffer],
          offerDetails: mockOffer,
          nearbyOffers: [mockOffer],
          error: null,
        },
        comments: { comments: mockComments, commentsLoading: false },
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: {
            name: 'Test User',
            email: 'test@example.com',
            avatarUrl: 'avatar.jpg',
            isPro: true,
          },
        },
        favorites: {
          favoriteOffers: [mockOffer],
          isFavoriteLoading: false,
        },
      })
    );

    vi.spyOn(storeHooks, 'useAppDispatch').mockReturnValue(mockDispatch);

    const mockAsyncThunk = <T, U>(thunk: AsyncThunk<T, U, TestAsyncThunkConfig>) =>
      vi.fn(() => ({
        unwrap: vi.fn(() => Promise.resolve({} as T)),
      })) as unknown as typeof thunk;

    vi.spyOn(offerThunks, 'fetchOfferData').mockImplementation(() => {
      const thunk = vi.fn(
        () =>
          Promise.resolve({})
      );
      return thunk as unknown as ReturnType<typeof offerThunks.fetchOfferData>;
    });

    vi.spyOn(favoritesThunks, 'toggleFavoriteOffer').mockImplementation(mockAsyncThunk(favoritesThunks.toggleFavoriteOffer));
    vi.spyOn(userThunks, 'logout').mockImplementation(() => {
      const thunk = vi.fn(() =>
        Promise.resolve()
      );
      return thunk as unknown as ReturnType<typeof userThunks.logout>;
    });

  });

  it('renders offer details', async () => {
    render(
      <MemoryRouter initialEntries={['/offer/1']}>
        <Routes>
          <Route path="/offer/:id" element={<OfferPage />} />
        </Routes>
      </MemoryRouter>
    );
    const main = screen.getByRole('main');
    const offerSection = within(main);

    const offerName = await offerSection.findByRole('heading', { name: 'Test Offer', level: 1 });
    expect(offerName).toBeInTheDocument();

    const offerMark = main.querySelector('.offer__mark');
    expect(offerMark).toBeInTheDocument();
    expect(offerMark).toBeInstanceOf(HTMLElement);
    expect(within(offerMark as HTMLElement).getByText('Premium')).toBeInTheDocument();

    expect(offerSection.getByText('2 Bedrooms')).toBeInTheDocument();
    expect(offerSection.getByText('Max 4 adults')).toBeInTheDocument();

    const priceContainer = main.querySelector('.offer__price');
    expect(priceContainer).toBeInTheDocument();
    expect(within(priceContainer as HTMLElement).getByText('€120')).toBeInTheDocument();

    const insideList = main.querySelector('.offer__inside-list');
    expect(insideList).toBeInTheDocument();
    expect(within(insideList as HTMLElement).getByText('Wi-Fi')).toBeInTheDocument();
    expect(within(insideList as HTMLElement).getByText('Kitchen')).toBeInTheDocument();

    const hostName = main.querySelector('.offer__user-name');
    expect(hostName).toBeInTheDocument();
    expect(hostName).toHaveTextContent('Host Name');
  });

  it('dispatches toggleFavoriteOffer when bookmark button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/offer/1']}>
        <Routes>
          <Route path="/offer/:id" element={<OfferPage />} />
        </Routes>
      </MemoryRouter>
    );

    const bookmarkButton = await screen.findByRole('button', { name: /To bookmarks/i });
    fireEvent.click(bookmarkButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  it('calls logout and navigates on sign out', async () => {
    render(
      <MemoryRouter initialEntries={['/offer/1']}>
        <Routes>
          <Route path="/offer/:id" element={<OfferPage />} />
        </Routes>
      </MemoryRouter>
    );

    const signOutButton = screen.getByText('Sign out');
    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
