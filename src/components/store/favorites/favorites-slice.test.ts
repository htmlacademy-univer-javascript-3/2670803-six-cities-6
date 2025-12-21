import { favoritesReducer, setFavoriteOffers, setFavoriteLoading, INITIAL_FAVORITES_STATE, FavoritesState } from './favorites-slice';
import { Offer } from '../../../api/types/types';

describe('favoritesSlice', () => {
  const mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Test Offer 1',
      description: 'Description 1',
      city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 } },
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
      price: 100,
      rating: 4.5,
      type: 'apartment',
      isFavorite: true,
      isPremium: false,
      images: [],
      maxAdults: 2,
      bedrooms: 1,
      goods: [],
      host: { name: 'Alice', avatarUrl: 'url', isPro: true },
    },
    {
      id: '2',
      title: 'Test Offer 2',
      description: 'Description 2',
      city: { name: 'London', location: { latitude: 51.5074, longitude: -0.1278, zoom: 12 } },
      location: { latitude: 51.5074, longitude: -0.1278, zoom: 12 },
      price: 200,
      rating: 4.0,
      type: 'room',
      isFavorite: false,
      isPremium: true,
      images: [],
      maxAdults: 3,
      bedrooms: 2,
      goods: [],
      host: { name: 'Bob', avatarUrl: 'url', isPro: false },
    },
  ];

  it('should return the initial state', () => {
    expect(favoritesReducer(undefined, { type: undefined })).toEqual(INITIAL_FAVORITES_STATE);
  });

  it('should handle setFavoriteOffers', () => {
    const state: FavoritesState = favoritesReducer(INITIAL_FAVORITES_STATE, setFavoriteOffers(mockOffers));
    expect(state.favoriteOffers).toEqual(mockOffers);
  });

  it('should handle setFavoriteLoading', () => {
    let state: FavoritesState = favoritesReducer(INITIAL_FAVORITES_STATE, setFavoriteLoading(true));
    expect(state.isFavoriteLoading).toBe(true);

    state = favoritesReducer(state, setFavoriteLoading(false));
    expect(state.isFavoriteLoading).toBe(false);
  });
});
