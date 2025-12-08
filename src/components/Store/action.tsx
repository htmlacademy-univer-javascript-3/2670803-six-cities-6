import { Offer } from '../../api/types/offer';
import { AuthorizationStatus } from '../../api/types/auth';
import { UserData } from '../../api/types/auth';

export const SET_CITY = 'SET_CITY' as const;
export const SET_OFFERS = 'SET_OFFERS' as const;
export const SET_ERROR = 'SET_ERROR' as const;
export const SET_AUTHORIZATION_STATUS = 'SET_AUTHORIZATION_STATUS' as const;
export const SET_USER = 'SET_USER' as const;

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

export const setAuthorizationStatus = (status: AuthorizationStatus) => ({
  type: SET_AUTHORIZATION_STATUS,
  payload: status,
});

export const setUser = (user: UserData | null) => ({
  type: SET_USER,
  payload: user,
});
