import { Offer } from '../../api/types/offer';
import { AuthorizationStatus } from '../../api/types/auth';
import { UserData } from '../../api/types/auth';
import { Comment } from '../../api/types/comment';
import { SET_CITY, SET_OFFERS, SET_ERROR, SET_AUTHORIZATION_STATUS, SET_USER, SET_OFFER_DETAILS, SET_NEARBY_OFFERS, SET_COMMENTS, SET_COMMENTS_LOADING } from './action';

interface StateType {
  city: string;
  offers: Offer[];
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
   offerDetails: Offer | null;
  nearbyOffers: Offer[];
  comments: Comment[];
  commentsLoading: boolean;
}

export const initialState: StateType = {
  city: 'Paris',
  offers: [],
  error: null,
  authorizationStatus: 'UNKNOWN',
  user: null,
  offerDetails: null,
  nearbyOffers: [],
  comments: [],
  commentsLoading: false,
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

type SetOfferDetailsAction = {
  type: typeof SET_OFFER_DETAILS;
  payload: Offer | null;
};

type SetNearbyOffersAction = {
  type: typeof SET_NEARBY_OFFERS;
  payload: Offer[];
};

type SetCommentsAction = {
  type: typeof SET_COMMENTS;
  payload: Comment[];
};

type SetCommentsLoadingAction = {
  type: typeof SET_COMMENTS_LOADING;
  payload: boolean;
};

export type ActionType =
  | SetCityAction
  | SetOffersAction
  | SetErrorAction
  | SetAuthorizationStatusAction
  | SetUserAction
  | SetOfferDetailsAction
  | SetNearbyOffersAction
  | SetCommentsAction
  | SetCommentsLoadingAction;

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
    case SET_OFFER_DETAILS:
      return { ...state, offerDetails: action.payload };
    case SET_NEARBY_OFFERS:
      return { ...state, nearbyOffers: action.payload };
    case SET_COMMENTS:
      return { ...state, comments: action.payload };
    case SET_COMMENTS_LOADING:
      return { ...state, commentsLoading: action.payload };
    default:
      return state;
  }
};
