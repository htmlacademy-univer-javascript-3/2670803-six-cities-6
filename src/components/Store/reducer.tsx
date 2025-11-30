import { Offer } from '../../api/types/offer';
import { SET_CITY, SET_OFFERS, SET_ERROR } from './action';

interface StateType {
  city: string;
  offers: Offer[];
  error: string | null;
}

export const initialState: StateType = {
  city: 'Paris',
  offers: [],
  error: null,
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

export type ActionType = SetCityAction | SetOffersAction | SetErrorAction;

export const reducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case SET_CITY:
      return { ...state, city: action.payload };
    case SET_OFFERS:
      return { ...state, offers: action.payload, error: null };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
