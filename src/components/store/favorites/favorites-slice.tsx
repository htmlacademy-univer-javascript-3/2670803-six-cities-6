import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../../api/types/types';

export interface FavoritesState {
  favoriteOffers: Offer[];
  isFavoriteLoading: boolean;
}

export const INITIAL_FAVORITES_STATE: FavoritesState = {
  favoriteOffers: [],
  isFavoriteLoading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: INITIAL_FAVORITES_STATE,
  reducers: {
    setFavoriteOffers: (state, action: PayloadAction<Offer[]>) => {
      state.favoriteOffers = action.payload;
    },
    setFavoriteLoading: (state, action: PayloadAction<boolean>) => {
      state.isFavoriteLoading = action.payload;
    },
  },
});

export const { setFavoriteOffers, setFavoriteLoading } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
