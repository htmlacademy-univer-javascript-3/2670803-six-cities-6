import { Offer } from '../../mocks/types/offer';

export type StateType = {
  city: string;
  offers: Offer[];
};

export const initialState: StateType = {
  city: 'Amsterdam',
  offers: [],
};

type SetCityAction = {
  type: 'SET_CITY';
  payload: string;
};

type SetOffersAction = {
  type: 'SET_OFFERS';
  payload: Offer[];
};

export type ActionType = SetCityAction | SetOffersAction;

export const reducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case 'SET_CITY':
      return { ...state, city: action.payload };
    case 'SET_OFFERS':
      return { ...state, offers: action.payload };
    default:
      return state;
  }
};
