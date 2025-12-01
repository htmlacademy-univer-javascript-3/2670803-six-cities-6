import { Offer } from '../../api/types/offer';

export const SET_CITY = 'SET_CITY' as const;
export const SET_OFFERS = 'SET_OFFERS' as const;
export const SET_ERROR = 'SET_ERROR' as const;

export const setCity = (city: string) => ({
  type: SET_CITY,
  payload: city,
});

export const setOffers = (offers: Offer[]) => ({
  type: SET_OFFERS,
  payload: offers,
});

export const setError = (error: string | null) => ({
  type: SET_ERROR,
  payload: error,
});
