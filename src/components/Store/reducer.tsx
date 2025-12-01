import { Offer } from '../../api/types/offer';
import { AuthorizationStatus } from '../../api/types/auth';
import { SET_CITY, SET_OFFERS, SET_ERROR, SET_AUTHORIZATION_STATUS } from './action';

interface StateType {
  city: string;
  offers: Offer[];
  error: string | null;
  authorizationStatus: AuthorizationStatus;
}

export const initialState: StateType = {
  city: 'Paris',
  offers: [],
  error: null,
  authorizationStatus: 'UNKNOWN',
};

type SetCityAction = {
  type: typeof SET_CITY;
  payload: string;
};

type SetOffersAction = {
  type: typeof SET_OFFERS;
  payload: Offer[];
};

type SetErrorAction = {
  type: typeof SET_ERROR;
  payload: string | null;
};

type SetAuthorizationStatusAction = {
  type: typeof SET_AUTHORIZATION_STATUS;
  payload: AuthorizationStatus;
}

export type ActionType = SetCityAction | SetOffersAction | SetErrorAction | SetAuthorizationStatusAction;

export const reducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case SET_CITY:
      return { ...state, city: action.payload };
    case SET_OFFERS:
      return { ...state, offers: action.payload, error: null };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_AUTHORIZATION_STATUS:
      return { ...state, authorizationStatus: action.payload };
    default:
      return state;
  }
};
