import { offerReducer, setCity, setOffers, setError, setOfferDetails, setNearbyOffers, INITIAL_OFFERS_STATE, OffersState } from './offer-slice';
import { Offer } from '../../../api/types/types';

describe('offerSlice', () => {
  const mockOffer: Offer = {
    id: '1',
    title: 'Test Offer',
    description: 'Test description',
    city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 } },
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
    price: 100,
    rating: 4.5,
    type: 'apartment',
    isFavorite: false,
    isPremium: false,
    images: [],
    maxAdults: 2,
    bedrooms: 1,
    goods: [],
    host: { name: 'Alice', avatarUrl: 'url', isPro: true },
  };

  it('should return the initial state', () => {
    expect(offerReducer(undefined, { type: undefined })).toEqual(INITIAL_OFFERS_STATE);
  });

  it('should handle setCity', () => {
    const state: OffersState = offerReducer(INITIAL_OFFERS_STATE, setCity('London'));
    expect(state.city).toBe('London');
  });

  it('should handle setOffers', () => {
    const state: OffersState = offerReducer(INITIAL_OFFERS_STATE, setOffers([mockOffer]));
    expect(state.offers).toEqual([mockOffer]);
    expect(state.error).toBeNull();
  });

  it('should handle setError', () => {
    const state: OffersState = offerReducer(INITIAL_OFFERS_STATE, setError('Some error'));
    expect(state.error).toBe('Some error');
  });

  it('should handle setOfferDetails', () => {
    const state: OffersState = offerReducer(INITIAL_OFFERS_STATE, setOfferDetails(mockOffer));
    expect(state.offerDetails).toEqual(mockOffer);
  });

  it('should handle setNearbyOffers', () => {
    const state: OffersState = offerReducer(INITIAL_OFFERS_STATE, setNearbyOffers([mockOffer]));
    expect(state.nearbyOffers).toEqual([mockOffer]);
  });
});
