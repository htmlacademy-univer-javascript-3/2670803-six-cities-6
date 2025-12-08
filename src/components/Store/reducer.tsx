import { Offer } from '../../api/types/offer';
import { AuthorizationStatus } from '../../api/types/auth';
import { UserData } from '../../api/types/auth';
import { SET_CITY, SET_OFFERS, SET_ERROR, SET_AUTHORIZATION_STATUS, SET_USER } from './action';

interface StateType {
  city: string;
  offers: Offer[];
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
}

export const initialState: StateType = {
  city: 'Paris',
  offers: [],
  error: null,
  authorizationStatus: 'UNKNOWN',
  user: null,
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

type SetUserAction = {
  type: typeof SET_USER;
  payload: UserData | null;
};

export type ActionType = SetCityAction | SetOffersAction | SetErrorAction | SetAuthorizationStatusAction | SetUserAction;

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
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
