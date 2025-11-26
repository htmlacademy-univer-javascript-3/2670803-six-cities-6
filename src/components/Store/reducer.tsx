import { Offer } from '../../mocks/types/offer';
import { offers } from '../../mocks/offers';
import { SET_CITY, SET_OFFERS } from './action';

interface StateType {
  city: string;
  offers: Offer[];
}

export const initialState: StateType = {
  city: 'Paris',
  offers: offers,
};

type SetCityAction = {
  type: typeof SET_CITY;
  payload: string;
};

type SetOffersAction = {
  type: typeof SET_OFFERS;
  payload: Offer[];
};

export type ActionType = SetCityAction | SetOffersAction;

export const reducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case SET_CITY:
      return { ...state, city: action.payload };
    case SET_OFFERS:
      return { ...state, offers: action.payload };
    default:
      return state;
  }
};
