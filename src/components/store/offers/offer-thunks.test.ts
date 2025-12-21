import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { fetchOffers, fetchOfferData } from './offer-thunks';
import { setOffers, setOfferDetails, setNearbyOffers, setError } from './offer-slice';
import { fetchComments } from '../comments/comment-thunks';
import type { Offer } from '../../../api/types/types';
import type { AppDispatch, RootState } from '..';
vi.mock('../comments/comment-thunks', () => ({
  fetchComments: vi.fn((offerId: string) => ({ type: 'MOCK_FETCH_COMMENTS', payload: offerId })),
}));

describe('offer thunks', () => {
  let dispatch: AppDispatch;
  let apiMock: AxiosInstance;

  const mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Test Offer 1',
      description: 'Desc',
      price: 100,
      type: 'apartment',
      city: { name: 'Test City', location: { latitude: 10, longitude: 20, zoom: 10 } },
      location: { latitude: 10, longitude: 20, zoom: 10 },
      isFavorite: false,
      isPremium: false,
      rating: 4.5,
      images: [],
      bedrooms: 2,
      maxAdults: 4,
      goods: [],
      host: { name: 'Host', avatarUrl: '', isPro: false },
    },
    {
      id: '2',
      title: 'Test Offer 2',
      description: 'Desc',
      price: 200,
      type: 'house',
      city: { name: 'Test City', location: { latitude: 10, longitude: 20, zoom: 10 } },
      location: { latitude: 10, longitude: 20, zoom: 10 },
      isFavorite: true,
      isPremium: true,
      rating: 5,
      images: [],
      bedrooms: 3,
      maxAdults: 6,
      goods: [],
      host: { name: 'Host 2', avatarUrl: '', isPro: true },
    },
  ];

  const mockOffer: Offer = {
    id: '1',
    title: 'Test Offer 1',
    description: 'Desc',
    price: 100,
    type: 'apartment',
    city: { name: 'Test City', location: { latitude: 10, longitude: 20, zoom: 10 } },
    location: { latitude: 10, longitude: 20, zoom: 10 },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    images: [],
    bedrooms: 2,
    maxAdults: 4,
    goods: [],
    host: { name: 'Host', avatarUrl: '', isPro: false },
  };

  const mockOffersResponse = {
    data: mockOffers,
    status: 200,
    statusText: 'OK',
  } as unknown as AxiosResponse<Offer[]>;

  const mockOfferResponse = {
    data: mockOffer,
    status: 200,
    statusText: 'OK',
  } as unknown as AxiosResponse<Offer>;

  const mockNearbyResponse = {
    data: mockOffers,
    status: 200,
    statusText: 'OK',
  } as unknown as AxiosResponse<Offer[]>;

  beforeEach(() => {
    dispatch = vi.fn() as AppDispatch;

    apiMock = {
      get: vi.fn<Parameters<AxiosInstance['get']>, ReturnType<AxiosInstance['get']>>(() => Promise.resolve(mockOffersResponse)),
      post: vi.fn(),
      defaults: {},
      interceptors: { request: { use: vi.fn(), eject: vi.fn() }, response: { use: vi.fn(), eject: vi.fn() } },
      request: vi.fn(),
      delete: vi.fn(),
      head: vi.fn(),
      options: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      getUri: vi.fn(),
    } as unknown as AxiosInstance;

    vi.clearAllMocks();
  });

  it('fetchOffers: dispatches setOffers on success', async () => {
    const thunkAPI = { dispatch, getState: () => ({} as RootState), extra: apiMock };

    await fetchOffers()(thunkAPI.dispatch, thunkAPI.getState, thunkAPI.extra);

    expect(apiMock.get).toHaveBeenCalledWith('/offers');
    expect(dispatch).toHaveBeenCalledWith(setOffers(mockOffers));
  });

  it('fetchOffers: dispatches setError on failure', async () => {
    apiMock.get = vi.fn(() => Promise.reject(new Error('API Error'))) as unknown as AxiosInstance['get'];

    const thunkAPI = { dispatch, getState: () => ({} as RootState), extra: apiMock };

    await fetchOffers()(thunkAPI.dispatch, thunkAPI.getState, thunkAPI.extra);

    expect(dispatch).toHaveBeenCalledWith(setError('Please try again later.'));
  });

  it('fetchOfferData: dispatches offer details, nearby offers and fetchComments on success', async () => {
    apiMock.get = vi.fn()
      .mockImplementationOnce(() => Promise.resolve(mockOfferResponse))
      .mockImplementationOnce(() => Promise.resolve(mockNearbyResponse));

    const thunkAPI = { dispatch, getState: () => ({} as RootState), extra: apiMock };

    await fetchOfferData('1')(thunkAPI.dispatch, thunkAPI.getState, thunkAPI.extra);

    expect(apiMock.get).toHaveBeenNthCalledWith(1, '/offers/1');
    expect(apiMock.get).toHaveBeenNthCalledWith(2, '/offers/1/nearby');
    expect(dispatch).toHaveBeenCalledWith(setOfferDetails(mockOffer));
    expect(dispatch).toHaveBeenCalledWith(setNearbyOffers(mockOffers));
    expect(fetchComments).toHaveBeenCalledWith('1');
  });

  it('fetchOfferData: dispatches setError on failure', async () => {
    apiMock.get = vi.fn(() => Promise.reject(new Error('API Error'))) as unknown as AxiosInstance['get'];

    const thunkAPI = { dispatch, getState: () => ({} as RootState), extra: apiMock };

    await fetchOfferData('1')(thunkAPI.dispatch, thunkAPI.getState, thunkAPI.extra);

    expect(dispatch).toHaveBeenCalledWith(setError('Failed offer data. Please try again later.'));
  });
});
