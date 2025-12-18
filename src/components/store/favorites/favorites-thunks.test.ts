import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toggleFavoriteOffer, fetchFavoriteOffers } from './favorites-thunks';
import { setOffers, setOfferDetails, setError } from '../offers/offer-slice';
import { setFavoriteOffers } from './favorites-slice';
import type { AppDispatch, RootState } from '../index';
import type { Offer } from '../../../api/types/types';
import * as apiModule from '../../../api/api';

describe('favorites thunks', () => {
  let dispatch: AppDispatch;
  let getState: () => RootState;

  const mockOffer: Offer = {
    id: '1',
    title: 'Test Offer',
    isFavorite: false,
    type: 'apartment',
    price: 100,
    city: {
      name: 'Test City',
      location: { latitude: 0, longitude: 0, zoom: 10 },
    },
    location: { latitude: 0, longitude: 0, zoom: 10 },
    previewImage: 'https://example.com/image.jpg',
    rating: 4.5,
    description: 'Test description',
    goods: [],
    host: {
      name: 'Host Name',
      isPro: false,
      avatarUrl: 'https://example.com/avatar.jpg',
    },
    bedrooms: 1,
    maxAdults: 2,
    images: ['https://example.com/image.jpg'],
    isPremium: false,
  };

  const mockState: RootState = {
    offer: {
      offers: [mockOffer],
      offerDetails: mockOffer,
      isLoading: false,
      error: null,
    },
    favorites: {
      favoriteOffers: [],
      isFavoriteLoading: false,
    },
    user: {
      authorizationStatus: 'AUTH',
      userData: null,
    },
    comments: {
      comments: [],
      isLoading: false,
      error: null,
    },
  } as unknown as RootState;

  beforeEach(() => {
    dispatch = vi.fn() as unknown as AppDispatch;
    getState = () => mockState;
    vi.clearAllMocks();
  });

  it('toggleFavoriteOffer: adds offer to favorites when isFavorite=true', async () => {
    const updatedOffer = { ...mockOffer, isFavorite: true };
    vi.spyOn(apiModule, 'toggleFavorite').mockResolvedValue(updatedOffer);

    await toggleFavoriteOffer({ offerId: '1', isFavorite: true })(
      dispatch,
      getState,
      apiModule as unknown as typeof apiModule.API
    );

    expect(apiModule.toggleFavorite).toHaveBeenCalledWith('1', true);
    expect(dispatch).toHaveBeenCalledWith(
      setOffers([updatedOffer])
    );
    expect(dispatch).toHaveBeenCalledWith(
      setOfferDetails(updatedOffer)
    );
    expect(dispatch).toHaveBeenCalledWith(
      setFavoriteOffers([updatedOffer])
    );
  });

  it('toggleFavoriteOffer: removes offer from favorites when isFavorite=false', async () => {
    const updatedOffer = { ...mockOffer, isFavorite: false };
    const stateWithFavorite: RootState = {
      ...mockState,
      favorites: {
        favoriteOffers: [mockOffer],
        isFavoriteLoading: false,
      },
    };
    const getStateMock = () => stateWithFavorite;
    vi.spyOn(apiModule, 'toggleFavorite').mockResolvedValue(updatedOffer);

    await toggleFavoriteOffer({ offerId: '1', isFavorite: false })(
      dispatch,
      getStateMock,
      apiModule as unknown as typeof apiModule.API
    );

    expect(apiModule.toggleFavorite).toHaveBeenCalledWith('1', false);
    expect(dispatch).toHaveBeenCalledWith(
      setOffers([updatedOffer])
    );
    expect(dispatch).toHaveBeenCalledWith(
      setOfferDetails(updatedOffer)
    );
    expect(dispatch).toHaveBeenCalledWith(
      setFavoriteOffers([])
    );
  });

  it('toggleFavoriteOffer: dispatches error on failure', async () => {
    const error = new Error('API Error');
    vi.spyOn(apiModule, 'toggleFavorite').mockRejectedValue(error);

    await toggleFavoriteOffer({ offerId: '1', isFavorite: true })(
      dispatch,
      getState,
      apiModule as unknown as typeof apiModule.API
    );

    expect(dispatch).toHaveBeenCalledWith(
      setError('Failed to update favorite. Please try again.')
    );
  });

  it('fetchFavoriteOffers: sets favorite offers on success', async () => {
    const mockFavorites = [{ ...mockOffer, isFavorite: true }];
    vi.spyOn(apiModule.API, 'get').mockResolvedValue({ data: mockFavorites });

    await fetchFavoriteOffers()(dispatch, () => mockState, apiModule.API);

    expect(apiModule.API.get).toHaveBeenCalledWith('/favorite');
    expect(dispatch).toHaveBeenCalledWith(
      setFavoriteOffers(mockFavorites)
    );
  });

  it('fetchFavoriteOffers: dispatches error on failure', async () => {
    vi.spyOn(apiModule.API, 'get').mockRejectedValue(new Error('Fail'));

    await fetchFavoriteOffers()(dispatch, () => mockState, apiModule.API);

    expect(dispatch).toHaveBeenCalledWith(
      setError('Failed to load favorite offers. Please try again.')
    );
  });
});
