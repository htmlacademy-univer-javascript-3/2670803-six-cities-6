import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../../api/types/offer';

export interface OffersState {
  city: string;
  offers: Offer[];
  offerDetails: Offer | null;
  nearbyOffers: Offer[];
  error: string | null;
}

export const initialOffersState: OffersState = {
  city: 'Paris',
  offers: [],
  offerDetails: null,
  nearbyOffers: [],
  error: null,
};

const offerSlice = createSlice({
  name: 'offer',
  initialState: initialOffersState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setOfferDetails: (state, action: PayloadAction<Offer | null>) => {
      state.offerDetails = action.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    },
  },
});

export const {
  setCity,
  setOffers,
  setError,
  setOfferDetails,
  setNearbyOffers,
} = offerSlice.actions;

export const offerReducer = offerSlice.reducer;
